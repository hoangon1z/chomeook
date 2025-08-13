import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/users/[id] - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        country: true,
        zipCode: true,
        phone: true,
        donations: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            paymentMethod: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            donations: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Failed to fetch user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// PATCH /api/admin/users/[id] - Update user
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
    const { firstName, lastName, role, isActive, country, zipCode, phone } = body

    // Validate role if provided
    const validRoles = ['ADMIN', 'MODERATOR', 'DONOR', 'VOLUNTEER']
    if (role && !validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const updateData: any = {}
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName
    if (role !== undefined) updateData.role = role.toUpperCase()
    if (isActive !== undefined) updateData.isActive = isActive
    if (country !== undefined) updateData.country = country
    if (zipCode !== undefined) updateData.zipCode = zipCode
    if (phone !== undefined) updateData.phone = phone

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        country: true,
        zipCode: true,
        phone: true,
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Failed to update user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] - Deactivate user (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Don't allow deleting self
    if (session.user.id === params.id) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
    }

    // Soft delete by deactivating the user
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: "User deactivated successfully", user })
  } catch (error) {
    console.error("Failed to delete user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
