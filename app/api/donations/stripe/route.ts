import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { sendDonationConfirmationEmail } from "@/lib/email"
import { sanitizeForLogging } from "@/lib/encryption"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
} as any)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "usd", donationType, donorInfo, paymentMethodId } = body

    // Validate required fields
    if (!amount || !donorInfo || !paymentMethodId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create customer
    const customer = await stripe.customers.create({
      email: donorInfo.email,
      name: `${donorInfo.firstName} ${donorInfo.lastName}`,
      address: {
        country: donorInfo.country,
        postal_code: donorInfo.zipCode,
      },
      metadata: {
        donationType: donationType,
        source: "website_donation",
      },
    })

    // Create payment intent
    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      customer: customer.id,
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/success`,
      metadata: {
        donationType: donationType,
        donorName: `${donorInfo.firstName} ${donorInfo.lastName}`,
        donorEmail: donorInfo.email,
        message: donorInfo.message || "",
      },
      receipt_email: donorInfo.email,
    }

    // Handle recurring donations
    if (donationType === "monthly") {
      // Create subscription instead of one-time payment
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price_data: {
              currency: currency,
              product: "donation",
              unit_amount: Math.round(amount * 100),
              recurring: { interval: "month" },
            } as any,
          },
        ],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          donorName: `${donorInfo.firstName} ${donorInfo.lastName}`,
          donorEmail: donorInfo.email,
          message: donorInfo.message || "",
        },
      })

      const invoice: any = subscription.latest_invoice as any
      const clientSecret = invoice?.payment_intent?.client_secret
      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret,
        customerId: customer.id,
      })
    } else {
      // One-time payment
      const paymentIntent = await stripe.paymentIntents.create(paymentIntentData)

      return NextResponse.json({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
      })
    }
  } catch (error: any) {
    console.error("Stripe payment error:", error)
    return NextResponse.json({ error: error.message || "Payment processing failed" }, { status: 500 })
  }
}

// Handle payment confirmation
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentIntentId } = body

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      // Save donation to database
      await saveDonationToDatabase({
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentMethod: "stripe",
        paymentIntentId: paymentIntent.id,
        customerId: paymentIntent.customer as string,
        donorEmail: paymentIntent.receipt_email,
        status: "completed",
        metadata: paymentIntent.metadata,
      })

      // Send confirmation email
      await sendStripeConfirmationEmail(paymentIntent)

      return NextResponse.json({ success: true, paymentIntent })
    }

    return NextResponse.json({ success: false, paymentIntent })
  } catch (error: any) {
    console.error("Payment confirmation error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Helper function to save donation to database
async function saveDonationToDatabase(donationData: any) {
  try {
    console.log("Saving donation to database:", sanitizeForLogging(donationData))

    // Find or create user based on email
    let user = null
    if (donationData.donorEmail) {
      user = await prisma.user.upsert({
        where: { email: donationData.donorEmail },
        update: {
          firstName: donationData.metadata?.donorName?.split(' ')[0] || null,
          lastName: donationData.metadata?.donorName?.split(' ').slice(1).join(' ') || null,
        },
        create: {
          email: donationData.donorEmail,
          firstName: donationData.metadata?.donorName?.split(' ')[0] || null,
          lastName: donationData.metadata?.donorName?.split(' ').slice(1).join(' ') || null,
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
        paymentMethod: 'STRIPE',
        stripePaymentIntentId: donationData.paymentIntentId,
        stripeCustomerId: donationData.customerId,
        donorEmail: donationData.donorEmail,
        donorFirstName: donationData.metadata?.donorName?.split(' ')[0] || null,
        donorLastName: donationData.metadata?.donorName?.split(' ').slice(1).join(' ') || null,
        donorMessage: donationData.metadata?.message || null,
        metadata: donationData.metadata,
        completedAt: donationData.status === 'completed' ? new Date() : null,
        userId: user?.id || null,
      },
    })

    console.log("Donation saved successfully:", donation.id)
    return donation
  } catch (error) {
    console.error("Failed to save donation to database:", error)
    throw error
  }
}

// Helper function to send confirmation email
async function sendStripeConfirmationEmail(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("Sending confirmation email for payment:", paymentIntent.id)

    if (!paymentIntent.receipt_email) {
      console.log("No receipt email provided, skipping email")
      return false
    }

    const success = await sendDonationConfirmationEmail({
      donorEmail: paymentIntent.receipt_email,
      donorName: paymentIntent.metadata.donorName || 'Valued Donor',
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      donationType: paymentIntent.metadata.donationType || 'one-time',
      paymentMethod: 'Credit/Debit Card',
      transactionId: paymentIntent.id,
    })

    if (success) {
      // Update donation record to mark receipt as sent
      await prisma.donation.updateMany({
        where: { stripePaymentIntentId: paymentIntent.id },
        data: {
          receiptSent: true,
          receiptSentAt: new Date(),
        },
      })
    }

    return success
  } catch (error) {
    console.error("Failed to send confirmation email:", error)
    return false
  }
}
