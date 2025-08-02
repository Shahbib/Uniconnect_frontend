import { BookOpen, Trophy, Target, Users, Brain } from "lucide-react"
import type { LearningStats, Course, AITest, Achievement, SkillProgress, LeaderboardUser } from "@/types/learning"

export class LearningDataService {
  static getLearningStats(): LearningStats[] {
    return [
      { label: "Courses Completed", value: "12", icon: BookOpen, color: "bg-blue-500" },
      { label: "Tests Taken", value: "45", icon: Brain, color: "bg-purple-500" },
      { label: "Skills Mastered", value: "8", icon: Trophy, color: "bg-yellow-500" },
      { label: "Study Hours", value: "156", icon: Target, color: "bg-green-500" },
    ]
  }

  static getCurrentCourses(): Course[] {
    return [
      {
        id: 1,
        title: "Advanced Machine Learning",
        instructor: "Dr. Sarah Chen",
        progress: 75,
        totalLessons: 20,
        completedLessons: 15,
        nextLesson: "Neural Networks Deep Dive",
        difficulty: "Advanced",
        estimatedTime: "2h 30m",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "React Development Mastery",
        instructor: "Alex Rodriguez",
        progress: 60,
        totalLessons: 25,
        completedLessons: 15,
        nextLesson: "State Management with Redux",
        difficulty: "Intermediate",
        estimatedTime: "3h 15m",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "Data Structures & Algorithms",
        instructor: "Prof. Michael Johnson",
        progress: 90,
        totalLessons: 30,
        completedLessons: 27,
        nextLesson: "Graph Algorithms",
        difficulty: "Advanced",
        estimatedTime: "1h 45m",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ]
  }

  static getAIGeneratedTests(): AITest[] {
    return [
      {
        id: 1,
        title: "JavaScript Fundamentals Quiz",
        subject: "Web Development",
        difficulty: "Beginner",
        questions: 20,
        duration: "30 min",
        rating: 4.8,
        attempts: 1234,
        description: "Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.",
        tags: ["JavaScript", "Programming", "Web Dev"],
        aiGenerated: true,
      },
      {
        id: 2,
        title: "Machine Learning Concepts",
        subject: "Artificial Intelligence",
        difficulty: "Advanced",
        questions: 25,
        duration: "45 min",
        rating: 4.9,
        attempts: 567,
        description: "Advanced quiz covering supervised learning, neural networks, and model evaluation techniques.",
        tags: ["ML", "AI", "Data Science"],
        aiGenerated: true,
      },
      {
        id: 3,
        title: "Data Structures Assessment",
        subject: "Computer Science",
        difficulty: "Intermediate",
        questions: 30,
        duration: "60 min",
        rating: 4.7,
        attempts: 890,
        description: "Comprehensive test on arrays, linked lists, trees, graphs, and their time complexities.",
        tags: ["Data Structures", "Algorithms", "CS"],
        aiGenerated: true,
      },
      {
        id: 4,
        title: "React Hooks Deep Dive",
        subject: "Web Development",
        difficulty: "Intermediate",
        questions: 15,
        duration: "25 min",
        rating: 4.6,
        attempts: 445,
        description: "Test your understanding of React Hooks including useState, useEffect, and custom hooks.",
        tags: ["React", "Hooks", "Frontend"],
        aiGenerated: true,
      },
    ]
  }

  static getAchievements(): Achievement[] {
    return [
      {
        title: "First Course Completed",
        description: "Successfully completed your first online course",
        date: "Dec 2024",
        icon: Trophy,
        color: "from-yellow-400 to-orange-500",
      },
      {
        title: "Quiz Master",
        description: "Scored 90% or higher on 10 different quizzes",
        date: "Nov 2024",
        icon: Brain,
        color: "from-purple-400 to-pink-500",
      },
      {
        title: "Study Streak",
        description: "Maintained a 30-day learning streak",
        date: "Oct 2024",
        icon: Target,
        color: "from-green-400 to-teal-500",
      },
      {
        title: "Community Helper",
        description: "Helped 50+ students with their questions",
        date: "Sep 2024",
        icon: Users,
        color: "from-blue-400 to-cyan-500",
      },
    ]
  }

  static getSkillProgress(): SkillProgress[] {
    return [
      { skill: "JavaScript", level: "Advanced", progress: 85, xp: 2400 },
      { skill: "React", level: "Intermediate", progress: 70, xp: 1800 },
      { skill: "Python", level: "Advanced", progress: 90, xp: 2800 },
      { skill: "Machine Learning", level: "Intermediate", progress: 60, xp: 1500 },
      { skill: "Data Structures", level: "Advanced", progress: 80, xp: 2200 },
      { skill: "System Design", level: "Beginner", progress: 30, xp: 600 },
    ]
  }

  static getLeaderboard(): LeaderboardUser[] {
    return [
      { rank: 1, name: "Sarah Chen", xp: 4500, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 2, name: "Alex Rodriguez", xp: 4200, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 3, name: "John Doe", xp: 3650, avatar: "/placeholder.svg?height=40&width=40", isCurrentUser: true },
      { rank: 4, name: "Emma Davis", xp: 3400, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 5, name: "Mike Johnson", xp: 3100, avatar: "/placeholder.svg?height=40&width=40" },
    ]
  }

  static getSubjects(): string[] {
    return ["All", "Web Development", "Artificial Intelligence", "Computer Science", "Mathematics", "Physics"]
  }
}
