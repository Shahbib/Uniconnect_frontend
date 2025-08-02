const express = require("express")
const router = express.Router()

// Mock skill progress data
const skillProgress = [
  { skill: "JavaScript", level: "Advanced", progress: 85, xp: 2400 },
  { skill: "React", level: "Intermediate", progress: 70, xp: 1800 },
  { skill: "Python", level: "Advanced", progress: 90, xp: 2800 },
]

// GET /api/skill-progress
router.get("/", (req, res) => {
  res.json(skillProgress)
})

module.exports = router
