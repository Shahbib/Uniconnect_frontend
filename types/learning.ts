export interface LearningStats {
  label: string
  value: string
  icon: any
  color: string
}

export interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  nextLesson: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  thumbnail: string
}

export interface AITest {
  id: number
  title: string
  subject: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  questions: number
  duration: string
  rating: number
  attempts: number
  description: string
  tags: string[]
  aiGenerated: boolean
}

export interface Achievement {
  title: string
  description: string
  date: string
  icon: any
  color: string
}

export interface SkillProgress {
  skill: string
  level: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  xp: number
}

export interface LeaderboardUser {
  rank: number
  name: string
  xp: number
  avatar: string
  isCurrentUser?: boolean
}

export interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}
