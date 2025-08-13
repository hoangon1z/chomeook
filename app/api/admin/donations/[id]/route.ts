import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/donations/[id] - Get single donation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const donation = await prisma.donation.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    })

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    return NextResponse.json({ donation })
  } catch (error) {
    console.error("Failed to fetch donation:", error)
    return NextResponse.json({ error: "Failed to fetch donation" }, { status: 500 })
  }
}

// PATCH /api/admin/donations/[id] - Update donation
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, donorMessage, metadata } = body

    // Validate status if provided
    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (donorMessage !== undefined) updateData.donorMessage = donorMessage
    if (metadata) updateData.metadata = metadata

    // Set completedAt if status is COMPLETED
    if (status === 'COMPLETED') {
      updateData.completedAt = new Date()
    }

    const donation = await prisma.donation.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      }
    })

    return NextResponse.json({ donation })
  } catch (error) {
    console.error("Failed to update donation:", error)
    return NextResponse.json({ error: "Failed to update donation" }, { status: 500 })
  }
}

// DELETE /api/admin/donations/[id] - Delete donation (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Instead of hard delete, we'll mark as cancelled
    const donation = await prisma.donation.update({
      where: { id: params.id },
      data: { 
        status: 'CANCELLED',
        metadata: {
          ...((await prisma.donation.findUnique({ where: { id: params.id } }))?.metadata as any || {}),
          cancelledBy: 'admin',
          cancelledAt: new Date().toISOString()
        }
      }
    })

    return NextResponse.json({ message: "Donation cancelled successfully", donation })
  } catch (error) {
    console.error("Failed to delete donation:", error)
    return NextResponse.json({ error: "Failed to delete donation" }, { status: 500 })
  }
}
