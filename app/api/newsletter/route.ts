import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email"

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if email already subscribed
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { error: "Email is already subscribed" },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        const subscription = await prisma.newsletter.update({
          where: { email },
          data: {
            isActive: true,
            firstName: firstName || existingSubscription.firstName,
            lastName: lastName || existingSubscription.lastName,
          }
        })

        return NextResponse.json({
          message: "Newsletter subscription reactivated",
          subscription
        })
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletter.create({
      data: {
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        isActive: true,
      }
    })

    // Send welcome email (don't wait for it)
    if (firstName && lastName) {
      sendWelcomeEmail(email, `${firstName} ${lastName}`).catch(error => {
        console.error("Failed to send welcome email:", error)
      })
    }

    return NextResponse.json({
      message: "Successfully subscribed to newsletter",
      subscription
    })

  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Deactivate subscription
    const subscription = await prisma.newsletter.updateMany({
      where: { email, isActive: true },
      data: { isActive: false }
    })

    if (subscription.count === 0) {
      return NextResponse.json(
        { error: "Email not found or already unsubscribed" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Successfully unsubscribed from newsletter"
    })

  } catch (error) {
    console.error("Newsletter unsubscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
