const serverless = require("serverless-http")
const path = require("path")

const backendDir = path.resolve(__dirname, "..", "..", "mycareer", "backend")

process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || require("dotenv").config({ path: path.join(backendDir, ".env") }).parsed?.OPENAI_API_KEY || ""
process.env.PORT = process.env.PORT || "5000"
process.env.CLIENT_URL = process.env.CLIENT_URL || require("dotenv").config({ path: path.join(backendDir, ".env") }).parsed?.CLIENT_URL || "http://localhost:5173"

const app = require(path.join(backendDir, "server"))

exports.handler = serverless(app)
