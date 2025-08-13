"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  CreditCard, 
  Shield, 
  Globe, 
  CheckCircle, 
  Loader2, 
  DollarSign,
  Users,
  Star,
  ArrowRight,
  PawPrint,
  Stethoscope,
  Home,
  Target,
  TrendingUp,
  Calendar,
  Gift
} from "lucide-react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// PayPal configuration
const isPayPalConfigured =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID &&
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== "test" &&
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== "your_paypal_client_id"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState("one-time")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false)
  const [paypalError, setPaypalError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    zipCode: "",
    message: "",
  })

  const predefinedAmounts = [
    { amount: "25", label: "$25", description: "Emergency food for one week" },
    { amount: "50", label: "$50", description: "Basic medical care package" },
    { amount: "100", label: "$100", description: "Vaccination and health check" },
    { amount: "250", label: "$250", description: "Emergency veterinary surgery" },
    { amount: "500", label: "$500", description: "Complete rescue and care" },
    { amount: "1000", label: "$1000", description: "Support multiple rescues" },
  ]

  const frequencyOptions = [
    { id: "once", label: "One-time", description: "Single donation", badge: null },
    { id: "monthly", label: "Monthly", description: "Recurring monthly", badge: "Most Impact" },
    { id: "quarterly", label: "Quarterly", description: "Every 3 months", badge: null },
    { id: "yearly", label: "Yearly", description: "Annual donation", badge: "Tax Efficient" },
  ]

  const getSteps = () => {
    if (paymentMethod === "paypal") {
      return [
        { id: 1, title: "Donation", description: "Amount & frequency" },
        { id: 2, title: "Payment", description: "PayPal checkout" },
      ]
    }
    return [
      { id: 1, title: "Donation", description: "Amount & frequency" },
      { id: 2, title: "Details", description: "Your information" },
      { id: 3, title: "Payment", description: "Complete donation" },
    ]
  }

  // Load PayPal script using official SDK
  useEffect(() => {
    if (isPayPalConfigured && typeof window !== 'undefined') {
      // Check if PayPal script is already loaded
      if ((window as any).paypal && (window as any).paypal.Buttons) {
        console.log("PayPal already loaded");
        setIsPayPalLoaded(true);
        return;
      }

      // Use PayPal SDK to load script
      const loadPayPalScript = async () => {
        try {
          const { loadScript } = await import('@paypal/paypal-js');
          const paypal = await loadScript({
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
            currency: "USD",
            intent: "capture",
            components: "buttons"
          });
          
          console.log("PayPal SDK loaded:", paypal);
          console.log("PayPal object type:", typeof paypal);
          console.log("PayPal Buttons:", paypal?.Buttons);
          
          if (paypal && typeof paypal === 'object' && paypal.Buttons) {
            console.log("PayPal Buttons is available");
            setIsPayPalLoaded(true);
          } else {
            console.error("PayPal Buttons not found");
            setPaypalError("PayPal không khởi tạo được. Vui lòng thử lại.");
          }
        } catch (error) {
          console.error("PayPal SDK loading failed:", error);
          setPaypalError("Không thể tải PayPal. Vui lòng thử lại sau.");
        }
      };

      loadPayPalScript();
    }
  }, [isPayPalConfigured]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Elements stripe={stripePromise}>
        <DonationContent
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          donationType={donationType}
          setDonationType={setDonationType}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          donorInfo={donorInfo}
          setDonorInfo={setDonorInfo}
          predefinedAmounts={predefinedAmounts}
          frequencyOptions={frequencyOptions}
          getSteps={getSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isPayPalConfigured={isPayPalConfigured}
          isPayPalLoaded={isPayPalLoaded}
          paypalError={paypalError}
        />
      </Elements>
    </div>
  )
}

// Extract main content to separate component
function DonationContent({
  donationAmount,
  setDonationAmount,
  customAmount,
  setCustomAmount,
  donationType,
  setDonationType,
  paymentMethod,
  setPaymentMethod,
  isProcessing,
  setIsProcessing,
  donorInfo,
  setDonorInfo,
  predefinedAmounts,
  frequencyOptions,
  getSteps,
  currentStep,
  setCurrentStep,
  isPayPalConfigured,
  isPayPalLoaded,
  paypalError,
}: any) {
  const getCurrentAmount = () => {
    return Number.parseFloat(donationAmount || customAmount || "0")
  }

  const handleDonorInfoChange = (field: string, value: string) => {
    setDonorInfo((prev: any) => ({ ...prev, [field]: value }))
  }

  const canProceedToNext = () => {
    if (currentStep === 1) {
      return getCurrentAmount() > 0
    }
    if (currentStep === 2) {
      return donorInfo.firstName && donorInfo.lastName && donorInfo.email
    }
    return true
  }

  const nextStep = () => {
    if (!canProceedToNext()) return
    
    if (currentStep === 1) {
      if (paymentMethod === "paypal") {
        setCurrentStep(2) // PayPal: step 1 -> step 2 (payment)
      } else {
        setCurrentStep(2) // Credit: step 1 -> step 2 (details)
      }
    } else if (currentStep === 2 && paymentMethod === "stripe") {
      setCurrentStep(3) // Credit: step 2 -> step 3 (payment)
    }
  }

  const prevStep = () => {
    if (currentStep === 3) {
      setCurrentStep(2) // Credit: step 3 -> step 2
    } else if (currentStep === 2) {
      setCurrentStep(1) // Both: step 2 -> step 1
    }
  }

  return (
    <>
      {/* Warm Professional Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl mb-8 shadow-lg">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
                Help Save Lives
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  One Donation at a Time
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Your generosity provides emergency rescue, medical care, and loving homes 
                for animals in desperate need of help.
              </p>
            </div>

            {/* Enhanced Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-center mb-3">
                  <PawPrint className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">2,847</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Animals Rescued</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-sm">
                <div className="flex items-center justify-center mb-3">
                  <Stethoscope className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">1,924</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Medical Treatments</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-center mb-3">
                  <Home className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">2,156</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Forever Homes</div>
              </div>
            </div>

            {/* Trust Indicators with Icons */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full">
                <Globe className="h-4 w-4 text-purple-600" />
                <span>Global Impact</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <div className="flex items-center justify-between">
              {getSteps().map((step: any, index: number) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-lg
                    ${currentStep >= step.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white transform scale-110' 
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className={`mt-4 text-center transition-colors ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'}`}>
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${paymentMethod === "paypal" 
                    ? (currentStep === 1 ? 0 : 100) 
                    : ((currentStep - 1) / 2) * 100
                  }%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-12 bg-gradient-to-br from-white to-gray-50/50">
              {/* Step 1: Donation Setup */}
              {currentStep === 1 && (
                <div className="space-y-12">
                  <div className="text-center">
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Choose Your Contribution</h2>
                    <p className="text-gray-600">Select an amount and frequency that works for you</p>
                  </div>

                  {/* Donation Frequency */}
                  <div>
                    <Label className="text-lg font-medium text-gray-900 mb-6 block">
                      Donation Frequency
                    </Label>
                    <RadioGroup value={donationType} onValueChange={setDonationType} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {frequencyOptions.map((option: any) => (
                        <div key={option.id} className="relative">
                          <RadioGroupItem value={option.id === "once" ? "one-time" : option.id} id={option.id} className="peer sr-only" />
                          <Label 
                            htmlFor={option.id} 
                            className="flex flex-col items-center p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-gray-300 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all"
                          >
                            <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                            <div className="text-xs text-gray-500 text-center">{option.description}</div>
                            {option.badge && (
                              <Badge variant="secondary" className="mt-2 text-xs bg-gray-900 text-white">
                                {option.badge}
                              </Badge>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <Label className="text-lg font-semibold text-gray-900 mb-6 block flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Choose Your Impact
                    </Label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {predefinedAmounts.map((item: any, index: number) => {
                        const colors = [
                          "border-green-200 hover:border-green-400 bg-green-50/50",
                          "border-blue-200 hover:border-blue-400 bg-blue-50/50", 
                          "border-purple-200 hover:border-purple-400 bg-purple-50/50",
                          "border-orange-200 hover:border-orange-400 bg-orange-50/50",
                          "border-pink-200 hover:border-pink-400 bg-pink-50/50",
                          "border-indigo-200 hover:border-indigo-400 bg-indigo-50/50"
                        ]
                        const selectedColors = [
                          "border-green-500 bg-green-100 ring-2 ring-green-200",
                          "border-blue-500 bg-blue-100 ring-2 ring-blue-200",
                          "border-purple-500 bg-purple-100 ring-2 ring-purple-200", 
                          "border-orange-500 bg-orange-100 ring-2 ring-orange-200",
                          "border-pink-500 bg-pink-100 ring-2 ring-pink-200",
                          "border-indigo-500 bg-indigo-100 ring-2 ring-indigo-200"
                        ]
                        return (
                          <div
                            key={item.amount}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                              donationAmount === item.amount 
                                ? selectedColors[index % selectedColors.length]
                                : colors[index % colors.length]
                            }`}
                            onClick={() => {
                              setDonationAmount(item.amount)
                              setCustomAmount("")
                            }}
                          >
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900 mb-2">{item.label}</div>
                              <div className="text-sm text-gray-700 font-medium">{item.description}</div>
                              {donationAmount === item.amount && (
                                <div className="mt-3 flex items-center justify-center gap-1 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-xs font-semibold">Selected</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Custom Amount */}
                    <div className="max-w-sm mx-auto">
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        Custom Amount
                      </Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setDonationAmount("")
                          }}
                          className="pl-8 pr-12 h-14 text-center border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-2xl text-lg font-semibold"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-bold">$</span>
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">USD</span>
                      </div>
                      {customAmount && Number(customAmount) > 0 && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                          <div className="text-center text-sm text-green-700 font-medium">
                            💚 Your ${customAmount} donation will make a real difference!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <Label className="text-lg font-semibold text-gray-900 mb-6 block flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      Choose Payment Method
                    </Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Credit Card Option */}
                      <div className="relative">
                        <RadioGroupItem value="stripe" id="stripe-step1" className="peer sr-only" />
                        <Label 
                          htmlFor="stripe-step1" 
                          className="flex items-center p-6 rounded-2xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-md peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <CreditCard className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                                <div className="text-sm text-gray-600">Secure & widely accepted</div>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 font-medium">
                              Popular
                            </Badge>
                          </div>
                        </Label>
                      </div>

                      {/* PayPal Option */}
                      {isPayPalConfigured && (
                        <div className="relative">
                          <RadioGroupItem value="paypal" id="paypal-step1" className="peer sr-only" />
                          <Label 
                            htmlFor="paypal-step1" 
                            className="flex items-center p-6 rounded-2xl border-2 border-gray-200 cursor-pointer hover:border-yellow-400 hover:shadow-md peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:ring-2 peer-checked:ring-yellow-200 transition-all duration-200"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-yellow-100 rounded-full">
                                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-sm flex items-center justify-center font-bold">
                                    P
                                  </div>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">PayPal</div>
                                  <div className="text-sm text-gray-600">Quick & no info needed</div>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-medium">
                                Fast
                              </Badge>
                            </div>
                          </Label>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  {/* Navigation */}
                  <div className="pt-12 text-center">
                    <Button 
                      onClick={nextStep}
                      disabled={!canProceedToNext() || !paymentMethod}
                      className="px-16 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                      {paymentMethod === "paypal" ? (
                        <span className="flex items-center gap-2">
                          Continue to Payment
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Continue to Details
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information - Only for Credit/Debit Card */}
              {currentStep === 2 && paymentMethod === "stripe" && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Your Information</h2>
                    <p className="text-gray-600">We need a few details to process your ${getCurrentAmount()} donation</p>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-8">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="first-name" className="text-sm font-medium text-gray-900 mb-3 block">
                          First Name *
                        </Label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          value={donorInfo.firstName}
                          onChange={(e) => handleDonorInfoChange("firstName", e.target.value)}
                          className="h-12 border-gray-200 focus:border-gray-900 rounded-2xl"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name" className="text-sm font-medium text-gray-900 mb-3 block">
                          Last Name *
                        </Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          value={donorInfo.lastName}
                          onChange={(e) => handleDonorInfoChange("lastName", e.target.value)}
                          className="h-12 border-gray-200 focus:border-gray-900 rounded-2xl"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-900 mb-3 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={donorInfo.email}
                        onChange={(e) => handleDonorInfoChange("email", e.target.value)}
                        className="h-12 border-gray-200 focus:border-gray-900 rounded-2xl"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2">For your tax-deductible receipt</p>
                    </div>

                    {/* Country and ZIP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="country" className="text-sm font-medium text-gray-900 mb-3 block">
                          Country
                        </Label>
                        <Input
                          id="country"
                          placeholder="United States"
                          value={donorInfo.country}
                          onChange={(e) => handleDonorInfoChange("country", e.target.value)}
                          className="h-12 border-gray-200 focus:border-gray-900 rounded-2xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="text-sm font-medium text-gray-900 mb-3 block">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          placeholder="12345"
                          value={donorInfo.zipCode}
                          onChange={(e) => handleDonorInfoChange("zipCode", e.target.value)}
                          className="h-12 border-gray-200 focus:border-gray-900 rounded-2xl"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-900 mb-3 block">
                        Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Share a message of support..."
                        rows={4}
                        value={donorInfo.message}
                        onChange={(e) => handleDonorInfoChange("message", e.target.value)}
                        className="border-gray-200 focus:border-gray-900 rounded-2xl resize-none"
                      />
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-12">
                    <Button 
                      onClick={prevStep}
                      variant="outline"
                      className="px-8 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl font-semibold transition-all"
                    >
                      <span className="flex items-center gap-2">
                        ← Back
                      </span>
                    </Button>
                    <Button 
                      onClick={nextStep}
                      disabled={!canProceedToNext()}
                      className="px-16 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                      <span className="flex items-center gap-2">
                        Continue to Payment
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: PayPal Payment */}
              {currentStep === 2 && paymentMethod === "paypal" && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Complete Your Donation</h2>
                    <p className="text-gray-600">Review your donation and pay securely with PayPal</p>
                  </div>

                  {/* Donation Summary */}
                  <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 border border-blue-200 shadow-lg">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-4">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-gray-900 mb-2">${getCurrentAmount()}</div>
                      <div className="text-gray-700 font-medium mb-1">
                        {donationType === "one-time" ? "One-time" : donationType.charAt(0).toUpperCase() + donationType.slice(1)} donation
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
                        PayPal
                      </div>
                    </div>
                  </div>

                  {/* PayPal Payment */}
                  <div className="max-w-sm mx-auto">
                    {isPayPalConfigured && (
                      <PayPalPaymentForm
                        amount={getCurrentAmount()}
                        donationType={donationType}
                        donorInfo={donorInfo}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                        isPayPalLoaded={isPayPalLoaded}
                        paypalError={paypalError}
                      />
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="text-center pt-12">
                    <Button 
                      onClick={prevStep}
                      variant="outline"
                      className="px-8 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl font-semibold transition-all"
                    >
                      <span className="flex items-center gap-2">
                        ← Back to Amount
                      </span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Credit Card Payment */}
              {currentStep === 3 && paymentMethod === "stripe" && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Complete Your Payment</h2>
                    <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200 shadow-lg">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-4">
                          <CreditCard className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">${getCurrentAmount()}</div>
                        <div className="text-gray-700 font-medium mb-1">
                          {donationType === "one-time" ? "One-time" : donationType.charAt(0).toUpperCase() + donationType.slice(1)} donation
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {donorInfo.firstName && `${donorInfo.firstName} ${donorInfo.lastName}`}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mt-2">
                          <CreditCard className="h-4 w-4" />
                          Credit Card
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Payment Form */}
                  <div className="max-w-md mx-auto">
                    <StripePaymentForm
                      amount={getCurrentAmount()}
                      donationType={donationType}
                      donorInfo={donorInfo}
                      isProcessing={isProcessing}
                      setIsProcessing={setIsProcessing}
                    />
                  </div>

                  {/* Terms */}
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox id="terms" />
                          <Label htmlFor="terms" className="text-sm">
                            I agree to the <a href="#" className="text-gray-900 hover:underline">Terms</a> and <a href="#" className="text-gray-900 hover:underline">Privacy Policy</a>
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Secure 256-bit SSL encryption</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-center pt-12">
                    <Button 
                      onClick={prevStep}
                      variant="outline"
                      className="px-8 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl font-semibold transition-all"
                    >
                      <span className="flex items-center gap-2">
                        ← Back to Details
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Stripe Payment Component
function StripePaymentForm({
  amount,
  donationType,
  donorInfo,
  isProcessing,
  setIsProcessing,
}: {
  amount: number
  donationType: string
  donorInfo: any
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}) {
  const stripe = useStripe()
  const elements = useElements()

  const handleStripePayment = async () => {
    if (!stripe || !elements || amount <= 0) return

    setIsProcessing(true)

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: `${donorInfo.firstName} ${donorInfo.lastName}`,
          email: donorInfo.email,
          address: {
            country: donorInfo.country,
            postal_code: donorInfo.zipCode,
          },
        },
      })

      if (paymentMethodError) {
        console.error("Payment method error:", paymentMethodError)
        return
      }

      // Call your API to create payment intent
      const response = await fetch("/api/donations/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          donationType,
          donorInfo,
          paymentMethodId: paymentMethod.id,
        }),
      })

      const data = await response.json()

      if (data.error) {
        console.error("Payment error:", data.error)
      } else if (data.requiresAction) {
        // Handle 3D Secure authentication
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret)
        if (confirmError) {
          console.error("3D Secure error:", confirmError)
        } else {
          // Payment succeeded
          window.location.href = "/donation/success"
        }
      } else {
        // Payment succeeded
        window.location.href = "/donation/success"
      }
    } catch (error) {
      console.error("Stripe payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-6 border border-gray-200 rounded-2xl">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
      </div>

      <Button
        onClick={handleStripePayment}
        disabled={!stripe || amount <= 0 || isProcessing}
        className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-medium transition-colors disabled:opacity-50"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </div>
        ) : (
          `Donate $${amount}`
        )}
      </Button>
    </div>
  )
}

// PayPal Payment Component  
function PayPalPaymentForm({
  amount,
  donationType,
  donorInfo,
  isProcessing,
  setIsProcessing,
  isPayPalLoaded,
  paypalError,
}: {
  amount: number
  donationType: string
  donorInfo: any
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
  isPayPalLoaded: boolean
  paypalError: string
}) {
  const [message, setMessage] = useState<string>("");
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const isProcessingRef = useRef(false);
  const paypalButtonInstanceRef = useRef<any>(null);
  const buttonCreatedRef = useRef(false);

  // Reset button state when component mounts
  useEffect(() => {
    buttonCreatedRef.current = false;
    isProcessingRef.current = false;
  }, []);

  // Render PayPal button when script is loaded
  useEffect(() => {
    if (isPayPalLoaded && (window as any).paypal && paypalButtonRef.current && !buttonCreatedRef.current) {
      // Debug: Log PayPal object structure
      console.log('PayPal object:', (window as any).paypal);
      console.log('PayPal Buttons:', (window as any).paypal.Buttons);
      console.log('PayPal Buttons type:', typeof (window as any).paypal.Buttons);
      
      // Check if Buttons is available
      if (!(window as any).paypal.Buttons || typeof (window as any).paypal.Buttons !== 'function') {
        console.error('PayPal Buttons is not available');
        setMessage("PayPal Buttons không khả dụng. Vui lòng thử lại sau.");
        return;
      }

      // Clear previous button
      if (paypalButtonRef.current) {
        paypalButtonRef.current.innerHTML = '';
      }

      // Render new PayPal button
      paypalButtonInstanceRef.current = (window as any).paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "donate",
        },
        fundingSource: "paypal",
        disabled: isProcessing,
        createOrder: async function() {
          console.log("Creating PayPal order...");
          if (isProcessingRef.current) {
            console.log("Already processing, skipping...");
            throw new Error("Payment already in progress");
          }
          isProcessingRef.current = true;
          setIsProcessing(true);
          setMessage("");
          try {
            const response = await fetch("/api/donations/paypal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount,
                donationType,
                donorInfo,
              }),
            });

            console.log("PayPal API response status:", response.status);
            const orderData = await response.json();
            console.log("PayPal order response:", orderData);
            
            if (!response.ok) {
              throw new Error(orderData.error || `HTTP error! status: ${response.status}`);
            }
            
            if (orderData.orderId) {
              return orderData.orderId;
            } else if (orderData.id) {
              return orderData.id;
            } else {
              console.error("Invalid order data:", orderData);
              throw new Error(orderData.error || "Failed to create PayPal order");
            }
          } catch (error: any) {
            console.error("PayPal order creation error:", error);
            setMessage(`Lỗi tạo đơn hàng: ${error.message}`);
            isProcessingRef.current = false;
            setIsProcessing(false);
            // Reset button state to allow retry
            setTimeout(() => {
              if (paypalButtonRef.current) {
                const buttons = paypalButtonRef.current.querySelectorAll('[data-funding-source="paypal"]');
                buttons.forEach((button: any) => {
                  button.style.opacity = '1';
                  button.style.pointerEvents = 'auto';
                });
              }
            }, 1000);
            throw error;
          }
        },
        onApprove: async function(data: any, actions: any) {
          console.log("PayPal payment approved:", data);
          setMessage("Đang xử lý thanh toán...");
          try {
            const response = await fetch("/api/donations/paypal", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: data.orderID,
              }),
            });

            console.log("PayPal capture response status:", response.status);
            const orderData = await response.json();
            console.log("PayPal capture response:", orderData);
            
            if (!response.ok) {
              throw new Error(orderData.error || `HTTP error! status: ${response.status}`);
            }
            
            if (orderData.success) {
              setMessage("✅ Thanh toán thành công! Đang chuyển hướng...");
              isProcessingRef.current = false;
              setIsProcessing(false);
              // Delay redirect to show success message
              setTimeout(() => {
                window.location.href = "/donation/success";
              }, 1500);
            } else {
              throw new Error(orderData.error || "Payment capture failed");
            }
          } catch (error: any) {
            console.error("PayPal approval error:", error);
            setMessage(`❌ Lỗi xử lý thanh toán: ${error.message}`);
            isProcessingRef.current = false;
            setIsProcessing(false);
            // Reset button state to allow retry
            setTimeout(() => {
              if (paypalButtonRef.current) {
                const buttons = paypalButtonRef.current.querySelectorAll('[data-funding-source="paypal"]');
                buttons.forEach((button: any) => {
                  button.style.opacity = '1';
                  button.style.pointerEvents = 'auto';
                });
              }
            }, 2000);
          }
        },
        onError: function(error: any) {
          console.error("PayPal error:", error);
          setMessage("❌ Lỗi PayPal. Vui lòng thử lại hoặc sử dụng thẻ tín dụng.");
          isProcessingRef.current = false;
          setIsProcessing(false);
          // Reset button state to allow retry
          setTimeout(() => {
            if (paypalButtonRef.current) {
              const buttons = paypalButtonRef.current.querySelectorAll('[data-funding-source="paypal"]');
              buttons.forEach((button: any) => {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
              });
            }
          }, 1000);
        },
        onCancel: function() {
          console.log("PayPal payment cancelled");
          setMessage("⚠️ Thanh toán đã bị hủy. Bạn có thể thử lại.");
          isProcessingRef.current = false;
          setIsProcessing(false);
          // Reset button state to allow retry
          setTimeout(() => {
            if (paypalButtonRef.current) {
              const buttons = paypalButtonRef.current.querySelectorAll('[data-funding-source="paypal"]');
              buttons.forEach((button: any) => {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
              });
            }
          }, 1000);
        }
      }).render(paypalButtonRef.current);
      
      buttonCreatedRef.current = true;
    }

    // Cleanup function
    return () => {
      if (paypalButtonRef.current) {
        paypalButtonRef.current.innerHTML = '';
      }
      isProcessingRef.current = false;
      buttonCreatedRef.current = false;
    };
  }, [isPayPalLoaded]); // Chỉ re-render khi PayPal script được load

  // Update button disabled state when isProcessing changes
  useEffect(() => {
    if (paypalButtonInstanceRef.current && paypalButtonRef.current) {
      // PayPal buttons don't have a direct disable method, so we need to re-render
      // But we'll only do this if the button is already rendered
      const buttons = paypalButtonRef.current.querySelectorAll('[data-funding-source="paypal"]');
      buttons.forEach((button: any) => {
        if (isProcessing) {
          button.style.opacity = '0.5';
          button.style.pointerEvents = 'none';
        } else {
          button.style.opacity = '1';
          button.style.pointerEvents = 'auto';
        }
      });
    }
  }, [isProcessing]);

  // Kiểm tra xem PayPal đã sẵn sàng chưa
  if (!isPayPalLoaded) {
    return (
      <div className="p-6 border-2 rounded-2xl bg-yellow-50 border-yellow-200">
        <div className="text-yellow-800 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" />
          <p className="font-semibold mb-2">Đang tải PayPal...</p>
          <p className="text-sm">
            {paypalError || "Vui lòng đợi trong giây lát."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Click vào nút PayPal bên dưới để hoàn tất đóng góp ${amount}
          {donationType === "monthly" ? "/tháng" : ""}
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl border-2 ${
          message.includes('❌') || message.includes('Lỗi') || message.includes('failed')
            ? 'bg-red-50 border-red-200' 
            : message.includes('✅') || message.includes('thành công')
            ? 'bg-green-50 border-green-200'
            : message.includes('⚠️') || message.includes('hủy')
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`font-semibold text-center ${
            message.includes('❌') || message.includes('Lỗi') || message.includes('failed')
              ? 'text-red-800' 
              : message.includes('✅') || message.includes('thành công')
              ? 'text-green-800'
              : message.includes('⚠️') || message.includes('hủy')
              ? 'text-yellow-800'
              : 'text-blue-800'
          }`}>
            {message}
          </p>
        </div>
      )}

      <div ref={paypalButtonRef}></div>

      {isProcessing && (
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
          <p className="text-sm text-gray-600 mt-2">Đang xử lý thanh toán PayPal...</p>
        </div>
      )}
    </div>
  )
}