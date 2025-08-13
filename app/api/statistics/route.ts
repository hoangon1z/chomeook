import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/statistics - Get site statistics for frontend
export async function GET(request: NextRequest) {
  try {
    let statistics = await prisma.statistics.findUnique({
      where: { id: 'default' }
    })

    // Create default statistics if they don't exist
    if (!statistics) {
      statistics = await prisma.statistics.create({
        data: { 
          id: 'default',
          dogsRescued: 2847,
          dogsAdopted: 2156,
          countriesServed: 25,
          volunteersActive: 1250,
          sheltersPartner: 89
        }
      })
    }

    return NextResponse.json({ statistics })
  } catch (error) {
    console.error("Failed to fetch statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
