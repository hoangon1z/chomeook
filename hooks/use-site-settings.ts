"use client"

import { useState, useEffect } from 'react'

interface SiteSettings {
  id: string
  siteName: string
  siteDescription: string
  heroTitle: string
  heroSubtitle: string
  heroImage?: string
  logoUrl?: string
  faviconUrl?: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialFacebook?: string
  socialTwitter?: string
  socialInstagram?: string
  socialYoutube?: string
  footerText: string
  metaTitle: string
  metaDescription: string
  metaKeywords?: string
  googleAnalyticsId?: string
  facebookPixelId?: string
  customCss?: string
  customJs?: string
  maintenanceMode: boolean
  maintenanceMessage?: string
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings')
        if (!response.ok) {
          throw new Error('Failed to fetch site settings')
        }
        const data = await response.json()
        setSettings(data.settings)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading, error, refetch: () => {
    setLoading(true)
    setError(null)
    // Re-run the effect
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings')
        if (!response.ok) {
          throw new Error('Failed to fetch site settings')
        }
        const data = await response.json()
        setSettings(data.settings)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }}
}
