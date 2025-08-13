import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

export default function DonationCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Donation Cancelled</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Your donation was cancelled. No charges were made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">We understand</h3>
              <p className="text-orange-800">
                Sometimes things don't go as planned. If you experienced any issues during the donation process, please
                don't hesitate to contact our support team.
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Every donation, no matter the size, makes a real difference in the lives of rescued dogs.
              </p>
              <div className="text-sm text-gray-500">
                <p>• $25 provides a week of food for a rescued dog</p>
                <p>• $75 covers complete vaccination for one dog</p>
                <p>• $200 funds emergency surgery</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Need help? Contact our support team:</p>
              <div className="text-sm text-blue-600">
                <p>📞 +1 (555) 123-DOGS</p>
                <p>📧 donate@globaldogrescue.org</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
