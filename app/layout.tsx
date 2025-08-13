import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Save Paws - Saving Lives Worldwide",
    template: "%s | Save Paws"
  },
  description: "Join our global mission to rescue, rehabilitate, and rehome abandoned dogs. Support our rescue operations in the USA and worldwide through secure donations via PayPal, Stripe, and credit cards.",
  keywords: ["dog rescue", "animal rescue", "donate", "PayPal", "Stripe", "USA", "international", "rescue stories", "animal welfare", "pet adoption"],
  authors: [{ name: "Save Paws Team" }],
  creator: "Save Paws",
  publisher: "Save Paws",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Save Paws - Saving Lives Worldwide',
    description: 'Join our mission to rescue, rehabilitate, and rehome abandoned dogs globally. Donate securely to make a difference.',
    siteName: 'Save Paws',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save Paws - Saving Lives Worldwide',
    description: 'Join our mission to rescue, rehabilitate, and rehome abandoned dogs globally.',
    creator: '@globaldogrescue',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>        
        <AuthProvider>
          <Navigation />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
