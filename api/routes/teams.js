const express = require("express")
const router = express.Router()

// Mock teams data
const teams = [
  {
    id: 1,
    name: "AI Healthcare Hackathon",
    description: "Building an AI-powered diagnostic tool for early disease detection.",
    leader: "Sarah Kim",
    members: 3,
    maxMembers: 5,
    skills: ["Machine Learning", "Python", "Healthcare", "TensorFlow"],
    location: "Boston, MA",
    deadline: "5 days left",
    type: "Hackathon",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "Active",
    lastActivity: "2 hours ago",
  },
]

// GET /api/teams
router.get("/", (req, res) => {
  res.json(teams)
})

// POST /api/teams/:id/join
router.post("/:id/join", (req, res) => {
  const team = teams.find((t) => t.id === Number.parseInt(req.params.id))
  if (!team) {
    return res.status(404).json({ error: "Team not found" })
  }

  if (team.members >= team.maxMembers) {
    return res.status(400).json({ error: "Team is full" })
  }

  team.members += 1
  res.json({ message: "Successfully joined team" })
})

module.exports = router
