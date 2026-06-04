const {
  handleCareerQuery,
  listCareers,
  getCareer,
  addCareer,
  editCareer,
  removeCareer,
} = require("../../backend/controllers/careerController")

function createResponse() {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  }

  return {
    response,
    status(code) {
      response.statusCode = code
      return this
    },
    json(payload) {
      response.body = JSON.stringify(payload)
      return response
    },
  }
}

function parseBody(event) {
  if (!event.body) return {}

  try {
    return JSON.parse(event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body)
  } catch {
    return {}
  }
}

function createRequest(event, params = {}) {
  return {
    body: parseBody(event),
    params,
    ip: event.headers["x-nf-client-connection-ip"]
      || event.headers["client-ip"]
      || "netlify-function",
  }
}

async function runController(controller, event, params) {
  const req = createRequest(event, params)
  const res = createResponse()
  const result = await controller(req, res)
  return result || res.response
}

exports.handler = async (event) => {
  const method = event.httpMethod.toUpperCase()
  const rawPath = event.path.replace(/^\/\.netlify\/functions\/api/, "")
  const path = rawPath.replace(/^\/api/, "") || "/"
  const segments = path.split("/").filter(Boolean)

  if (method === "POST" && path === "/career") {
    return runController(handleCareerQuery, event)
  }

  if (segments[0] === "careers") {
    if (segments.length === 1 && method === "GET") {
      return runController(listCareers, event)
    }

    if (segments.length === 1 && method === "POST") {
      return runController(addCareer, event)
    }

    if (segments.length === 2 && method === "GET") {
      return runController(getCareer, event, { id: segments[1] })
    }

    if (segments.length === 2 && method === "PUT") {
      return runController(editCareer, event, { id: segments[1] })
    }

    if (segments.length === 2 && method === "DELETE") {
      return runController(removeCareer, event, { id: segments[1] })
    }
  }

  return {
    statusCode: 404,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: false,
      message: "Route not found.",
    }),
  }
}
