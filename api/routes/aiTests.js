const express = require("express")
const router = express.Router()

// Mock AI tests data
const aiTests = [
  {
    id: 1,
    title: "JavaScript Fundamentals Quiz",
    subject: "Web Development",
    difficulty: "Beginner",
    questions: 20,
    duration: "30 min",
    rating: 4.8,
    attempts: 1234,
    description: "Test your knowledge of JavaScript basics.",
    tags: ["JavaScript", "Programming", "Web Dev"],
    aiGenerated: true,
  },
]

// GET /api/ai-tests
router.get("/", (req, res) => {
  res.json(aiTests)
})

module.exports = router
