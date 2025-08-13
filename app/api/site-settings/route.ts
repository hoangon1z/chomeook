import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/site-settings - Get site settings for frontend
export async function GET(request: NextRequest) {
  try {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' }
    })

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: { 
          id: 'default',
          key: 'site_config',
          value: JSON.stringify({
            siteName: 'Save Paws',
            siteDescription: 'Saving Lives, One Rescue at a Time',
            heroTitle: 'Saving Lives, One Rescue at a Time',
            heroSubtitle: 'Join our global mission to rescue, rehabilitate, and rehome abandoned dogs. Every donation helps us save more lives and create happy endings.',
            contactEmail: 'help@globaldogrescue.org',
            contactPhone: '+1 (555) 123-DOGS',
            contactAddress: 'Austin, TX, USA',
            footerText: 'Save Paws - Making a difference worldwide',
            metaTitle: 'Save Paws - Saving Lives Worldwide',
            metaDescription: 'Join our global mission to rescue, rehabilitate, and rehome abandoned dogs.'
          }),
          type: 'JSON',
          category: 'general',
          description: 'Main site configuration'
        }
      })
    }

    // Parse the JSON value if it exists
    const parsedSettings = settings?.value ? JSON.parse(settings.value) : {}

    return NextResponse.json({ settings: parsedSettings })
  } catch (error) {
    console.error("Failed to fetch site settings:", error)
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 })
  }
}
