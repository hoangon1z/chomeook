"use client"

import { useState, useEffect } from 'react'

interface Statistics {
  id: string
  dogsRescued: number
  dogsAdopted: number
  countriesServed: number
  volunteersActive: number
  sheltersPartner: number
  updatedAt: string
  createdAt: string
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/statistics')
        if (!response.ok) {
          throw new Error('Failed to fetch statistics')
        }
        const data = await response.json()
        setStatistics(data.statistics)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  return { statistics, loading, error, refetch: () => {
    setLoading(true)
    setError(null)
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/statistics')
        if (!response.ok) {
          throw new Error('Failed to fetch statistics')
        }
        const data = await response.json()
        setStatistics(data.statistics)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchStatistics()
  }}
}
