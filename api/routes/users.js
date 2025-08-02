const express = require("express")
const router = express.Router()

// Mock user data
const users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    university: "MIT",
    major: "Computer Science",
    year: "Senior",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Passionate computer science student with interests in machine learning and web development.",
    location: "Cambridge, MA",
    website: "https://johndoe.dev",
    github: "johndoe",
    linkedin: "john-doe",
    skills: ["JavaScript", "React", "Python", "Machine Learning"],
    interests: ["Web Development", "AI", "Open Source"],
    reputation: 1247,
    level: 12,
    xp: 3650,
  },
]

// GET /api/users/:id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }
  res.json(user)
})

// PUT /api/users/:id
router.put("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id)
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" })
  }

  users[userIndex] = { ...users[userIndex], ...req.body }
  res.json(users[userIndex])
})

module.exports = router
