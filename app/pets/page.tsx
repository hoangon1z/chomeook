import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Filter } from "lucide-react"
import Image from "next/image"

export default function PetsPage() {
  const pets = [
    {
      id: 1,
      name: "Luna",
      type: "Mèo",
      breed: "Mèo ta",
      age: "2 tuổi",
      gender: "Cái",
      size: "Nhỏ",
      status: "Sẵn sàng nhận nuôi",
      image: "/placeholder.svg?height=300&width=300",
      description: "Luna là một chú mèo cái rất dễ thương và thân thiện. Cô ấy yêu thích được vuốt ve và chơi đùa.",
    },
    {
      id: 2,
      name: "Max",
      type: "Chó",
      breed: "Golden Retriever",
      age: "3 tuổi",
      gender: "Đực",
      size: "Lớn",
      status: "Sẵn sàng nhận nuôi",
      image: "/placeholder.svg?height=300&width=300",
      description: "Max là một chú chó rất năng động và thân thiện với trẻ em. Anh ấy đã được huấn luyện cơ bản.",
    },
    {
      id: 3,
      name: "Mimi",
      type: "Mèo",
      breed: "Mèo vàng",
      age: "1 tuổi",
      gender: "Cái",
      size: "Nhỏ",
      status: "Đang điều trị",
      image: "/placeholder.svg?height=300&width=300",
      description: "Mimi là một chú mèo con rất tinh nghịch và đáng yêu. Hiện đang hồi phục sau khi được cứu hộ.",
    },
    {
      id: 4,
      name: "Rocky",
      type: "Chó",
      breed: "Chó ta",
      age: "4 tuổi",
      gender: "Đực",
      size: "Trung bình",
      status: "Sẵn sàng nhận nuôi",
      image: "/placeholder.svg?height=300&width=300",
      description: "Rocky là một chú chó rất trung thành và bảo vệ. Phù hợp với gia đình có kinh nghiệm nuôi chó.",
    },
    {
      id: 5,
      name: "Bella",
      type: "Mèo",
      breed: "Mèo Ba Tư",
      age: "5 tuổi",
      gender: "Cái",
      size: "Trung bình",
      status: "Sẵn sàng nhận nuôi",
      image: "/placeholder.svg?height=300&width=300",
      description: "Bella là một chú mèo Ba Tư rất điềm đạm và yêu thích sự yên tĩnh. Phù hợp với người lớn tuổi.",
    },
    {
      id: 6,
      name: "Charlie",
      type: "Chó",
      breed: "Beagle",
      age: "2 tuổi",
      gender: "Đực",
      size: "Trung bình",
      status: "Sẵn sàng nhận nuôi",
      image: "/placeholder.svg?height=300&width=300",
      description: "Charlie là một chú chó Beagle rất thông minh và năng động. Yêu thích chạy bộ và khám phá.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Tìm Thú Cưng Của Bạn</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá những chú chó và mèo đáng yêu đang chờ đợi một gia đình ấm áp
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Tìm kiếm theo tên..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Loại động vật" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="dog">Chó</SelectItem>
                  <SelectItem value="cat">Mèo</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Kích thước" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="small">Nhỏ</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="large">Lớn</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pets Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={pet.status === "Sẵn sàng nhận nuôi" ? "default" : "secondary"}
                      className={pet.status === "Sẵn sàng nhận nuôi" ? "bg-green-500" : "bg-yellow-500"}
                    >
                      {pet.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{pet.name}</CardTitle>
                      <CardDescription>
                        {pet.breed} • {pet.age}
                      </CardDescription>
                    </div>
                    <Heart className="h-6 w-6 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Giới tính:</span>
                      <span>{pet.gender}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kích thước:</span>
                      <span>{pet.size}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pet.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Nhận Nuôi</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Chi Tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem Thêm Thú Cưng
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
