"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  // Immediately redirect away. No public signup allowed.
  if (typeof window !== "undefined") {
    router.replace("/")
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Signup Disabled</h2>
          <p className="text-gray-600">This site does not support public registration.</p>
        </CardContent>
      </Card>
    </div>
  )
}
