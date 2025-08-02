const express = require("express")
const router = express.Router()

// Mock posts data
const posts = [
  {
    id: 1,
    author: "Sarah Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    university: "MIT",
    major: "Computer Science",
    time: "2 hours ago",
    content:
      "Just completed my first machine learning project! Built a sentiment analysis model that achieved 94% accuracy.",
    likes: 42,
    comments: 8,
    shares: 3,
    tags: ["MachineLearning", "AI", "Python"],
    achievement: "First ML Project",
  },
  {
    id: 2,
    author: "Alex Rodriguez",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    university: "Stanford",
    major: "Data Science",
    time: "4 hours ago",
    content:
      "Looking for teammates for the upcoming Google Summer of Code! Working on an open-source data visualization library.",
    likes: 28,
    comments: 15,
    shares: 7,
    tags: ["GSoC", "OpenSource", "DataViz", "TeamUp"],
  },
]

// GET /api/posts
router.get("/", (req, res) => {
  res.json(posts)
})

// POST /api/posts
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    ...req.body,
    time: "Just now",
    likes: 0,
    comments: 0,
    shares: 0,
  }
  posts.unshift(newPost)
  res.status(201).json(newPost)
})

module.exports = router
