# Save Paws - Complete Donation Platform

A comprehensive, secure, and modern donation platform for animal rescue organizations built with Next.js 14, TypeScript, Prisma, and integrated with Stripe and PayPal.

## 🌟 Features

### ✅ **Completed Features**

- **💳 Secure Payment Processing**
  - Stripe integration for credit/debit cards
  - PayPal integration for PayPal payments
  - PCI DSS compliant payment handling
  - Encrypted sensitive data storage

- **🗄️ Complete Database System**
  - PostgreSQL with Prisma ORM
  - User management with roles (DONOR, VOLUNTEER)
  - Donation tracking and analytics
  - Newsletter subscriptions
  - Rescue stories management

- **🔐 Authentication & Authorization**
  - NextAuth.js with multiple providers
  - Google OAuth integration
  - Role-based access control
  - Secure password hashing



- **📧 Email System**
  - Automated donation confirmations
  - Welcome emails for new users
  - Newsletter functionality
  - SMTP integration

- **🎨 Modern UI/UX**
  - Responsive design with Tailwind CSS
  - shadcn/ui components
  - Professional donation forms
  - Mobile-optimized interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- PayPal developer account (for payments)
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd global-dog-rescue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/globaldogrescue"
   
   # Next.js
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   
   # PayPal
   PAYPAL_CLIENT_ID="your_paypal_client_id"
   PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
   NEXT_PUBLIC_PAYPAL_CLIENT_ID="your_paypal_client_id"
   
   # Email
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   FROM_EMAIL="noreply@globaldogrescue.org"
   
   # Security
   ENCRYPTION_KEY="your-32-character-secret-key-here"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   

   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── donations/     # Payment processing
│   ├── auth/              # Authentication pages
│   ├── donate/            # Donation page
│   └── ...                # Other pages
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── encryption.ts     # Security utilities
│   └── email.ts          # Email service
├── prisma/               # Database schema and migrations
├── scripts/              # Utility scripts
└── ...
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio

# Utilities
npm run lint           # Run ESLint
```

## 🔐 Security Features

- **Payment Security**: PCI DSS compliant payment processing
- **Data Encryption**: Sensitive data encrypted at rest
- **Authentication**: Secure JWT-based authentication
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive input sanitization
- **HTTPS**: SSL/TLS encryption in production



## 🎨 Customization

### Styling
- Built with Tailwind CSS
- shadcn/ui component library
- Fully customizable design system
- Responsive breakpoints

### Branding
- Update logo and colors in `components/`
- Modify email templates in `lib/email.ts`
- Customize donation amounts in `app/donate/page.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker
```bash
# Build Docker image
docker build -t global-dog-rescue .

# Run container
docker run -p 3000:3000 global-dog-rescue
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: help@globaldogrescue.org
- Documentation: [Link to docs]

## 🙏 Acknowledgments

- Built with Next.js 14 and TypeScript
- UI components by shadcn/ui
- Payment processing by Stripe and PayPal
- Database by PostgreSQL and Prisma
- Authentication by NextAuth.js

---

**Made with ❤️ for animal rescue organizations worldwide**
