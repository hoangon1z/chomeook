"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Home, Calendar, MapPin, DollarSign, Shield, CheckCircle, Globe, Star, ArrowRight, Play, Award, PawPrint, Stethoscope } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { useStatistics } from "@/hooks/use-statistics"
import { LoadingSpinner } from "@/components/loading"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function HomePage() {
  const { settings, loading: settingsLoading } = useSiteSettings()
  const { statistics, loading: statsLoading } = useStatistics()



  if (settingsLoading || statsLoading) {
    return <LoadingSpinner />
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/image/background.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left lg:-ml-6 xl:-ml-10">
                <div className="mb-8">
                  {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl mb-8 shadow-lg">
                    <Heart className="h-10 w-10 text-white" />
                  </div> */}
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    {settings?.heroTitle?.split(',')[0] || "Saving Lives"},
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                      {settings?.heroTitle?.split(',')[1]?.trim() || "One Rescue at a Time"}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
                    {settings?.heroSubtitle || "Join our global mission to rescue, rehabilitate, and rehome abandoned dogs. Every donation helps us save more lives and create happy endings."}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <Link href="/donate">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg">
                      <Heart className="mr-2 h-5 w-5" />
                      Donate Now
                    </Button>
                  </Link>
                  {/* <Link href="/rescue-stories">
                    <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 text-lg">
                      <Star className="mr-2 h-5 w-5" />
                      Success Stories
                    </Button>
                  </Link> */}
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-white">
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Tax Deductible</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <span>Global Impact</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9/5 Rating</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl">
                  <div className="aspect-video relative">
                    <Image
                      src="/image/doghome.jpg"
                      alt="Rescued dogs in shelter"
                      fill
                      className="object-cover scale-110"
                      priority
                    />
                  </div>
                  {/* <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 Award Winning
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Global Impact</h2>
            <p className="text-lg text-gray-600">Making a difference worldwide, one rescue at a time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">
                {statistics?.dogsRescued?.toLocaleString() || "2,847"}
              </div>
              <div className="text-gray-600">Dogs Rescued</div>
              <div className="text-sm text-gray-500">Since 2018</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">
                {statistics?.dogsAdopted?.toLocaleString() || "2,156"}
              </div>
              <div className="text-gray-600">Dogs Rehomed</div>
              <div className="text-sm text-gray-500">76% Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">
                {statistics?.countriesServed || "25"}
              </div>
              <div className="text-gray-600">Countries Supported</div>
              <div className="text-sm text-gray-500">Worldwide Network</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">$1.2M</div>
              <div className="text-gray-600">Donated This Year</div>
              <div className="text-sm text-gray-500">From 15,000+ Donors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Rescue Campaign */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="aspect-video md:aspect-square relative">
                    <Image
                      src="/image/cat.jpg"
                      alt="Current rescue campaign"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 font-semibold">URGENT RESCUE</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Behind Bars, They Wait for Love</h3>
                  <p className="text-gray-600 mb-6">
                  We are rescuing thousands of cats suffering from neglect and abuse across Southeast Asia. These innocent lives urgently need food, medical care, and safe, loving homes. Together, we can give them the life they deserve.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-semibold">0 of 150 rescued</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$0 raised</span>
                      <span>Goal: $75,000</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">❤️ Give Them Freedom Today</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Rescue Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Recent Rescue Stories</h2>
            <p className="text-lg text-gray-600">Heartwarming journeys from rescue to forever homes</p>
          </div>

          {/* Carousel on mobile, grid on md+ */}
          <div className="block md:hidden">
            <Carousel opts={{ align: "start", loop: true }} className="relative">
              <CarouselContent>
                {[
                  {
                    name: "Lucky & Milo",
                    location: "Texas, USA",
                    story:
                      "Today Lucky and Milo have a home. But out there, there are still countless dogs and cats wandering in the rain, suffering from hunger, cold and loneliness… waiting for a helping hand.Today Lucky and Milo have a home. But out there, there are still countless dogs and cats wandering in the rain, suffering from hunger, cold and loneliness… waiting for a helping hand.",
                    image: "/image/doghome.jpg",
                    status: "Adopted ✓",
                    rescueDate: "March 2024",
                  },
                  {
                    name: "Max's Miracle",
                    location: "California, USA",
                    story:
                      "Max was hit by a car and needed emergency surgery. Thanks to donor support, he made a full recovery and now works as a therapy dog in local hospitals.",
                    image: "/placeholder.svg?height=300&width=300",
                    status: "Adopted ✓",
                    rescueDate: "February 2024",
                  },
                  {
                    name: "Luna's New Life",
                    location: "Florida, USA",
                    story:
                      "Rescued from a puppy mill, Luna was afraid of humans. With patience and love, she's now a confident, happy dog living with her new family.",
                    image: "/placeholder.svg?height=300&width=300",
                    status: "Adopted ✓",
                    rescueDate: "January 2024",
                  },
                ].map((story, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <div className="aspect-square relative">
                        <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                        <div className="absolute top-4 right-4">
                          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {story.status}
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{story.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {story.location} • {story.rescueDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-3">{story.story}</p>
                        <Button variant="outline" className="w-full bg-transparent">
                          Read Full Story
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="-right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                name: "Lucky and Milo Lucky and Milo ",
                location: "Texas, USA",
                story:
                  "Today Lucky and Milo have a home. But out there, there are still countless dogs and cats wandering in the rain, suffering from hunger, cold and loneliness… waiting for a helping hand.",
                image: "/image/catanddog.jpg",
                status: "Adopted ✓",
                rescueDate: "March 2024",
              },
              {
                name: "Urgent Rescue Story – Sủi, the Little Dog Bleeding in the StreetUrgent Rescue Story – Sủi, the Little Dog Bleeding in the Street",
                location: "Viet Nam",
                story:
                  "Under the cold streetlight, a small dog named Sủi sat tied to a tree, his fur matted with blood from his head and eyes. Too weak to move, he simply stared, as if silently asking for help. SavePaws rushed to his rescue—now he’s fighting for his life and needs urgent care to survive.",
                image: "/image/sui.jpg",
                status: "Adopted ✓",
                rescueDate: "February 2024",
              },
              {
                name: "Luna's New Life",
                location: "Indonesia",
                story:
                  "On the side of the road, a large poodle mix lay motionless, his once-beautiful fur now dirty, matted, and full of dust. It looked like he had been wandering for days—maybe weeks—without food, water, or shelter. Abandoned by the very people he trusted, his thin frame told a silent story of hunger and heartbreak. Tonight, he needs not just rescue, but a chance to feel love again.",
                image: "/image/nhieulong.jpg",
                status: "Adopted ✓",
                rescueDate: "January 2024",
              },
            ].map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {story.status}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{story.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {story.location} • {story.rescueDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{story.story}</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/rescue-stories">View All Rescue Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How We Make a Difference</h2>
            <p className="text-lg text-gray-600">Our comprehensive approach to dog rescue and rehabilitation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Card className="text-center p-6">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Emergency Rescue</CardTitle>
              <CardDescription>24/7 response team for abandoned, injured, or abused dogs</CardDescription>
            </Card>

            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Medical Care</CardTitle>
              <CardDescription>Full veterinary treatment, surgery, and rehabilitation services</CardDescription>
            </Card>

            <Card className="text-center p-6">
              <Home className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Foster Network</CardTitle>
              <CardDescription>Loving foster families provide temporary homes during recovery</CardDescription>
            </Card>

            <Card className="text-center p-6">
              <Calendar className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="mb-2">Forever Homes</CardTitle>
              <CardDescription>Careful matching process to find perfect permanent families</CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Donation Impact</h2>
            <p className="text-lg text-gray-600">See exactly how your contribution saves lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <div className="text-3xl font-bold text-blue-600 mb-2">$25</div>
              <CardTitle className="text-lg mb-2">Emergency Food</CardTitle>
              <CardDescription>Provides 1 week of nutritious meals for a rescued dog</CardDescription>
            </Card>

            <Card className="text-center p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
              <div className="text-3xl font-bold text-green-600 mb-2">$75</div>
              <CardTitle className="text-lg mb-2">Vaccination Package</CardTitle>
              <CardDescription>Complete vaccination series to protect against diseases</CardDescription>
            </Card>

            <Card className="text-center p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <div className="text-3xl font-bold text-purple-600 mb-2">$200</div>
              <CardTitle className="text-lg mb-2">Emergency Surgery</CardTitle>
              <CardDescription>Life-saving surgical procedures for injured dogs</CardDescription>
            </Card>

            <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <div className="text-3xl font-bold text-orange-600 mb-2">$500</div>
              <CardTitle className="text-lg mb-2">Full Rescue Package</CardTitle>
              <CardDescription>Complete care from rescue to adoption for one dog</CardDescription>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation Today
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Global Network</h2>
            <p className="text-lg text-gray-600">Supporting dog rescue efforts worldwide</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 text-center">
            {[
              { country: "USA", rescued: "1,847", flag: "🇺🇸" },
              { country: "Canada", rescued: "324", flag: "🇨🇦" },
              { country: "Mexico", rescued: "298", flag: "🇲🇽" },
              { country: "UK", rescued: "156", flag: "🇬🇧" },
              { country: "Australia", rescued: "134", flag: "🇦🇺" },
              { country: "Germany", rescued: "88", flag: "🇩🇪" },
            ].map((location, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl">{location.flag}</div>
                <div className="font-semibold text-gray-800">{location.country}</div>
                <div className="text-2xl font-bold text-blue-600">{location.rescued}</div>
                <div className="text-sm text-gray-600">Dogs Rescued</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission to Save More Lives</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every donation, no matter the size, helps us rescue more dogs and give them the second chance they deserve.
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
              <Link href="/rescue-stories">Share Our Stories</Link>
            </Button>
          </div>
          <div className="mt-8 text-sm opacity-90">
            <p>We accept donations via Credit Card, Debit Card, PayPal, and Stripe</p>
            <p>100% of your donation goes directly to dog rescue operations</p>
          </div>
        </div>
      </section>
    </div>
  )
}
