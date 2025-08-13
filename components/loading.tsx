import { Heart } from "lucide-react"

export function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl mb-6 shadow-lg animate-pulse">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2", 
    lg: "w-8 h-8 border-4"
  }

  return (
    <div className={`${sizeClasses[size]} border-gray-200 border-t-blue-600 rounded-full animate-spin`} />
  )
}
