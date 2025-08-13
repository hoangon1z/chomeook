import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, Tag } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Buddy Tìm Được Gia Đình Mới - Câu Chuyện Cảm Động",
      excerpt:
        "Sau 6 tháng tại trại cứu hộ, Buddy cuối cùng đã tìm được một gia đình yêu thương. Hành trình từ một chú chó hoang dã đến thành viên được yêu quý trong gia đình...",
      content: "Buddy được tìm thấy trong tình trạng suy dinh dưỡng nghiêm trọng...",
      author: "Nguyễn Thị Lan",
      date: "15/12/2024",
      category: "Câu chuyện thành công",
      tags: ["nhận nuôi", "chó", "thành công"],
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: 2,
      title: "Cách Chăm Sóc Mèo Con Mới Sinh",
      excerpt:
        "Hướng dẫn chi tiết về cách chăm sóc những chú mèo con mới sinh, từ dinh dưỡng đến môi trường sống phù hợp...",
      content: "Mèo con mới sinh cần được chăm sóc đặc biệt...",
      author: "Bác sĩ Trần Văn Nam",
      date: "12/12/2024",
      category: "Hướng dẫn chăm sóc",
      tags: ["mèo", "chăm sóc", "hướng dẫn"],
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: 3,
      title: "Hoạt Động Cứu Hộ Tháng 12 - Báo Cáo Tổng Kết",
      excerpt:
        "Tháng 12 này chúng tôi đã cứu hộ thành công 25 chú chó và mèo từ các khu vực khó khăn. Cùng xem lại những hoạt động nổi bật...",
      content: "Trong tháng 12, đội cứu hộ đã thực hiện 15 chuyến đi...",
      author: "Đội Cứu Hộ",
      date: "10/12/2024",
      category: "Báo cáo hoạt động",
      tags: ["cứu hộ", "báo cáo", "tháng 12"],
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: 4,
      title: "Whiskers - Từ Mèo Hoang Đến Ngôi Sao Mạng Xã Hội",
      excerpt:
        "Câu chuyện đầy cảm hứng về Whiskers, từ một chú mèo hoang dã bị bỏ rơi đến trở thành ngôi sao trên mạng xã hội với hàng nghìn người theo dõi...",
      content: "Whiskers được phát hiện trong một con hẻm tối...",
      author: "Lê Thị Hoa",
      date: "08/12/2024",
      category: "Câu chuyện thành công",
      tags: ["mèo", "thành công", "mạng xã hội"],
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: 5,
      title: "10 Điều Cần Biết Trước Khi Nhận Nuôi Chó",
      excerpt:
        "Nhận nuôi một chú chó là quyết định quan trọng. Dưới đây là 10 điều bạn cần cân nhắc kỹ lưỡng trước khi đưa một thành viên mới về nhà...",
      content: "Việc nhận nuôi chó không chỉ là mang về một thú cưng...",
      author: "Phạm Minh Tuấn",
      date: "05/12/2024",
      category: "Hướng dẫn nhận nuôi",
      tags: ["chó", "nhận nuôi", "hướng dẫn"],
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: 6,
      title: "Chương Trình Tiêm Phòng Miễn Phí Tháng 1/2025",
      excerpt:
        "Thông báo về chương trình tiêm phòng miễn phí cho chó mèo trong tháng 1/2025. Đăng ký ngay để bảo vệ sức khỏe thú cưng của bạn...",
      content: "Chương trình tiêm phòng miễn phí sẽ được tổ chức...",
      author: "Ban Tổ Chức",
      date: "03/12/2024",
      category: "Thông báo",
      tags: ["tiêm phòng", "miễn phí", "sức khỏe"],
      image: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
  ]

  const categories = [
    "Tất cả",
    "Câu chuyện thành công",
    "Hướng dẫn chăm sóc",
    "Báo cáo hoạt động",
    "Hướng dẫn nhận nuôi",
    "Thông báo",
  ]

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Blog Cứu Hộ Động Vật</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chia sẻ câu chuyện, kinh nghiệm và cập nhật mới nhất về hoạt động cứu hộ động vật
            </p>
          </div>

          {/* Search and Categories */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Tìm kiếm bài viết..." className="pl-10" />
              </div>
              <Button variant="outline">Tìm Kiếm</Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Bài Viết Nổi Bật</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500">Nổi bật</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-orange-500 cursor-pointer">{post.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary" className="mb-2">
                        {post.category}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Đọc Thêm</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Bài Viết Mới Nhất</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-orange-500 cursor-pointer line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mb-2">
                      {post.category}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <Button variant="outline" size="sm">
                      Đọc Thêm
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem Thêm Bài Viết
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng Ký Nhận Tin Tức</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nhận thông tin mới nhất về các hoạt động cứu hộ và câu chuyện cảm động
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input type="email" placeholder="Nhập email của bạn" className="flex-1 text-gray-800" />
            <Button variant="secondary">Đăng Ký</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
