import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// Mock media library
const mediaLibrary = [
  {
    id: 1,
    filename: "bella-before.jpg",
    originalName: "bella-before.jpg",
    url: "/images/bella-before.jpg",
    size: 245760,
    type: "image/jpeg",
    uploadedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 2,
    filename: "bella-after.jpg",
    originalName: "bella-after.jpg",
    url: "/images/bella-after.jpg",
    size: 198432,
    type: "image/jpeg",
    uploadedAt: "2024-03-15T10:05:00Z",
  },
]

// Get all media files
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get("type") // image, video, document
    const limit = url.searchParams.get("limit")

    let filteredMedia = [...mediaLibrary]

    // Filter by type
    if (type) {
      filteredMedia = filteredMedia.filter((media) => media.type.startsWith(type))
    }

    // Limit results
    if (limit) {
      filteredMedia = filteredMedia.slice(0, Number.parseInt(limit))
    }

    // Sort by upload date (newest first)
    filteredMedia.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json({
      media: filteredMedia,
      total: filteredMedia.length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Upload media file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "application/pdf",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 })
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size too large (max 10MB)" }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `${timestamp}${extension}`

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, filename)
    await writeFile(filePath, buffer)

    // Add to media library
    const newMedia = {
      id: Math.max(...mediaLibrary.map((m) => m.id)) + 1,
      filename,
      originalName: file.name,
      url: `/uploads/${filename}`,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    }

    mediaLibrary.push(newMedia)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      media: newMedia,
    })
  } catch (error: any) {
    console.error("Media upload error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
