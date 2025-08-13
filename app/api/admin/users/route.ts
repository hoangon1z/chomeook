import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/users - Get all users with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (role) {
      where.role = role.toUpperCase()
    }
    
    if (isActive !== null && isActive !== '') {
      where.isActive = isActive === 'true'
    }
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          emailVerified: true,
          createdAt: true,
          country: true,
          zipCode: true,
          phone: true,
          _count: {
            select: {
              donations: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ])

    // Get summary statistics
    const stats = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true },
    })

    const roleStats = stats.reduce((acc, stat) => {
      acc[stat.role.toLowerCase()] = stat._count.role
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
      stats: {
        totalUsers: total,
        roleStats,
      }
    })
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST /api/admin/users - Create new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      email,
      firstName,
      lastName,
      role = "DONOR",
      country,
      zipCode,
      phone,
      isActive = true
    } = body

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return NextResponse.json({ 
        error: "Missing required fields: email, firstName, lastName" 
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ 
        error: "User with this email already exists" 
      }, { status: 400 })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role: role.toUpperCase(),
        country,
        zipCode,
        phone,
        isActive,
        emailVerified: new Date(), // Auto-verify admin created users
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        country: true,
        zipCode: true,
        phone: true,
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Failed to create user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
