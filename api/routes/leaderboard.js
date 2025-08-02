const express = require("express")
const router = express.Router()

// Mock leaderboard data
const leaderboard = [
  { rank: 1, name: "Sarah Chen", xp: 4500, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 2, name: "Alex Rodriguez", xp: 4200, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 3, name: "John Doe", xp: 3650, avatar: "/placeholder.svg?height=40&width=40", isCurrentUser: true },
]

// GET /api/leaderboard
router.get("/", (req, res) => {
  res.json(leaderboard)
})

module.exports = router
