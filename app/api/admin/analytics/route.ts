import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Mock analytics data (fallback)
const analyticsData = {
  overview: {
    totalDonations: 1200000,
    totalDonors: 15000,
    dogsRescued: 2847,
    dogsAdopted: 2156,
    successRate: 76,
    averageDonation: 80,
    monthlyGrowth: 12,
    newVolunteers: 89,
  },
  monthlyStats: [
    { month: "Jan", donations: 85000, donors: 1200, rescued: 245, adopted: 189 },
    { month: "Feb", donations: 92000, donors: 1350, rescued: 267, adopted: 201 },
    { month: "Mar", donations: 98000, donors: 1400, rescued: 289, adopted: 234 },
    { month: "Apr", donations: 87000, donors: 1250, rescued: 234, adopted: 198 },
    { month: "May", donations: 105000, donors: 1500, rescued: 298, adopted: 245 },
    { month: "Jun", donations: 112000, donors: 1600, rescued: 312, adopted: 267 },
    { month: "Jul", donations: 118000, donors: 1650, rescued: 334, adopted: 289 },
    { month: "Aug", donations: 108000, donors: 1550, rescued: 298, adopted: 256 },
    { month: "Sep", donations: 95000, donors: 1400, rescued: 267, adopted: 223 },
    { month: "Oct", donations: 102000, donors: 1450, rescued: 289, adopted: 234 },
    { month: "Nov", donations: 89000, donors: 1300, rescued: 234, adopted: 201 },
    { month: "Dec", donations: 67000, donors: 950, rescued: 180, adopted: 149 },
  ],
  topCountries: [
    { country: "United States", flag: "🇺🇸", donations: 850000, donors: 12000 },
    { country: "Canada", flag: "🇨🇦", donations: 150000, donors: 1500 },
    { country: "United Kingdom", flag: "🇬🇧", donations: 120000, donors: 1000 },
    { country: "Australia", flag: "🇦🇺", donations: 80000, donors: 500 },
  ],
  paymentMethods: [
    { method: "Credit Card", percentage: 65, amount: 780000 },
    { method: "PayPal", percentage: 30, amount: 360000 },
    { method: "Bank Transfer", percentage: 3, amount: 36000 },
    { method: "Other", percentage: 2, amount: 24000 },
  ],
  recentActivity: [
    {
      type: "donation",
      message: "New donation received: $500 from John Smith",
      timestamp: "2024-12-20T10:30:00Z",
    },
    {
      type: "story",
      message: 'New rescue story published: "Bella\'s Recovery"',
      timestamp: "2024-12-20T09:15:00Z",
    },
    {
      type: "adoption",
      message: "Max found his forever home!",
      timestamp: "2024-12-20T08:45:00Z",
    },
    {
      type: "volunteer",
      message: "New volunteer registered: Sarah Johnson",
      timestamp: "2024-12-20T07:20:00Z",
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const section = url.searchParams.get("section")
    const period = url.searchParams.get('period') || '30' // days
    const periodDays = parseInt(period)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    // Try to get real data from database
    try {
      // Get total donations
      const totalDonations = await prisma.donation.aggregate({
        _sum: { amount: true },
        _count: { id: true },
        where: {
          status: 'COMPLETED',
        }
      })

      // Get recent donations
      const recentDonations = await prisma.donation.findMany({
        where: {
          status: 'COMPLETED',
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          amount: true,
          donorFirstName: true,
          donorLastName: true,
          donorEmail: true,
          paymentMethod: true,
          createdAt: true,
        }
      })

      // Get payment method stats
      const paymentMethodStats = await prisma.donation.groupBy({
        by: ['paymentMethod'],
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startDate,
          }
        },
        _sum: { amount: true },
        _count: { paymentMethod: true },
      })

      // Get user count
      const userCount = await prisma.user.count()

      const realData = {
        overview: {
          totalDonations: Number(totalDonations._sum.amount || 0),
          totalDonors: userCount,
          dogsRescued: 2847, // This would come from a rescue_operations table
          dogsAdopted: 2156, // This would come from an adoptions table
          successRate: 76,
          averageDonation: totalDonations._count.id ? Math.round(Number(totalDonations._sum.amount || 0) / totalDonations._count.id) : 0,
          monthlyGrowth: 12, // This would be calculated from historical data
          newVolunteers: 89, // This would come from user registrations
        },
        recentActivity: recentDonations.map((d: any) => ({
          type: "donation",
          message: `New donation received: $${d.amount} from ${d.donorFirstName && d.donorLastName ? `${d.donorFirstName} ${d.donorLastName}` : d.donorEmail.split('@')[0]}`,
          timestamp: d.createdAt.toISOString(),
        })),
        paymentMethods: paymentMethodStats.map(stat => ({
          method: stat.paymentMethod,
          percentage: Math.round((stat._count.paymentMethod / totalDonations._count.id) * 100),
          amount: Number(stat._sum.amount || 0),
        })),
        monthlyStats: analyticsData.monthlyStats, // Would be calculated from historical data
        topCountries: analyticsData.topCountries, // Would be calculated from donor locations
      }

      if (section && realData.hasOwnProperty(section)) {
        return NextResponse.json({
          [section]: realData[section as keyof typeof realData],
        })
      }

      return NextResponse.json(realData)
    } catch (dbError) {
      console.error("Database error, falling back to mock data:", dbError)
      // Fall back to mock data if database is not available
      if (section && analyticsData.hasOwnProperty(section)) {
        return NextResponse.json({
          [section]: analyticsData[section as keyof typeof analyticsData],
        })
      }
      return NextResponse.json(analyticsData)
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
