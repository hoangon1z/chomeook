import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/pages/[slug] - Get page by slug for frontend
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const prismaAny = prisma as any
    const page = await prismaAny.page.findUnique({
      where: { 
        slug: params.slug,
        isPublished: true // Only return published pages
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Increment view count (optional)
    // await prisma.page.update({
    //   where: { id: page.id },
    //   data: { viewCount: { increment: 1 } }
    // })

    return NextResponse.json({ page })
  } catch (error) {
    console.error("Failed to fetch page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}
