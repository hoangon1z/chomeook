import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function waitForDatabase() {
  const maxRetries = 30
  const retryDelay = 2000 // 2 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$connect()
      console.log('✅ Database connection successful!')
      await prisma.$disconnect()
      return true
    } catch (error) {
      console.log(`⏳ Waiting for database... (${i + 1}/${maxRetries})`)
      if (i === maxRetries - 1) {
        console.error('❌ Failed to connect to database after maximum retries')
        console.error('Error:', error)
        process.exit(1)
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay))
    }
  }
}

waitForDatabase()
