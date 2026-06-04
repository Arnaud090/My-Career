const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const careerRoutes = require("./routes/careerRoutes")

dotenv.config({ path: require("path").join(__dirname, ".env") })

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"

app.use(cors({
  origin: [CLIENT_URL, "http://localhost:5173", "http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}))

app.use(express.json())

app.use("/api", careerRoutes)

app.get("/", (req, res) => {
  res.json({
    name: "MyCareer API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      career: "POST /api/career",
    },
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`MyCareer API server running on http://localhost:${PORT}`)
    console.log(`Accepting requests from: ${CLIENT_URL}`)
  })
}

module.exports = app
