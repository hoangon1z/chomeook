import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Users, Heart } from "lucide-react"
import Image from "next/image"

export default function SheltersPage() {
  const shelters = [
    {
      id: 1,
      name: "Trại Cứu Hộ Thành Phố",
      address: "123 Đường Nguyễn Văn A, Quận 1, TP.HCM",
      phone: "0123 456 789",
      email: "contact@shelter1.vn",
      website: "www.shelter1.vn",
      capacity: 150,
      currentAnimals: 120,
      specialties: ["Chó", "Mèo", "Chăm sóc y tế"],
      hours: "8:00 - 17:00 (Thứ 2 - Chủ nhật)",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Trại cứu hộ lớn nhất thành phố với đầy đủ trang thiết bị y tế hiện đại và đội ngũ bác sĩ thú y chuyên nghiệp.",
      services: ["Cứu hộ khẩn cấp", "Chăm sóc y tế", "Nhận nuôi", "Huấn luyện cơ bản"],
    },
    {
      id: 2,
      name: "Mái Ấm Thú Cưng",
      address: "456 Đường Lê Văn B, Quận 3, TP.HCM",
      phone: "0987 654 321",
      email: "info@maiam.vn",
      website: "www.maiamthucung.vn",
      capacity: 80,
      currentAnimals: 65,
      specialties: ["Mèo con", "Chăm sóc đặc biệt"],
      hours: "9:00 - 16:00 (Thứ 2 - Thứ 7)",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Chuyên chăm sóc mèo con và những động vật cần sự chăm sóc đặc biệt với môi trường ấm cúng như gia đình.",
      services: ["Chăm sóc mèo con", "Phục hồi chức năng", "Tư vấn nhận nuôi", "Dịch vụ tắm rửa"],
    },
    {
      id: 3,
      name: "Trung Tâm Bảo Vệ Động Vật",
      address: "789 Đường Trần Văn C, Quận 7, TP.HCM",
      phone: "0369 258 147",
      email: "help@baovedonvat.vn",
      website: "www.baovedonvat.vn",
      capacity: 200,
      currentAnimals: 180,
      specialties: ["Chó lớn", "Phẫu thuật", "Huấn luyện"],
      hours: "7:00 - 18:00 (Hàng ngày)",
      image: "/placeholder.svg?height=300&width=400",
      description: "Trung tâm hiện đại với khu vực rộng rãi, chuyên cứu hộ và huấn luyện các giống chó lớn.",
      services: ["Phẫu thuật chuyên sâu", "Huấn luyện chuyên nghiệp", "Cứu hộ 24/7", "Tư vấn hành vi"],
    },
    {
      id: 4,
      name: "Nhà Chung Động Vật Nhỏ",
      address: "321 Đường Phạm Văn D, Quận 5, TP.HCM",
      phone: "0147 852 963",
      email: "contact@nhachung.vn",
      website: "www.nhachungdongvat.vn",
      capacity: 60,
      currentAnimals: 45,
      specialties: ["Động vật nhỏ", "Chăm sóc tận tình"],
      hours: "8:30 - 17:30 (Thứ 2 - Chủ nhật)",
      image: "/placeholder.svg?height=300&width=400",
      description: "Môi trường ấm cúng dành cho các động vật nhỏ với sự chăm sóc tận tình từ đội ngũ tình nguyện viên.",
      services: ["Chăm sóc cá nhân", "Xã hội hóa", "Tìm gia đình phù hợp", "Theo dõi sau nhận nuôi"],
    },
    {
      id: 5,
      name: "Trại Cứu Hộ Miền Nam",
      address: "654 Đường Nguyễn Văn E, Quận 10, TP.HCM",
      phone: "0258 741 963",
      email: "info@miennam.vn",
      website: "www.cuuhomiennam.vn",
      capacity: 120,
      currentAnimals: 95,
      specialties: ["Cứu hộ khẩn cấp", "Phục hồi"],
      hours: "6:00 - 19:00 (Hàng ngày)",
      image: "/placeholder.svg?height=300&width=400",
      description: "Chuyên về cứu hộ khẩn cấp và phục hồi cho những động vật bị thương nặng hoặc bệnh tật.",
      services: ["Cấp cứu 24/7", "Phục hồi chức năng", "Chăm sóc đặc biệt", "Hỗ trợ tâm lý"],
    },
    {
      id: 6,
      name: "Mái Ấm Chung",
      address: "987 Đường Lê Thị F, Quận 6, TP.HCM",
      phone: "0741 963 852",
      email: "hello@maiamchung.vn",
      website: "www.maiamchung.vn",
      capacity: 90,
      currentAnimals: 70,
      specialties: ["Động vật già", "Chăm sóc cuối đời"],
      hours: "9:00 - 16:00 (Thứ 2 - Thứ 6)",
      image: "/placeholder.svg?height=300&width=400",
      description: "Nơi chăm sóc đặc biệt dành cho những động vật lớn tuổi và cần sự quan tâm đặc biệt.",
      services: ["Chăm sóc động vật già", "Điều trị bệnh mãn tính", "Hospice care", "Tư vấn gia đình"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Trại Cứu Hộ Động Vật</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá các trại cứu hộ đang hoạt động và tìm hiểu cách bạn có thể hỗ trợ
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">15</div>
              <div className="text-gray-600">Trại cứu hộ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">900</div>
              <div className="text-gray-600">Sức chứa tổng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">575</div>
              <div className="text-gray-600">Động vật hiện tại</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shelters Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shelters.map((shelter) => (
              <Card key={shelter.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square relative">
                      <Image
                        src={shelter.image || "/placeholder.svg"}
                        alt={shelter.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{shelter.name}</CardTitle>
                          <CardDescription className="text-sm">{shelter.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {shelter.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{shelter.address}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-orange-500" />
                          <span className="text-gray-600">{shelter.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-orange-500" />
                          <span className="text-gray-600">{shelter.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-gray-600">{shelter.hours}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-orange-500" />
                          <span className="text-gray-600">
                            {shelter.currentAnimals}/{shelter.capacity} động vật
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Dịch vụ:</h4>
                        <div className="flex flex-wrap gap-1">
                          {shelter.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm">
                          <Heart className="h-4 w-4 mr-1" />
                          Hỗ Trợ
                        </Button>
                        <Button variant="outline" className="flex-1 text-sm bg-transparent">
                          Chi Tiết
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn Muốn Mở Trại Cứu Hộ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Chúng tôi hỗ trợ tư vấn và kết nối với các trại cứu hộ khác để chia sẻ kinh nghiệm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Tư Vấn Mở Trại
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-orange-500 bg-transparent"
            >
              Liên Hệ Hỗ Trợ
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
