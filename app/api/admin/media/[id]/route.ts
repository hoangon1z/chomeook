import { type NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import path from "path"

// Mock media library (same as in route.ts)
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
]

// Delete media file
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const mediaIndex = mediaLibrary.findIndex((m) => m.id === id)

    if (mediaIndex === -1) {
      return NextResponse.json({ error: "Media file not found" }, { status: 404 })
    }

    const media = mediaLibrary[mediaIndex]

    // Delete file from filesystem
    try {
      const filePath = path.join(process.cwd(), "public", media.url)
      await unlink(filePath)
    } catch (fileError) {
      console.warn("Could not delete file from filesystem:", fileError)
    }

    // Remove from media library
    const deletedMedia = mediaLibrary.splice(mediaIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: "Media file deleted successfully",
      media: deletedMedia,
    })
  } catch (error: any) {
    console.error("Media deletion error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
