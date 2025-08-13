# 🐳 Docker Database Setup - Save Paws

Hướng dẫn setup database PostgreSQL bằng Docker cho dự án Save Paws.

## 🚀 Quick Start (Cách nhanh nhất)

```bash
# 1. Copy file environment
cp .env.example .env.local

# 2. Chạy setup tự động (khởi động Docker + tạo database + tạo admin)
npm run setup
```

**Xong! Database đã sẵn sàng sử dụng** 🎉

## 📋 Hướng dẫn chi tiết

### 1. **Khởi động Docker Services**

```bash
# Khởi động PostgreSQL, pgAdmin, và Redis
npm run docker:up

# Hoặc dùng docker-compose trực tiếp
docker-compose up -d
```

### 2. **Kiểm tra Services đang chạy**

```bash
# Xem logs của tất cả services
npm run docker:logs

# Xem logs của PostgreSQL
docker-compose logs -f postgres

# Kiểm tra containers đang chạy
docker ps
```

### 3. **Setup Database Schema**

```bash
# Đợi database khởi động hoàn tất
npm run wait-for-db

# Tạo database schema
npm run db:push

# Hoặc dùng migrations
npm run db:migrate
```

### 4. **Tạo Admin User**

```bash
# Tạo admin user đầu tiên
npm run create-admin
```

### 5. **Chạy Application**

```bash
# Khởi động Next.js development server
npm run dev
```

## 🔧 Docker Services

### **PostgreSQL Database**
- **Port**: `5432`
- **Database**: `globaldogrescue`
- **Username**: `postgres`
- **Password**: `postgres123`
- **Connection URL**: `postgresql://postgres:postgres123@localhost:5432/globaldogrescue`

### **pgAdmin (Database Management UI)**
- **URL**: http://localhost:5050
- **Email**: `admin@globaldogrescue.org`
- **Password**: `admin123`

### **Redis (Caching - Optional)**
- **Port**: `6379`
- **No authentication required**

## 📊 Quản lý Database

### **Prisma Studio**
```bash
# Mở Prisma Studio để xem/edit data
npm run db:studio
```
Truy cập: http://localhost:5555

### **pgAdmin Web Interface**
1. Mở http://localhost:5050
2. Đăng nhập với email/password ở trên
3. Add server mới:
   - **Name**: Save Paws
   - **Host**: `postgres` (tên container)
   - **Port**: `5432`
   - **Database**: `globaldogrescue`
   - **Username**: `postgres`
   - **Password**: `postgres123`

## 🛠️ Các lệnh Docker hữu ích

```bash
# Khởi động services
npm run docker:up

# Dừng services
npm run docker:down

# Xem logs real-time
npm run docker:logs

# Reset toàn bộ (xóa data và khởi động lại)
npm run docker:reset

# Chỉ khởi động PostgreSQL
docker-compose up -d postgres

# Backup database
docker exec globaldogrescue_db pg_dump -U postgres globaldogrescue > backup.sql

# Restore database
docker exec -i globaldogrescue_db psql -U postgres globaldogrescue < backup.sql
```

## 🔍 Troubleshooting

### **Database connection failed**
```bash
# Kiểm tra container có chạy không
docker ps

# Xem logs PostgreSQL
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### **Port đã được sử dụng**
Nếu port 5432 đã được sử dụng, sửa trong `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Đổi port external thành 5433
```

Và cập nhật DATABASE_URL:
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/globaldogrescue"
```

### **Reset hoàn toàn**
```bash
# Xóa tất cả containers, volumes, và data
docker-compose down -v
docker system prune -f

# Khởi động lại từ đầu
npm run setup
```

## 📁 File Structure

```
├── docker-compose.yml          # Docker services configuration
├── init-db/
│   └── 01-init.sql            # Database initialization script
├── scripts/
│   ├── wait-for-db.ts         # Wait for database script
│   └── create-admin.ts        # Create admin user script
└── .env.local                 # Environment variables
```

## 🔐 Security Notes

- **Development only**: Passwords trong docker-compose.yml chỉ dành cho development
- **Production**: Sử dụng strong passwords và environment variables
- **Network**: Services chỉ expose ports cần thiết

## 🎯 Next Steps

Sau khi setup xong Docker database:

1. ✅ Database PostgreSQL đang chạy
2. ✅ Schema đã được tạo
3. ✅ Admin user đã được tạo
4. ✅ Application có thể kết nối database

**Bây giờ bạn có thể chạy `npm run dev` và test toàn bộ tính năng!** 🚀

---

**Lưu ý**: Nhớ giữ Docker Desktop chạy khi develop. Data sẽ được lưu trong Docker volumes nên không bị mất khi restart.
