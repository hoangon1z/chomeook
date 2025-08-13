"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react"

export function DonationDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-orange-500" />
            Demo Mode - Payment Integration Setup
          </CardTitle>
          <CardDescription>
            To test real payments, you need to configure your PayPal and Stripe credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PayPal Setup */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-sm flex items-center justify-center font-bold">
                P
              </div>
              PayPal Setup
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 1</Badge>
                <span className="text-sm">Go to PayPal Developer Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 2</Badge>
                <span className="text-sm">Create a new app in Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 3</Badge>
                <span className="text-sm">Copy Client ID and Secret</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 4</Badge>
                <span className="text-sm">Add to .env.local file</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm font-mono">
              NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
              <br />
              PAYPAL_CLIENT_SECRET=your_client_secret
            </div>
          </div>

          {/* Stripe Setup */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-purple-600" />
              Stripe Setup
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 1</Badge>
                <span className="text-sm">Go to Stripe Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 2</Badge>
                <span className="text-sm">Get Test API Keys</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Step 3</Badge>
                <span className="text-sm">Add to .env.local file</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm font-mono">
              NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
              <br />
              STRIPE_SECRET_KEY=sk_test_...
            </div>
          </div>

          {/* Test Cards */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Test Payment Methods
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Stripe Test Cards</h4>
                <div className="space-y-1 text-sm">
                  <div>4242 4242 4242 4242 (Visa)</div>
                  <div>5555 5555 5555 4444 (Mastercard)</div>
                  <div>Any future date for expiry</div>
                  <div>Any 3-digit CVC</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">PayPal Sandbox</h4>
                <div className="space-y-1 text-sm">
                  <div>Use PayPal sandbox accounts</div>
                  <div>Create test buyer/seller accounts</div>
                  <div>Test in sandbox environment</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a href="https://developer.paypal.com" target="_blank" rel="noopener noreferrer">
                PayPal Developer
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer">
                Stripe Dashboard
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
