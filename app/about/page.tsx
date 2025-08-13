import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, Target, Eye, Lightbulb } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Nguyễn Thị Lan",
      role: "Giám đốc điều hành",
      image: "/placeholder.svg?height=300&width=300",
      description: "15 năm kinh nghiệm trong lĩnh vực bảo vệ động vật",
    },
    {
      name: "Trần Văn Nam",
      role: "Bác sĩ thú y trưởng",
      image: "/placeholder.svg?height=300&width=300",
      description: "Chuyên gia về phẫu thuật và điều trị động vật",
    },
    {
      name: "Lê Thị Hoa",
      role: "Trưởng phòng cứu hộ",
      image: "/placeholder.svg?height=300&width=300",
      description: "Điều phối các hoạt động cứu hộ khẩn cấp",
    },
    {
      name: "Phạm Minh Tuấn",
      role: "Chuyên viên truyền thông",
      image: "/placeholder.svg?height=300&width=300",
      description: "Phụ trách các hoạt động truyền thông và giáo dục",
    },
  ]

  const achievements = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      number: "500+",
      title: "Động vật được cứu",
      description: "Trong năm 2024",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      number: "300+",
      title: "Tìm được nhà mới",
      description: "Tỷ lệ thành công 85%",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      number: "15",
      title: "Trại cứu hộ",
      description: "Trên toàn thành phố",
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      number: "1000+",
      title: "Tình nguyện viên",
      description: "Hoạt động tích cực",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Về Chúng Tôi</h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Chúng tôi là tổ chức phi lợi nhuận tận tâm bảo vệ và cứu hộ động vật, với sứ mệnh mang lại cuộc sống tốt
                đẹp hơn cho những chú chó và mèo vô gia cư.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary">
                  Tham Gia Cùng Chúng Tôi
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-orange-500 bg-transparent"
                >
                  Xem Hoạt Động
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Đội ngũ cứu hộ động vật"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-2xl mb-4">Sứ Mệnh</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Cứu hộ, chăm sóc và tìm nhà mới cho những động vật vô gia cư, đồng thời nâng cao ý thức cộng đồng về
                việc bảo vệ động vật.
              </CardDescription>
            </Card>

            <Card className="text-center p-8">
              <Eye className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-2xl mb-4">Tầm Nhìn</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Xây dựng một cộng đồng nơi mọi động vật đều được yêu thương, chăm sóc và có cơ hội sống trong môi trường
                an toàn, hạnh phúc.
              </CardDescription>
            </Card>

            <Card className="text-center p-8">
              <Lightbulb className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-2xl mb-4">Giá Trị</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Lòng trắc ẩn, trách nhiệm, minh bạch và hợp tác. Chúng tôi tin rằng mỗi sinh mệnh đều có giá trị và xứng
                đáng được bảo vệ.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Câu Chuyện Của Chúng Tôi</h2>
              <p className="text-lg text-gray-600">Hành trình từ những ngày đầu đến thành tổ chức uy tín</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Lịch sử phát triển"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">2015 - Khởi Đầu</h3>
                  <p className="text-gray-600">
                    Bắt đầu từ một nhóm nhỏ những người yêu động vật, chúng tôi cứu hộ những chú chó và mèo đầu tiên
                    trong khu vực.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">2018 - Mở Rộng</h3>
                  <p className="text-gray-600">
                    Thành lập trại cứu hộ đầu tiên với sức chứa 50 động vật và đội ngũ tình nguyện viên chuyên nghiệp.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">2021 - Phát Triển</h3>
                  <p className="text-gray-600">
                    Mở rộng thành mạng lưới 15 trại cứu hộ với đầy đủ trang thiết bị y tế và đội ngũ bác sĩ thú y chuyên
                    nghiệp.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">2024 - Hiện Tại</h3>
                  <p className="text-gray-600">
                    Trở thành tổ chức hàng đầu trong lĩnh vực cứu hộ động vật với hơn 500 động vật được cứu mỗi năm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Thành Tựu Của Chúng Tôi</h2>
            <p className="text-lg text-gray-600">Những con số ấn tượng trong hành trình bảo vệ động vật</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{achievement.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{achievement.number}</div>
                <CardTitle className="text-lg mb-2">{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Đội Ngũ Của Chúng Tôi</h2>
            <p className="text-lg text-gray-600">Những người tận tâm đứng sau mỗi hoạt động cứu hộ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-orange-500 font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hãy Cùng Chúng Tôi Tạo Nên Sự Khác Biệt</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Mỗi hành động nhỏ của bạn đều có thể thay đổi cuộc đời của một động vật vô gia cư
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Quyên Góp Ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-orange-500 bg-transparent"
            >
              Tham Gia Tình Nguyện
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-orange-500 bg-transparent"
            >
              Nhận Nuôi Thú Cưng
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
