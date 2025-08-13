import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-6xl font-bold text-gray-900 mb-2">404</CardTitle>
          <CardTitle className="text-2xl text-gray-900">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/donate">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Make a donation
              </Link>
            </Button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Looking for something specific? Try our{" "}
              <Link href="/rescue-stories" className="text-blue-600 hover:text-blue-800 underline">
                rescue stories
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
