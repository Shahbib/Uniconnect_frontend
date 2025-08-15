"use client"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  BookOpen,
  Home,
  LayoutDashboard,
  GraduationCap,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Trophy,
  Menu,
  X,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
  },
  {
    title: "Find Teammates",
    url: "/teammates",
    icon: Users,
  },
  {
    title: "Study Materials",
    url: "/study-materials",
    icon: BookOpen,
  },
  {
    title: "AI Chatbot",
    url: "/chatbot",
    icon: MessageSquare,
  },
  {
    title: "Learning",
    url: "/learning",
    icon: Trophy,
  },
  {
    title: "Residence",
    url: "/residence",
    icon: Home,
  },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [studentHi, setStudentHi] = useState<string>("");
  // Fetch /student/hi on mount and every 60s
  useEffect(() => {
    let active = true;
    async function fetchHi() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch("http://localhost:9000/student/hi", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.text();
        if (active) setStudentHi(data);
      } catch {
        if (active) setStudentHi("");
      }
    }
    fetchHi();
    const interval = setInterval(fetchHi, 60000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              UniConnect
            </span>
            <div className="w-6" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.url
              return (
                <Link key={item.title} href={item.url}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center gap-2 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-200">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{studentHi ? studentHi : "not logged in"}</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@university.edu</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <button
                    className="flex items-center gap-2 text-red-600 w-full bg-transparent border-none p-0 m-0 cursor-pointer"
                    onClick={() => {
                      // Clear tokens if stored
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("token");
                        sessionStorage.removeItem("token");
                      }
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <Link key={item.title} href={item.url} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
