"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    academicDegree: "",
    personalEmail: "",
    email: "",
    university: "",
    major: "",
    year: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful signup
      router.push("/dashboard")
    }, 2000)
  }

function getPasswordStrength(password: string): { label: string; color: string } {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  if (strength <= 1) return { label: "Weak", color: "text-red-500" }
  if (strength === 2) return { label: "Medium", color: "text-yellow-500" }
  return { label: "Strong", color: "text-green-500" }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            UniConnect
          </h1>
          <p className="text-slate-600 mt-2">Join the global student community</p>
        </div>

        {/* Signup Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="border-slate-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="border-slate-200 focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Username & Academic Degree */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe123"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    required
                    className="border-slate-200 focus:border-blue-400"
                  />
                </div>

              {/* Email (Personal) */}
              <div className="space-y-2">
                <Label htmlFor="personalEmail">Email</Label>
                <Input
                  id="personalEmail"
                  type="email"
                  placeholder="john.doe@email.com"
                  value={formData.personalEmail || ""}
                  onChange={(e) => handleInputChange("personalEmail", e.target.value)}
                  required
                  className="border-slate-200 focus:border-blue-400"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="border-slate-200 focus:border-blue-400 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <p className={`text-sm ${getPasswordStrength(formData.password).color}`}>
                      Strength: {getPasswordStrength(formData.password).label}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="border-slate-200 focus:border-blue-400 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Sign up with Google Button */}
              <Button
                type="button"
                className="w-full mt-3 flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                onClick={() => window.location.href = "/api/auth/google"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" className="inline-block">
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.22l6.91-6.91C36.36 2.34 30.55 0 24 0 14.64 0 6.27 5.7 2.44 14.01l8.51 6.62C12.7 14.13 17.89 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.09 24.59c0-1.56-.14-3.07-.41-4.53H24v9.13h12.44c-.54 2.91-2.17 5.38-4.63 7.04l7.19 5.59C43.73 37.41 46.09 31.54 46.09 24.59z"/>
                    <path fill="#FBBC05" d="M12.95 28.63c-.41-1.22-.64-2.52-.64-3.88s.23-2.66.64-3.88l-8.51-6.62C2.16 17.7 0 20.67 0 24c0 3.33 2.16 6.3 4.44 8.75l8.51-6.62z"/>
                    <path fill="#EA4335" d="M24 44c6.55 0 12.36-2.17 16.44-5.91l-7.19-5.59c-2.01 1.35-4.59 2.15-7.25 2.15-6.11 0-11.3-4.63-12.95-10.88l-8.51 6.62C6.27 42.3 14.64 48 24 48z"/>
                  </g>
                </svg>
                Sign up with Google
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-teal-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-800 mb-4">What you'll get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Connect with students worldwide",
                "Access to study materials",
                "AI-powered learning assistant",
                "Find teammates for projects",
                "Track your learning progress",
                "Discover accommodation options",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
