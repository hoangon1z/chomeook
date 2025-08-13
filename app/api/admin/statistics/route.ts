import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/statistics - Get site statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const prismaAny = prisma as any
    let statistics = await prismaAny.statistics.findUnique({
      where: { id: 'default' }
    })

    // Create default statistics if they don't exist
    if (!statistics) {
      statistics = await prismaAny.statistics.create({
        data: { id: 'default' }
      })
    }

    return NextResponse.json({ statistics })
  } catch (error) {
    console.error("Failed to fetch statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}

// PUT /api/admin/statistics - Update site statistics
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      dogsRescued,
      dogsAdopted,
      countriesServed,
      volunteersActive,
      sheltersPartner
    } = body

    // Validate numbers
    if (dogsRescued < 0 || dogsAdopted < 0 || countriesServed < 0 || volunteersActive < 0 || sheltersPartner < 0) {
      return NextResponse.json({ error: "Statistics must be positive numbers" }, { status: 400 })
    }

    // Update or create statistics
    const prismaAny = prisma as any
    const statistics = await prismaAny.statistics.upsert({
      where: { id: 'default' },
      update: {
        dogsRescued: parseInt(dogsRescued),
        dogsAdopted: parseInt(dogsAdopted),
        countriesServed: parseInt(countriesServed),
        volunteersActive: parseInt(volunteersActive),
        sheltersPartner: parseInt(sheltersPartner)
      },
      create: {
        id: 'default',
        dogsRescued: parseInt(dogsRescued),
        dogsAdopted: parseInt(dogsAdopted),
        countriesServed: parseInt(countriesServed),
        volunteersActive: parseInt(volunteersActive),
        sheltersPartner: parseInt(sheltersPartner)
      }
    })

    return NextResponse.json({ statistics })
  } catch (error) {
    console.error("Failed to update statistics:", error)
    return NextResponse.json({ error: "Failed to update statistics" }, { status: 500 })
  }
}
