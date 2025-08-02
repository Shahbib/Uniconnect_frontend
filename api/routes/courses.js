const express = require("express")
const router = express.Router()

// Mock courses data
const courses = [
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
]

// GET /api/courses
router.get("/", (req, res) => {
  res.json(courses)
})

module.exports = router
