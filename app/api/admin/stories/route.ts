import { type NextRequest, NextResponse } from "next/server"

// Mock database for rescue stories
const rescueStories = [
  {
    id: 1,
    title: "Bella's Miraculous Recovery",
    location: "Austin, Texas, USA",
    rescueDate: "2024-03-15",
    adoptionDate: "2024-06-02",
    story:
      "Found abandoned in a parking lot during a thunderstorm, Bella was severely malnourished and had multiple injuries. After 3 months of intensive care and rehabilitation, she made a full recovery and found her forever home with the Johnson family.",
    beforeImage: "/images/bella-before.jpg",
    afterImage: "/images/bella-after.jpg",
    status: "Adopted",
    rescueTeam: "Austin Rescue Team",
    medicalCost: "$2,400",
    featured: true,
    published: true,
    views: 1250,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-06-02T15:30:00Z",
  },
  {
    id: 2,
    title: "Max's Second Chance",
    location: "Los Angeles, California, USA",
    rescueDate: "2024-02-08",
    adoptionDate: "2024-05-20",
    story:
      "Max was hit by a car and left on the roadside. Emergency surgery saved his life, and after months of physical therapy, he's now working as a therapy dog in local hospitals, bringing joy to patients.",
    beforeImage: "/images/max-before.jpg",
    afterImage: "/images/max-after.jpg",
    status: "Adopted - Therapy Dog",
    rescueTeam: "LA Emergency Response",
    medicalCost: "$8,500",
    featured: true,
    published: true,
    views: 890,
    createdAt: "2024-02-08T14:20:00Z",
    updatedAt: "2024-05-20T11:45:00Z",
  },
]

// Get all rescue stories
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const featured = url.searchParams.get("featured")
    const published = url.searchParams.get("published")
    const limit = url.searchParams.get("limit")

    let filteredStories = [...rescueStories]

    // Filter by featured
    if (featured === "true") {
      filteredStories = filteredStories.filter((story) => story.featured)
    }

    // Filter by published
    if (published === "true") {
      filteredStories = filteredStories.filter((story) => story.published)
    }

    // Limit results
    if (limit) {
      filteredStories = filteredStories.slice(0, Number.parseInt(limit))
    }

    // Sort by creation date (newest first)
    filteredStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      stories: filteredStories,
      total: filteredStories.length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Create new rescue story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      location,
      rescueDate,
      adoptionDate,
      story,
      beforeImage,
      afterImage,
      status,
      rescueTeam,
      medicalCost,
      featured = false,
      published = false,
    } = body

    // Validate required fields
    if (!title || !location || !rescueDate || !story) {
      return NextResponse.json(
        { error: "Missing required fields: title, location, rescueDate, story" },
        { status: 400 },
      )
    }

    // Create new story
    const newStory = {
      id: Math.max(...rescueStories.map((s) => s.id)) + 1,
      title,
      location,
      rescueDate,
      adoptionDate: adoptionDate || null,
      story,
      beforeImage: beforeImage || null,
      afterImage: afterImage || null,
      status: status || "In Care",
      rescueTeam: rescueTeam || "",
      medicalCost: medicalCost || "$0",
      featured,
      published,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    rescueStories.push(newStory)

    return NextResponse.json({
      success: true,
      message: "Rescue story created successfully",
      story: newStory,
    })
  } catch (error: any) {
    console.error("Story creation error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
