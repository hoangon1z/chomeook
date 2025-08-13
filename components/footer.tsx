"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Globe, Shield } from "lucide-react"
import { useSiteSettings } from "@/hooks/use-site-settings"

export function Footer() {
  const { settings } = useSiteSettings()
  return (
    <footer className="relative bg-slate-950 text-slate-200">
      <div className="h-px w-full bg-gradient-to-r from-blue-500/30 via-emerald-400/30 to-purple-500/30" />

      <div className="container mx-auto px-4 py-10 lg:py-14">
        {/* Newsletter / Mission CTA */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-emerald-500/10 to-purple-600/10" />
            <div className="relative p-6 md:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold text-white">Join Our Mission to Save More Lives</h3>
                <p className="text-slate-300 mt-2">Get updates on rescues, adoptions, and ways you can help. No spam, unsubscribe anytime.</p>
              </div>
              <form className="flex w-full md:w-auto gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-300 focus-visible:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-xl font-bold">{settings?.siteName || "Save Paws"}</div>
                <div className="flex items-center gap-1 text-sm text-slate-300">
                  <Globe className="h-3 w-3" />
                  <span>Worldwide Network</span>
                </div>
              </div>
            </div>
            <p className="text-slate-300">
              {settings?.siteDescription || "Dedicated to rescuing, rehabilitating, and rehoming abandoned dogs worldwide. Every donation helps save lives."}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-slate-300 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="text-slate-300 hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="text-slate-300 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href={`mailto:${settings?.contactEmail || "help@globaldogrescue.org"}`} aria-label="Email" className="text-slate-300 hover:text-white"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/rescue-stories" className="hover:text-white">Rescue Stories</Link></li>
              <li><Link href="/our-impact" className="hover:text-white">Our Impact</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
            </ul>
          </div>

          {/* Donate Securely */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Donate Securely</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" /><span>Credit & Debit Cards</span></li>
              <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" /><span>PayPal</span></li>
              <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" /><span>Stripe</span></li>
            </ul>
            <div className="mt-4 text-xs text-slate-400">All donations are secure and tax-deductible</div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-blue-500" /><span>{settings?.contactPhone || "+1 (555) 123-DOGS"}</span></div>
              <div className="flex items-center gap-2"><Mail className="h-5 w-5 text-blue-500" /><span>{settings?.contactEmail || "help@globaldogrescue.org"}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-blue-500" /><span>Headquarters: {settings?.contactAddress || "Austin, TX, USA"}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-300 text-sm">© 2024 {settings?.siteName || "Save Paws"}. All rights reserved. 501(c)(3) Non-Profit Organization</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/transparency" className="hover:text-white">Financial Transparency</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
