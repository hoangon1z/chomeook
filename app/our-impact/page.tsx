import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Globe, DollarSign, TrendingUp, Award } from "lucide-react"

export default function OurImpactPage() {
  const yearlyStats = [
    { year: "2024", rescued: 2847, adopted: 2156, donated: 1200000 },
    { year: "2023", rescued: 2234, adopted: 1876, donated: 980000 },
    { year: "2022", rescued: 1789, adopted: 1456, donated: 750000 },
    { year: "2021", rescued: 1234, adopted: 1089, donated: 560000 },
  ]

  const globalImpact = [
    { country: "United States", flag: "🇺🇸", rescued: 1847, adopted: 1456, shelters: 45 },
    { country: "Canada", flag: "🇨🇦", rescued: 324, adopted: 278, shelters: 8 },
    { country: "Mexico", flag: "🇲🇽", rescued: 298, adopted: 234, shelters: 12 },
    { country: "United Kingdom", flag: "🇬🇧", rescued: 156, adopted: 134, shelters: 6 },
    { country: "Australia", flag: "🇦🇺", rescued: 134, adopted: 112, shelters: 4 },
    { country: "Germany", flag: "🇩🇪", rescued: 88, adopted: 76, shelters: 3 },
  ]

  const monthlyProgress = [
    { month: "Jan", rescued: 245, goal: 250, adopted: 189 },
    { month: "Feb", rescued: 267, goal: 250, adopted: 201 },
    { month: "Mar", rescued: 289, goal: 280, adopted: 234 },
    { month: "Apr", rescued: 234, goal: 260, adopted: 198 },
    { month: "May", rescued: 298, goal: 290, adopted: 245 },
    { month: "Jun", rescued: 312, goal: 300, adopted: 267 },
    { month: "Jul", rescued: 334, goal: 320, adopted: 289 },
    { month: "Aug", rescued: 298, goal: 310, adopted: 256 },
    { month: "Sep", rescued: 267, goal: 280, adopted: 223 },
    { month: "Oct", rescued: 289, goal: 290, adopted: 234 },
    { month: "Nov", rescued: 234, goal: 250, adopted: 201 },
    { month: "Dec", rescued: 180, goal: 200, adopted: 149 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Global Impact</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transparency and accountability drive our mission. See exactly how your donations create real change for
            dogs worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,847</div>
              <div className="text-lg">Dogs Rescued in 2024</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,156</div>
              <div className="text-lg">Successfully Adopted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-lg">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">$1.2M</div>
              <div className="text-lg">Donated This Year</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Yearly Progress */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Year-Over-Year Growth</h2>
            <p className="text-lg text-gray-600">Our rescue operations continue to expand thanks to growing support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yearlyStats.map((stat, index) => (
              <Card key={stat.year} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">{stat.year}</CardTitle>
                  {index === 0 && <Badge className="mx-auto bg-green-500">Current Year</Badge>}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{stat.rescued.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Dogs Rescued</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{stat.adopted.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Successfully Adopted</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">${(stat.donated / 1000000).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600">Total Donations</div>
                  </div>
                  <div className="pt-2">
                    <div className="text-sm text-gray-500">
                      Success Rate: {Math.round((stat.adopted / stat.rescued) * 100)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Monthly Progress 2024 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">2024 Monthly Progress</h2>
            <p className="text-lg text-gray-600">Tracking our rescue and adoption goals throughout the year</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Monthly Rescue & Adoption Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {monthlyProgress.map((month) => (
                  <div key={month.month} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{month.month} 2024</h3>
                      <Badge variant={month.rescued >= month.goal ? "default" : "secondary"}>
                        {month.rescued >= month.goal ? "Goal Met" : "In Progress"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rescued:</span>
                        <span className="font-semibold">
                          {month.rescued}/{month.goal}
                        </span>
                      </div>
                      <Progress value={(month.rescued / month.goal) * 100} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Adopted:</span>
                        <span className="font-semibold text-green-600">{month.adopted}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((month.adopted / month.rescued) * 100)}% success rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Global Reach */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Global Rescue Network</h2>
            <p className="text-lg text-gray-600">Our impact spans across continents, saving dogs worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalImpact.map((country) => (
              <Card key={country.country} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <div className="text-lg">{country.country}</div>
                      <div className="text-sm text-gray-500">{country.shelters} Partner Shelters</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Dogs Rescued:</span>
                      <span className="text-2xl font-bold text-blue-600">{country.rescued}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Successfully Adopted:</span>
                      <span className="text-2xl font-bold text-green-600">{country.adopted}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Success Rate:</span>
                        <span className="font-semibold">{Math.round((country.adopted / country.rescued) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Financial Transparency */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Financial Transparency</h2>
            <p className="text-lg text-gray-600">See exactly how every dollar is used to save more dogs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  2024 Donation Breakdown
                </CardTitle>
                <CardDescription>Total Donations: $1,200,000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Medical Care & Surgery</span>
                      <span className="font-semibold">$480,000 (40%)</span>
                    </div>
                    <Progress value={40} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Food & Shelter</span>
                      <span className="font-semibold">$360,000 (30%)</span>
                    </div>
                    <Progress value={30} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Rescue Operations</span>
                      <span className="font-semibold">$240,000 (20%)</span>
                    </div>
                    <Progress value={20} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Administrative Costs</span>
                      <span className="font-semibold">$120,000 (10%)</span>
                    </div>
                    <Progress value={10} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-600" />
                  Certifications & Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">GuideStar Gold Seal</div>
                      <div className="text-sm text-gray-600">Transparency & Accountability</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Charity Navigator 4-Star</div>
                      <div className="text-sm text-gray-600">Highest Rating for Efficiency</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Global Animal Welfare Alliance</div>
                      <div className="text-sm text-gray-600">Certified Member Organization</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Success Metrics</h2>
            <p className="text-lg text-gray-600">Measuring our effectiveness in saving and rehoming dogs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-lg font-semibold mb-1">Adoption Success Rate</div>
              <div className="text-sm text-gray-600">Dogs finding forever homes</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">45 days</div>
              <div className="text-lg font-semibold mb-1">Average Recovery Time</div>
              <div className="text-sm text-gray-600">From rescue to adoption ready</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">$422</div>
              <div className="text-lg font-semibold mb-1">Average Cost Per Rescue</div>
              <div className="text-sm text-gray-600">Including medical care</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-lg font-semibold mb-1">Donor Retention Rate</div>
              <div className="text-sm text-gray-600">Supporters who give again</div>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-white rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Help Us Reach Our 2025 Goals</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            With your continued support, we aim to rescue 3,500 dogs and achieve a 92% adoption success rate next year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Heart className="mr-2 h-5 w-5" />
              Make a Donation
            </Button>
            <Button variant="outline" size="lg">
              Download Full Report
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
