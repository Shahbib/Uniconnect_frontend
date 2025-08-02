"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  Trophy,
  Home,
  GraduationCap,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Brain,
  Target,
  Zap,
  Globe,
  Shield,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  const features = [
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with students worldwide, share achievements, and build your network",
      color: "bg-blue-500",
    },
    {
      icon: Target,
      title: "Teammate Finder",
      description: "Find perfect teammates for hackathons, projects, and research collaborations",
      color: "bg-teal-500",
    },
    {
      icon: BookOpen,
      title: "Study Materials",
      description: "Share and access quality study resources with AI-powered recommendations",
      color: "bg-cyan-500",
    },
    {
      icon: Brain,
      title: "AI Study Assistant",
      description: "Get personalized help with your notes and learning journey",
      color: "bg-purple-500",
    },
    {
      icon: Trophy,
      title: "Learning Dashboard",
      description: "Track progress, earn badges, and master new skills with AI-generated quizzes",
      color: "bg-indigo-500",
    },
    {
      icon: Home,
      title: "Residence Finder",
      description: "Find roommates and accommodation that matches your preferences",
      color: "bg-orange-500",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "200+", label: "Universities" },
    { number: "1M+", label: "Study Materials" },
    { number: "95%", label: "Success Rate" },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "MIT",
      text: "UniConnect helped me find amazing teammates for my ML project. We won the hackathon!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Alex Rodriguez",
      university: "Stanford",
      text: "The AI study assistant is incredible. It knows my notes better than I do!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Davis",
      university: "Harvard",
      text: "Found my perfect study group and roommate through UniConnect. Life-changing!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                UniConnect
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors">
                Reviews
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Student Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Connect. Learn.
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Succeed Together.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students worldwide in the ultimate platform for academic collaboration, learning, and
                growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link href="/signup">
                <Button className="h-12 px-8 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 whitespace-nowrap">
                  Start Here
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free to join
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                University verified
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-teal-500" />
                Global community
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powerful tools designed specifically for university students to enhance learning and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Loved by Students Worldwide
            </h2>
            <p className="text-xl text-slate-600">See what our community has to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.university}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-teal-500 text-white overflow-hidden">
            <CardContent className="p-12 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Student Life?</h2>
                <p className="text-xl text-blue-100">
                  Join thousands of students who are already succeeding with UniConnect.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button className="h-12 px-8 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                    <Zap className="h-4 w-4 mr-2" />
                    Get Started Now
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="h-12 px-8 border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">UniConnect</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 UniConnect. Made with <Heart className="h-4 w-4 inline text-red-500" /> for students
              worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
