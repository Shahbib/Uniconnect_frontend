const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/posts", require("./routes/posts"))
app.use("/api/teams", require("./routes/teams"))
app.use("/api/study-materials", require("./routes/studyMaterials"))
app.use("/api/residences", require("./routes/residences"))
app.use("/api/roommates", require("./routes/roommates"))
app.use("/api/courses", require("./routes/courses"))
app.use("/api/ai-tests", require("./routes/aiTests"))
app.use("/api/achievements", require("./routes/achievements"))
app.use("/api/skill-progress", require("./routes/skillProgress"))
app.use("/api/leaderboard", require("./routes/leaderboard"))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`🚀 UniConnect API Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
