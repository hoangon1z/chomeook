import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database
// For demo purposes, we'll use the same mock data
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
]

// Get single rescue story
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const story = rescueStories.find((s) => s.id === id)

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 })
    }

    return NextResponse.json(story)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Update rescue story
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const storyIndex = rescueStories.findIndex((s) => s.id === id)

    if (storyIndex === -1) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 })
    }

    // Update the story
    rescueStories[storyIndex] = {
      ...rescueStories[storyIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Story updated successfully",
      story: rescueStories[storyIndex],
    })
  } catch (error: any) {
    console.error("Story update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Delete rescue story
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const storyIndex = rescueStories.findIndex((s) => s.id === id)

    if (storyIndex === -1) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 })
    }

    // Remove the story
    const deletedStory = rescueStories.splice(storyIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: "Story deleted successfully",
      story: deletedStory,
    })
  } catch (error: any) {
    console.error("Story deletion error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
