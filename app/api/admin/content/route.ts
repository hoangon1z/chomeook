import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database
// For demo purposes, we'll use in-memory storage
let siteContent = {
  hero: {
    title: "Saving Lives, One Rescue at a Time",
    subtitle:
      "Join our global mission to rescue, rehabilitate, and rehome abandoned dogs. Every donation helps us save more lives and create happy endings.",
    backgroundImage: "/hero-bg.jpg",
    visible: true,
  },
  stats: {
    dogsRescued: 2847,
    dogsAdopted: 2156,
    countries: 25,
    totalDonations: 1200000,
  },
  contact: {
    phone: "+1 (555) 123-DOGS",
    email: "help@globaldogrescue.org",
    address: "Headquarters: Austin, TX, USA",
  },
  seo: {
    title: "Save Paws - Saving Lives Worldwide",
    description:
      "Join our global mission to rescue, rehabilitate, and rehome abandoned dogs. Support our rescue operations worldwide through secure donations.",
  },
}

// Get site content
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(siteContent)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Update site content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, data } = body

    if (!section || !data) {
      return NextResponse.json({ error: "Missing section or data" }, { status: 400 })
    }

    // Update the specific section
    if (siteContent.hasOwnProperty(section)) {
      siteContent = {
        ...siteContent,
        [section]: { ...siteContent[section as keyof typeof siteContent], ...data },
      }

      // In a real application, you would save this to your database
      console.log(`Updated ${section}:`, data)

      return NextResponse.json({
        success: true,
        message: `${section} updated successfully`,
        data: siteContent[section as keyof typeof siteContent],
      })
    } else {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Content update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
