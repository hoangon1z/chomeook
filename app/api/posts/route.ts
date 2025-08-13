import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/posts - Get published posts for frontend
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isPublished: true // Only published posts
    }
    
    if (category) {
      where.category = {
        slug: category
      }
    }
    
    if (featured === 'true') {
      where.isFeatured = true
    }

    // Get posts with pagination
    const prismaAny = prisma as any
    const [posts, total] = await Promise.all([
      prismaAny.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          },
          category: {
            select: {
              name: true,
              slug: true,
              color: true
            }
          }
        }
      }),
      prismaAny.post.count({ where })
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      }
    })
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
