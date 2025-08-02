const express = require("express")
const router = express.Router()

// Mock roommates data
const roommates = [
  {
    id: 1,
    name: "Lisa Wang",
    university: "MIT",
    major: "Computer Science",
    year: "Graduate",
    budget: "$800-1200",
    location: "Cambridge, MA",
    preferences: ["Non-smoker", "Clean", "Quiet study time"],
    interests: ["Coding", "Reading", "Yoga"],
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    bio: "PhD student looking for a quiet, clean living environment.",
    verified: true,
    lookingFor: "Room or apartment near MIT campus",
  },
]

// GET /api/roommates
router.get("/", (req, res) => {
  res.json(roommates)
})

module.exports = router
