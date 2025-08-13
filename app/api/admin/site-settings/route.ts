import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/site-settings - Get site settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let settings = await (prisma as any).siteSetting.findUnique({
      where: { id: 'default' }
    })

    // Create default settings if they don't exist
    if (!settings) {
      settings = await (prisma as any).siteSetting.create({
        data: { id: 'default' }
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Failed to fetch site settings:", error)
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 })
  }
}

// PUT /api/admin/site-settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      siteName,
      siteDescription,
      heroTitle,
      heroSubtitle,
      heroImage,
      logoUrl,
      faviconUrl,
      contactEmail,
      contactPhone,
      contactAddress,
      socialFacebook,
      socialTwitter,
      socialInstagram,
      socialYoutube,
      footerText,
      metaTitle,
      metaDescription,
      metaKeywords,
      googleAnalyticsId,
      facebookPixelId,
      customCss,
      customJs,
      maintenanceMode,
      maintenanceMessage
    } = body

    // Update or create settings
    const settings = await (prisma as any).siteSetting.upsert({
      where: { id: 'default' },
      update: {
        siteName,
        siteDescription,
        heroTitle,
        heroSubtitle,
        heroImage,
        logoUrl,
        faviconUrl,
        contactEmail,
        contactPhone,
        contactAddress,
        socialFacebook,
        socialTwitter,
        socialInstagram,
        socialYoutube,
        footerText,
        metaTitle,
        metaDescription,
        metaKeywords,
        googleAnalyticsId,
        facebookPixelId,
        customCss,
        customJs,
        maintenanceMode,
        maintenanceMessage
      },
      create: {
        id: 'default',
        siteName,
        siteDescription,
        heroTitle,
        heroSubtitle,
        heroImage,
        logoUrl,
        faviconUrl,
        contactEmail,
        contactPhone,
        contactAddress,
        socialFacebook,
        socialTwitter,
        socialInstagram,
        socialYoutube,
        footerText,
        metaTitle,
        metaDescription,
        metaKeywords,
        googleAnalyticsId,
        facebookPixelId,
        customCss,
        customJs,
        maintenanceMode,
        maintenanceMessage
      }
    })

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Failed to update site settings:", error)
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 })
  }
}
