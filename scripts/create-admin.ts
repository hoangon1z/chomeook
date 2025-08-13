import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/encryption'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@globaldogrescue.org'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456'

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingAdmin) {
      console.log('Admin user already exists:', adminEmail)
      return
    }

    // Hash password
    const hashedPassword = await hashPassword(adminPassword)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      }
    })

    console.log('Admin user created successfully:')
    console.log('Email:', admin.email)
    console.log('Password:', adminPassword)
    console.log('Please change the password after first login!')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
