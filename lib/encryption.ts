import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here'
const ALGORITHM = 'aes-256-gcm'

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}

export function decrypt(encryptedData: string): string {
  const parts = encryptedData.split(':')
  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]
  
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const bcrypt = require('bcryptjs')
    bcrypt.hash(password, 12, (err: any, hash: string) => {
      if (err) reject(err)
      else resolve(hash)
    })
  })
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const bcrypt = require('bcryptjs')
    bcrypt.compare(password, hash, (err: any, result: boolean) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

// Sanitize sensitive data for logging
export function sanitizeForLogging(data: any): any {
  const sensitiveFields = [
    'password', 'token', 'secret', 'key', 'cardNumber', 'cvv', 'ssn',
    'stripePaymentIntentId', 'paypalOrderId', 'paypalPayerId'
  ]
  
  if (typeof data !== 'object' || data === null) {
    return data
  }
  
  const sanitized = { ...data }
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]'
    }
  }
  
  return sanitized
}
