import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Heart } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      title: "Địa chỉ trụ sở",
      content: "123 Đường Nguyễn Văn A, Quận 1, TP.HCM",
      description: "Văn phòng chính - Mở cửa 24/7",
    },
    {
      icon: <Phone className="h-6 w-6 text-orange-500" />,
      title: "Hotline cứu hộ",
      content: "0123 456 789",
      description: "Hỗ trợ khẩn cấp 24/7",
    },
    {
      icon: <Mail className="h-6 w-6 text-orange-500" />,
      title: "Email",
      content: "info@cuuhodongvat.vn",
      description: "Phản hồi trong 24 giờ",
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      title: "Giờ làm việc",
      content: "8:00 - 18:00",
      description: "Thứ 2 - Chủ nhật",
    },
  ]

  const shelterLocations = [
    {
      name: "Trại Cứu Hộ Thành Phố",
      address: "123 Đường Nguyễn Văn A, Quận 1",
      phone: "0123 456 789",
      hours: "8:00 - 17:00",
    },
    {
      name: "Mái Ấm Thú Cưng",
      address: "456 Đường Lê Văn B, Quận 3",
      phone: "0987 654 321",
      hours: "9:00 - 16:00",
    },
    {
      name: "Trung Tâm Bảo Vệ Động Vật",
      address: "789 Đường Trần Văn C, Quận 7",
      phone: "0369 258 147",
      hours: "7:00 - 18:00",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong mọi vấn đề liên quan đến động vật
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Hotline: 0123 456 789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>info@cuuhodongvat.vn</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-orange-500" />
                  Gửi Tin Nhắn
                </CardTitle>
                <CardDescription>
                  Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong thời gian sớm nhất
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">Họ *</Label>
                    <Input id="first-name" placeholder="Nhập họ của bạn" required />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Tên *</Label>
                    <Input id="last-name" placeholder="Nhập tên của bạn" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="Nhập email của bạn" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" placeholder="Nhập số điện thoại" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Chủ đề *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chủ đề" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rescue">Báo cáo cần cứu hộ</SelectItem>
                      <SelectItem value="adoption">Nhận nuôi thú cưng</SelectItem>
                      <SelectItem value="volunteer">Tham gia tình nguyện</SelectItem>
                      <SelectItem value="donation">Quyên góp</SelectItem>
                      <SelectItem value="partnership">Hợp tác</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Tin nhắn *</Label>
                  <Textarea id="message" placeholder="Mô tả chi tiết vấn đề của bạn..." rows={6} required />
                </div>

                <div>
                  <Label htmlFor="location">Địa điểm (nếu báo cáo cứu hộ)</Label>
                  <Input id="location" placeholder="Địa chỉ cụ thể nơi phát hiện động vật cần cứu hộ" />
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6">
                  <Heart className="h-5 w-5 mr-2" />
                  Gửi Tin Nhắn
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  * Các trường bắt buộc. Chúng tôi cam kết bảo mật thông tin cá nhân của bạn.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Liên Hệ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      {info.icon}
                      <div>
                        <h3 className="font-semibold text-gray-800">{info.title}</h3>
                        <p className="text-gray-600 font-medium">{info.content}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cấp Cứu 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-red-500" />
                    <span className="font-bold text-red-700">Hotline Khẩn Cấp</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600 mb-2">0123 456 789</p>
                  <p className="text-sm text-red-600">
                    Gọi ngay nếu phát hiện động vật bị thương hoặc trong tình huống nguy hiểm
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mạng Xã Hội</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">f</span>
                    </div>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">IG</span>
                    </div>
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">YT</span>
                    </div>
                    <span>YouTube</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shelter Locations */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Địa Điểm Trại Cứu Hộ</h2>
            <p className="text-lg text-gray-600">Các trại cứu hộ chính của chúng tôi trên địa bàn thành phố</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shelterLocations.map((shelter, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{shelter.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{shelter.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{shelter.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{shelter.hours}</span>
                    </div>
                    <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">Xem Chi Tiết</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Câu Hỏi Thường Gặp</h2>
            <p className="text-lg text-gray-600">Những câu hỏi phổ biến từ cộng đồng</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Làm thế nào để báo cáo động vật cần cứu hộ?</h3>
              <p className="text-gray-600 mb-4">
                Gọi hotline 0123 456 789 hoặc gửi tin nhắn qua form liên hệ với thông tin chi tiết về địa điểm và tình
                trạng động vật.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tôi có thể tham quan trại cứu hộ không?</h3>
              <p className="text-gray-600 mb-4">
                Có, bạn có thể đăng ký tham quan trước qua điện thoại hoặc email. Chúng tôi mở cửa đón khách vào cuối
                tuần.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Quy trình nhận nuôi như thế nào?</h3>
              <p className="text-gray-600 mb-4">
                Điền đơn đăng ký, phỏng vấn, kiểm tra điều kiện sống, và ký hợp đồng nhận nuôi. Toàn bộ quy trình mất
                khoảng 1-2 tuần.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Chi phí nhận nuôi là bao nhiêu?</h3>
              <p className="text-gray-600 mb-4">
                Phí nhận nuôi từ 500.000 - 1.500.000đ tùy loại động vật, bao gồm tiêm phòng, triệt sản và chăm sóc y tế
                cơ bản.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
