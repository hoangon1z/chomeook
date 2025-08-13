import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/donations - Get all donations with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const paymentMethod = searchParams.get('paymentMethod')
    const donationType = searchParams.get('donationType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }

    if (paymentMethod && paymentMethod !== 'all') {
      where.paymentMethod = paymentMethod.toUpperCase()
    }

    if (donationType) {
      where.donationType = donationType.toUpperCase()
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }

    // Get donations with pagination
    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
      }),
      prisma.donation.count({ where })
    ])

    // Get summary statistics
    const stats = await prisma.donation.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true },
      _avg: { amount: true },
    })

    // Get payment method statistics
    const paymentMethodStats = await prisma.donation.groupBy({
      by: ['paymentMethod'],
      where,
      _count: { paymentMethod: true },
    })

    const paymentMethodStatsFormatted = paymentMethodStats.reduce((acc, stat) => {
      acc[stat.paymentMethod.toLowerCase()] = stat._count.paymentMethod
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
      summary: {
        totalAmount: Number(stats._sum.amount ?? 0),
        averageAmount: (() => {
          const avg = Number(stats._avg.amount ?? 0)
          return Math.round(avg * 100) / 100
        })(),
        totalDonations: stats._count.id || 0,
        paymentMethodStats: paymentMethodStatsFormatted,
      }
    })
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}
