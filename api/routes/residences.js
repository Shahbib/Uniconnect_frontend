const express = require("express")
const router = express.Router()

// Mock residences data
const residences = [
  {
    id: 1,
    title: "Cozy 2BR Apartment Near Campus",
    location: "Cambridge, MA",
    distance: "0.5 miles from MIT",
    price: 1200,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Parking", "Laundry", "Kitchen"],
    images: ["/placeholder.svg?height=200&width=300"],
    owner: "Sarah Kim",
    ownerAvatar: "/placeholder.svg?height=32&width=32",
    university: "MIT",
    rating: 4.8,
    reviews: 12,
    description: "Perfect for students! Fully furnished apartment with all utilities included.",
    availableFrom: "Jan 2024",
    posted: "2 days ago",
    verified: true,
    lookingFor: "Graduate student, non-smoker, clean",
  },
]

// GET /api/residences
router.get("/", (req, res) => {
  res.json(residences)
})

module.exports = router
