import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Share2, Home } from "lucide-react"
import Link from "next/link"

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Thank You for Your Donation!</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Your generous contribution will help save more dogs and give them the second chance they deserve.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-left text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a confirmation email with your donation receipt</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Your donation will be used immediately for rescue operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>We'll send you updates on the dogs your donation helps save</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div className="text-sm text-gray-600">Dogs Rescued This Year</div>
              </div>
              <div className="p-4">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="p-4">
                <Share2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">15,000+</div>
                <div className="text-sm text-gray-600">Supporters Like You</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/rescue-stories">
                  <Heart className="mr-2 h-5 w-5" />
                  See Rescue Stories
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Help us reach more people by sharing our mission:</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  Share on Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm">
                  Share via Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
