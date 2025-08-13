"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, AlertTriangle } from "lucide-react"

export function PaymentTestGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Payment Integration Ready!
          </CardTitle>
          <CardDescription>
            Your PayPal and Stripe credentials are now configured. Here's how to test payments:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stripe Test Cards */}
          <div className="border rounded-lg p-4 bg-purple-50">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-purple-600" />
              Stripe Test Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="font-medium text-sm">✅ Successful Payments:</div>
                <div className="space-y-1 text-sm font-mono bg-white p-2 rounded">
                  <div>4242 4242 4242 4242 (Visa)</div>
                  <div>5555 5555 5555 4444 (Mastercard)</div>
                  <div>3782 822463 10005 (American Express)</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">❌ Declined Cards:</div>
                <div className="space-y-1 text-sm font-mono bg-white p-2 rounded">
                  <div>4000 0000 0000 0002 (Declined)</div>
                  <div>4000 0000 0000 9995 (Insufficient funds)</div>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded text-sm">
              <strong>For all cards:</strong> Use any future expiry date (e.g., 12/25) and any 3-digit CVC
            </div>
          </div>

          {/* PayPal Sandbox */}
          <div className="border rounded-lg p-4 bg-blue-50">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-white text-sm flex items-center justify-center font-bold">
                P
              </div>
              PayPal Sandbox Testing
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Badge variant="outline">1</Badge>
                <div className="text-sm">
                  <strong>Create Sandbox Account:</strong> Go to{" "}
                  <a href="https://developer.paypal.com" className="text-blue-600 underline">
                    PayPal Developer
                  </a>{" "}
                  → Sandbox → Accounts
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">2</Badge>
                <div className="text-sm">
                  <strong>Create Test Buyer:</strong> Create a personal sandbox account with test funds
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">3</Badge>
                <div className="text-sm">
                  <strong>Test Payment:</strong> Use the sandbox account credentials to complete payments
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded text-sm">
              <strong>Note:</strong> PayPal will open in sandbox mode - you'll see "sandbox" in the URL
            </div>
          </div>

          {/* Test Scenarios */}
          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Test Scenarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">One-time Donations:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Select predefined amount ($25, $75, etc.)</li>
                  <li>• Enter custom amount</li>
                  <li>• Test with both Stripe and PayPal</li>
                  <li>• Verify success/cancel pages</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Monthly Subscriptions:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Select "Monthly recurring"</li>
                  <li>• Test subscription creation</li>
                  <li>• Check recurring payment setup</li>
                  <li>• Verify subscription management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              Important Notes
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-orange-600">⚠️</span>
                <span>These are TEST credentials - no real money will be charged</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600">⚠️</span>
                <span>For production, replace with live API keys and remove test mode</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600">⚠️</span>
                <span>Always test both successful and failed payment scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600">⚠️</span>
                <span>Check browser console for any errors during testing</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
