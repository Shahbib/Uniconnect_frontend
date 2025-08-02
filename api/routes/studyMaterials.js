const express = require("express")
const router = express.Router()

// Mock study materials data
const studyMaterials = [
  {
    id: 1,
    title: "Data Structures and Algorithms - Complete Notes",
    subject: "Computer Science",
    course: "CS 201",
    author: "Sarah Chen",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    university: "MIT",
    type: "PDF",
    pages: 45,
    rating: 4.8,
    downloads: 1234,
    views: 5678,
    comments: 23,
    likes: 156,
    uploadDate: "2 days ago",
    tags: ["Algorithms", "Data Structures", "Python", "Complexity"],
    aiScore: 95,
    description: "Comprehensive notes covering all major data structures.",
    verified: true,
  },
]

// GET /api/study-materials
router.get("/", (req, res) => {
  res.json(studyMaterials)
})

// POST /api/study-materials
router.post("/", (req, res) => {
  const newMaterial = {
    id: studyMaterials.length + 1,
    ...req.body,
    uploadDate: "Just now",
    downloads: 0,
    views: 0,
    comments: 0,
    likes: 0,
  }
  studyMaterials.push(newMaterial)
  res.status(201).json(newMaterial)
})

module.exports = router
