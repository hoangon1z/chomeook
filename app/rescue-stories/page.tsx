import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Search, Heart, Users } from "lucide-react"
import Image from "next/image"

export default function RescueStoriesPage() {
  const rescueStories = [
    {
      id: 1,
      title: "Bella's Miraculous Recovery",
      location: "Austin, Texas, USA",
      rescueDate: "March 15, 2024",
      adoptionDate: "June 2, 2024",
      story:
        "Found abandoned in a parking lot during a thunderstorm, Bella was severely malnourished and had multiple injuries. After 3 months of intensive care and rehabilitation, she made a full recovery and found her forever home with the Johnson family.",
      beforeImage: "/placeholder.svg?height=300&width=300",
      afterImage: "/placeholder.svg?height=300&width=300",
      status: "Adopted",
      rescueTeam: "Austin Rescue Team",
      medicalCost: "$2,400",
      featured: true,
    },
    {
      id: 2,
      title: "Max's Second Chance",
      location: "Los Angeles, California, USA",
      rescueDate: "February 8, 2024",
      adoptionDate: "May 20, 2024",
      story:
        "Max was hit by a car and left on the roadside. Emergency surgery saved his life, and after months of physical therapy, he's now working as a therapy dog in local hospitals, bringing joy to patients.",
      beforeImage: "/placeholder.svg?height=300&width=300",
      afterImage: "/placeholder.svg?height=300&width=300",
      status: "Adopted - Therapy Dog",
      rescueTeam: "LA Emergency Response",
      medicalCost: "$8,500",
      featured: true,
    },
    {
      id: 3,
      title: "Luna's Journey from Fear to Love",
      location: "Miami, Florida, USA",
      rescueDate: "January 12, 2024",
      adoptionDate: "April 15, 2024",
      story:
        "Rescued from a puppy mill, Luna was terrified of humans and had never experienced kindness. Through patient rehabilitation and foster care, she learned to trust again and now lives happily with her adoptive family.",
      beforeImage: "/placeholder.svg?height=300&width=300",
      afterImage: "/placeholder.svg?height=300&width=300",
      status: "Adopted",
      rescueTeam: "Florida Rescue Network",
      medicalCost: "$1,200",
      featured: false,
    },
    {
      id: 4,
      title: "Rocky's Hurricane Survival",
      location: "New Orleans, Louisiana, USA",
      rescueDate: "September 3, 2024",
      adoptionDate: "November 18, 2024",
      story:
        "Rocky survived Hurricane Ida by clinging to debris for 3 days. When our rescue team found him, he was exhausted but determined to live. After recovery, he found a loving home with a family who understands his strength.",
      beforeImage: "/placeholder.svg?height=300&width=300",
      afterImage: "/placeholder.svg?height=300&width=300",
      status: "Adopted",
      rescueTeam: "Hurricane Response Unit",
      medicalCost: "$3,100",
      featured: false,
    },
    {
      id: 5,
      title: "Daisy's International Rescue",
      location: "Toronto, Ontario, Canada",
      rescueDate: "October 22, 2024",
      adoptionDate: "December 1, 2024",
      story:
        "Daisy was part of an international rescue operation, transported from an overcrowded shelter. Despite the long journey, she adapted quickly and found a wonderful family who gives her all the love she deserves.",
      beforeImage: "/placeholder.svg?height=300&width=300",
      afterImage: "/placeholder.svg?height=300&width=300",
      status: "Adopted",
      rescueTeam: "International Transport Team",
      medicalCost: "$900",
      featured: false,
    },
    {
      id: 6,
      title: "Charlie's Healing Heart",
      location: "Denver, Colorado, USA",
      rescueDate: "August 5, 2024",
      adoptionDate: "In Foster Care",
      story:
        "Charlie was found with a severe heart condition that required specialized surgery. Thanks to generous donations, he received the treatment he needed. He's currently in foster care while we find him the perfect forever home.",
      beforeImage: "/placeholder.svg?height=300&width=300",
      afterImage: "/placeholder.svg?height=300&width=300",
      status: "In Foster Care",
      rescueTeam: "Colorado Medical Team",
      medicalCost: "$12,000",
      featured: false,
    },
  ]

  const featuredStories = rescueStories.filter((story) => story.featured)
  const regularStories = rescueStories.filter((story) => !story.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rescue Stories</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Every rescue tells a story of hope, resilience, and the power of compassion. These are the journeys from
            despair to joy, made possible by your support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-lg">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6" />
              <span>2,847 Dogs Rescued</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span>2,156 Success Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search rescue stories..." className="pl-10" />
              </div>
              <Button variant="outline">Search Stories</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Rescue Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Before Rescue</div>
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={story.beforeImage || "/placeholder.svg"}
                          alt={`${story.title} before`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">After Recovery</div>
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={story.afterImage || "/placeholder.svg"}
                          alt={`${story.title} after`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-600">Featured Story</Badge>
                      <Badge
                        variant={story.status === "Adopted" ? "default" : "secondary"}
                        className={story.status === "Adopted" ? "bg-green-500" : ""}
                      >
                        {story.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{story.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {story.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {story.rescueDate}
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{story.story}</p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex justify-between">
                        <span>Rescue Team:</span>
                        <span>{story.rescueTeam}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical Cost:</span>
                        <span className="font-semibold text-blue-600">{story.medicalCost}</span>
                      </div>
                      {story.adoptionDate !== "In Foster Care" && (
                        <div className="flex justify-between">
                          <span>Adopted:</span>
                          <span>{story.adoptionDate}</span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Read Full Story</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Stories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Rescue Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularStories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-2 gap-2 p-3">
                  <div className="aspect-square relative rounded overflow-hidden">
                    <Image
                      src={story.beforeImage || "/placeholder.svg"}
                      alt={`${story.title} before`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="aspect-square relative rounded overflow-hidden">
                    <Image
                      src={story.afterImage || "/placeholder.svg"}
                      alt={`${story.title} after`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {story.rescueDate}
                    </div>
                    <Badge
                      variant={story.status === "Adopted" ? "default" : "secondary"}
                      className={story.status === "Adopted" ? "bg-green-500" : ""}
                    >
                      {story.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">{story.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {story.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{story.story}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>Medical: {story.medicalCost}</span>
                    <span>{story.rescueTeam}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">The Impact of Your Support</h2>
            <p className="text-lg text-gray-600">Every donation helps create more success stories like these</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">$1.2M</div>
              <div className="text-gray-600">Medical Costs Covered</div>
              <div className="text-sm text-gray-500">This year alone</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">89%</div>
              <div className="text-gray-600">Success Rate</div>
              <div className="text-sm text-gray-500">Rescue to adoption</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">45 days</div>
              <div className="text-gray-600">Average Recovery Time</div>
              <div className="text-sm text-gray-500">From rescue to adoption</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">15,000+</div>
              <div className="text-gray-600">Donors Worldwide</div>
              <div className="text-sm text-gray-500">Making it possible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Help Us Write More Success Stories</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every dog deserves a second chance. Your donation today could be the beginning of another miraculous rescue
            story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/how-to-help">Share These Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
