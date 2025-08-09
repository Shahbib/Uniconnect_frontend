"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
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
          <p className="text-slate-600 mt-2">Welcome back to your student community</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-200 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              

              {/* Sign in with Google Button */}
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
                Sign in with Google
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-sm text-slate-500">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
