import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status && status !== 'all') {
      where.isPublished = status === 'published'
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get pages with pagination
    const prismaAny = prisma as any
    const [pages, total] = await Promise.all([
      prismaAny.page.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      prismaAny.page.count({ where })
    ])

    return NextResponse.json({
      pages,
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
    console.error("Failed to fetch pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

// POST /api/admin/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      isPublished = false
    } = body

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json({ 
        error: "Missing required fields: title, slug, content" 
      }, { status: 400 })
    }

    // Check if slug already exists
    const prismaAny = prisma as any
    const existingPage = await prismaAny.page.findUnique({
      where: { slug }
    })

    if (existingPage) {
      return NextResponse.json({ 
        error: "A page with this slug already exists" 
      }, { status: 400 })
    }

    // Create page
    const page = await prismaAny.page.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        metaTitle,
        metaDescription,
        metaKeywords,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return NextResponse.json({ page })
  } catch (error) {
    console.error("Failed to create page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
