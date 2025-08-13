import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendDonationConfirmationEmail as sendEmailConfirmation } from "@/lib/email"
import { sanitizeForLogging } from "@/lib/encryption"

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!

// Decouple PayPal environment from NODE_ENV to avoid frontend/backend mismatches
// Set PAYPAL_ENV (or NEXT_PUBLIC_PAYPAL_ENV) to "live" or "sandbox"
const PAYPAL_ENV = (process.env.PAYPAL_ENV || process.env.NEXT_PUBLIC_PAYPAL_ENV || "sandbox").toLowerCase()
const PAYPAL_BASE_URL = PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

// Get PayPal access token
async function getPayPalAccessToken() {
  console.log("Getting PayPal access token...")
  console.log("PAYPAL_ENV:", PAYPAL_ENV)
  console.log("PAYPAL_CLIENT_ID:", PAYPAL_CLIENT_ID ? "SET" : "NOT SET")
  console.log("PAYPAL_CLIENT_SECRET:", PAYPAL_CLIENT_SECRET ? "SET" : "NOT SET")
  console.log("PAYPAL_BASE_URL:", PAYPAL_BASE_URL)
  
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

  try {
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })

    const data = await response.json()
    console.log("PayPal token response status:", response.status)
    
    if (!response.ok) {
      console.error("PayPal token error:", data)
      throw new Error(`PayPal authentication failed: ${data.error_description || data.error}`)
    }

    console.log("PayPal access token obtained successfully")
    return data.access_token
  } catch (error) {
    console.error("PayPal token request failed:", error)
    throw error
  }
}

// Create PayPal order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "USD", donationType, donorInfo } = body

    // Validate required fields
    if (!amount || !donorInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `donation_${Date.now()}`,
          amount: {
            currency_code: currency,
            value: amount.toString(),
          },
          description:
            donationType === "monthly"
              ? "Monthly Donation - Save Paws"
              : "One-time Donation - Save Paws",
          custom_id: JSON.stringify({
            donationType,
            donorInfo,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/cancel`,
        brand_name: "Save Paws",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    }

    // Handle recurring donations (subscriptions)
    if (donationType === "monthly") {
      return await createPayPalSubscription(accessToken, amount, currency, donorInfo)
    }

    // Create one-time payment order
    console.log("Creating PayPal order with data:", JSON.stringify(orderData, null, 2))
    
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    })

    const order = await response.json()
    console.log("PayPal order response status:", response.status)
    console.log("PayPal order response:", JSON.stringify(order, null, 2))

    if (response.ok && order.id) {
      console.log("PayPal order created successfully:", order.id)
      return NextResponse.json({
        orderId: order.id,
        approvalUrl: order.links.find((link: any) => link.rel === "approve")?.href,
      })
    } else {
      console.error("PayPal order creation failed:", order)
      const errorMessage = order.message || order.error_description || order.details?.[0]?.description || "Failed to create PayPal order"
      throw new Error(errorMessage)
    }
  } catch (error: any) {
    console.error("PayPal order creation error:", error)
    return NextResponse.json({ error: error.message || "Payment processing failed" }, { status: 500 })
  }
}

// Capture PayPal payment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    console.log("Capturing PayPal payment for order:", orderId)

    if (!orderId) {
      throw new Error("Order ID is required")
    }

    const accessToken = await getPayPalAccessToken()

    console.log("Sending capture request to PayPal...")
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const captureData = await response.json()
    console.log("PayPal capture response status:", response.status)
    console.log("PayPal capture response:", JSON.stringify(captureData, null, 2))

    if (response.ok && captureData.status === "COMPLETED") {
      console.log("PayPal payment captured successfully")
      
      // Save donation to database
      const purchaseUnit = captureData.purchase_units[0]
      const customData = JSON.parse(purchaseUnit.custom_id || "{}")

      await saveDonationToDatabase({
        amount: Number.parseFloat(purchaseUnit.amount.value),
        currency: purchaseUnit.amount.currency_code,
        paymentMethod: "paypal",
        orderId: captureData.id,
        payerId: captureData.payer.payer_id,
        donorEmail: captureData.payer.email_address,
        status: "completed",
        metadata: customData,
      })

      // Send confirmation email
      await sendDonationConfirmationEmail(captureData)

      return NextResponse.json({ success: true, captureData })
    } else {
      console.error("PayPal capture failed:", captureData)
      const errorMessage = captureData.message || captureData.error_description || captureData.details?.[0]?.description || "Failed to capture payment"
      throw new Error(errorMessage)
    }
  } catch (error: any) {
    console.error("PayPal capture error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Create PayPal subscription for recurring donations
async function createPayPalSubscription(accessToken: string, amount: number, currency: string, donorInfo: any) {
  try {
    // First create a product
    const productResponse = await fetch(`${PAYPAL_BASE_URL}/v1/catalogs/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: "Monthly Donation - Save Paws",
        description: "Monthly recurring donation to support dog rescue operations",
        type: "SERVICE",
        category: "CHARITY",
      }),
    })

    const product = await productResponse.json()

    // Create a billing plan
    const planResponse = await fetch(`${PAYPAL_BASE_URL}/v1/billing/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        name: `Monthly Donation Plan - $${amount}`,
        description: "Monthly recurring donation plan",
        billing_cycles: [
          {
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0, // Infinite
            pricing_scheme: {
              fixed_price: {
                value: amount.toString(),
                currency_code: currency,
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: "CONTINUE",
          payment_failure_threshold: 3,
        },
      }),
    })

    const plan = await planResponse.json()

    // Create subscription
    const subscriptionResponse = await fetch(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        plan_id: plan.id,
        subscriber: {
          name: {
            given_name: donorInfo.firstName,
            surname: donorInfo.lastName,
          },
          email_address: donorInfo.email,
        },
        application_context: {
          brand_name: "Save Paws",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/cancel`,
        },
      }),
    })

    const subscription = await subscriptionResponse.json()

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl: subscription.links.find((link: any) => link.rel === "approve")?.href,
    })
  } catch (error: any) {
    console.error("PayPal subscription error:", error)
    throw error
  }
}

// Helper function to save donation to database
async function saveDonationToDatabase(donationData: any) {
  try {
    console.log("Saving PayPal donation to database:", sanitizeForLogging(donationData))

    // Find or create user based on email
    let user = null
    if (donationData.donorEmail) {


      user = await prisma.user.upsert({
        where: { email: donationData.donorEmail },
        update: {
          firstName: donationData.metadata?.donorInfo?.firstName || null,
          lastName: donationData.metadata?.donorInfo?.lastName || null,
          country: donationData.metadata?.donorInfo?.country || null,
          zipCode: donationData.metadata?.donorInfo?.zipCode || null,
        },
        create: {
          email: donationData.donorEmail,
          firstName: donationData.metadata?.donorInfo?.firstName || null,
          lastName: donationData.metadata?.donorInfo?.lastName || null,
          country: donationData.metadata?.donorInfo?.country || null,
          zipCode: donationData.metadata?.donorInfo?.zipCode || null,
          role: 'DONOR',
        },
      })
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: donationData.amount,
        currency: donationData.currency.toUpperCase(),
        donationType: donationData.metadata?.donationType?.toUpperCase() || 'ONE_TIME',
        status: donationData.status.toUpperCase(),
        paymentMethod: 'PAYPAL',
        paypalOrderId: donationData.orderId,
        paypalPayerId: donationData.payerId,
        donorEmail: donationData.donorEmail,
        donorFirstName: donationData.metadata?.donorInfo?.firstName || null,
        donorLastName: donationData.metadata?.donorInfo?.lastName || null,
        donorCountry: donationData.metadata?.donorInfo?.country || null,
        donorZipCode: donationData.metadata?.donorInfo?.zipCode || null,
        donorMessage: donationData.metadata?.donorInfo?.message || null,
        metadata: donationData.metadata,
        completedAt: donationData.status === 'completed' ? new Date() : null,
        userId: user?.id || null,
      },
    })

    console.log("PayPal donation saved successfully:", donation.id)
    return donation
  } catch (error) {
    console.error("Failed to save PayPal donation to database:", error)
    throw error
  }
}

// Helper function to send confirmation email
async function sendDonationConfirmationEmail(captureData: any) {
  try {
    console.log("Sending PayPal confirmation email for order:", captureData.id)

    if (!captureData.payer?.email_address) {
      console.log("No payer email provided, skipping email")
      return false
    }

    const purchaseUnit = captureData.purchase_units[0]
    const customData = JSON.parse(purchaseUnit.custom_id || '{}')
    const donorName = captureData.payer.name
      ? `${captureData.payer.name.given_name || ''} ${captureData.payer.name.surname || ''}`.trim()
      : 'Valued Donor'

    const success = await sendEmailConfirmation({
      donorEmail: captureData.payer.email_address,
      donorName,
      amount: parseFloat(purchaseUnit.amount.value),
      currency: purchaseUnit.amount.currency_code,
      donationType: customData.donationType || 'one-time',
      paymentMethod: 'PayPal',
      transactionId: captureData.id,
    })

    if (success) {
      // Update donation record to mark receipt as sent
      await prisma.donation.updateMany({
        where: { paypalOrderId: captureData.id },
        data: {
          receiptSent: true,
          receiptSentAt: new Date(),
        },
      })
    }

    return success
  } catch (error) {
    console.error("Failed to send PayPal confirmation email:", error)
    return false
  }
}
