import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/posts - Get all posts
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
    const category = searchParams.get('category')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status && status !== 'all') {
      where.isPublished = status === 'published'
    }
    
    if (category && category !== 'all') {
      where.categoryId = category
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get posts with pagination
    const prismaAny = prisma as any
    const [posts, total] = await Promise.all([
      prismaAny.post.findMany({
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
          },
          category: {
            select: {
              id: true,
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

// POST /api/admin/posts - Create new post
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
      isPublished = false,
      isFeatured = false,
      categoryId
    } = body

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json({ 
        error: "Missing required fields: title, slug, content" 
      }, { status: 400 })
    }

    // Check if slug already exists
    const prismaAny = prisma as any
    const existingPost = await prismaAny.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json({ 
        error: "A post with this slug already exists" 
      }, { status: 400 })
    }

    // Create post
    const post = await prismaAny.post.create({
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
        isFeatured,
        publishedAt: isPublished ? new Date() : null,
        authorId: session.user.id,
        categoryId
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true
          }
        }
      }
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Failed to create post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
