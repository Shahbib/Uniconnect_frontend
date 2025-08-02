const express = require("express")
const router = express.Router()

// Mock achievements data
const achievements = [
  {
    title: "First Course Completed",
    description: "Successfully completed your first online course",
    date: "Dec 2024",
    icon: "Trophy",
    color: "from-yellow-400 to-orange-500",
  },
]

// GET /api/achievements
router.get("/", (req, res) => {
  res.json(achievements)
})

module.exports = router
