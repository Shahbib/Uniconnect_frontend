import { Users, BookOpen, Home, LayoutDashboard, MessageSquare, Trophy } from "lucide-react"

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Community Hub",
    url: "/community",
    icon: Users,
    color: "text-purple-500",
  },
  {
    title: "Find Teammates",
    url: "/teammates",
    icon: Users,
    color: "text-pink-500",
  },
  {
    title: "Study Materials",
    url: "/study-materials",
    icon: BookOpen,
    color: "text-green-500",
  },
  {
    title: "AI Chatbot",
    url: "/chatbot",
    icon: MessageSquare,
    color: "text-cyan-500",
  },
  {
    title: "Learning Dashboard",
    url: "/learning",
    icon: Trophy,
    color: "text-indigo-500",
  },
  {
    title: "Find Residence",
    url: "/residence",
    icon: Home,
    color: "text-orange-500",
  },
] as const

export const USER_STATS = {
  REPUTATION: 1247,
  CONTRIBUTIONS: 89,
  LEVEL: "Expert",
} as const
