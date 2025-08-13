import { NextResponse } from "next/server"

export async function GET() {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
  const NEXT_PUBLIC_PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const NODE_ENV = process.env.NODE_ENV
  const PAYPAL_ENV = (process.env.PAYPAL_ENV || process.env.NEXT_PUBLIC_PAYPAL_ENV || "sandbox").toLowerCase()
  
  const PAYPAL_BASE_URL = PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com"

  return NextResponse.json({
    paypalClientId: PAYPAL_CLIENT_ID ? "SET" : "NOT SET",
    paypalClientSecret: PAYPAL_CLIENT_SECRET ? "SET" : "NOT SET", 
    nextPublicPaypalClientId: NEXT_PUBLIC_PAYPAL_CLIENT_ID ? "SET" : "NOT SET",
    nodeEnv: NODE_ENV,
    paypalEnv: PAYPAL_ENV,
    paypalBaseUrl: PAYPAL_BASE_URL,
    timestamp: new Date().toISOString()
  })
} 