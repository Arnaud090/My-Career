const { getCareerAdvice } = require("../services/aiService")
const { findMatch } = require("../data/careers")

const sessions = new Map()

const GREETINGS = [
  "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
  "how are you", "what's up", "sup", "greetings", "howdy", "whatsup",
]

const CAREER_KEYWORDS = [
  "career", "study", "program", "course", "university", "college", "school",
  "skill", "job", "work", "profession", "salary", "pathway", "tvet",
  "vocational", "diploma", "degree", "certificate", "training", "internship",
  "software", "network", "cyber", "medicine", "doctor", "nurse", "engineering",
  "accounting", "finance", "teaching", "law", "business", "science",
  "mpc", "mcb", "pcb", "meg", "heg", "combinations", "a'level",
  "rwanda", "kigali", "africa", "scholarship", "study abroad",
  "learn", "education", "career guidance", "what can i study",
  "how do i become", "tell me about", "i want to",
  "mathematics", "physics", "chemistry", "biology", "economics",
  "geography", "history", "english", "kinyarwanda", "french",
  "data", "artificial intelligence", "machine learning", "ai",
  "nursing", "midwifery", "pharmacy", "public health",
  "construction", "architecture", "surveying",
  "hospitality", "tourism", "hotel", "chef",
  "agriculture", "farming", "agribusiness",
  "teacher", "lecturer", "instructor",
  "accountant", "auditor", "tax",
  "electrician", "plumber", "welder", "mechanic",
  "journalism", "media", "communication",
  "psychology", "sociology", "social work",
  "entrepreneurship", "business",
  "certification", "exam", "subject", "lesson",
  "recommend", "suggest", "option", "choice",
  "russia", "canada", "usa", "uk", "germany", "china", "india",
  "scholarship", "bursary", "loan", "financial aid",
]

const FOLLOW_UP_INDICATORS = [
  "career opportunities", "required skills", "technical skills", "soft skills",
  "daily responsibilities", "benefits", "advantages", "educational pathways",
  "study pathways", "future outlook", "advice", "why choose", "overview",
  "salary", "job", "work", "opportunities", "skills", "pathways", "programs",
  "universities", "institutions", "courses", "subjects", "combinations",
  "tell me more", "more details", "what about", "career", "options",
  "can i", "how long", "which school", "which university", "requirements",
  "next", "further", "explain", "elaborate", "continue", "and",
]

function getOrCreateSession(sessionId) {
  const id = sessionId || "default"
  if (!sessions.has(id)) {
    sessions.set(id, { lastTopic: null, history: [] })
  }
  return sessions.get(id)
}

function isGreeting(query) {
  const normalized = query.toLowerCase().trim().replace(/[^a-z\s]/g, "").trim()
  return GREETINGS.some((g) => normalized === g || normalized.startsWith(g))
}

function isOffTopic(query) {
  const q = query.toLowerCase()
  return !CAREER_KEYWORDS.some((k) => q.includes(k))
}

function resolveContextQuery(query, session) {
  if (!session.lastTopic) return query

  const q = query.toLowerCase()
  const isFollowUp = FOLLOW_UP_INDICATORS.some((i) => q.includes(i))

  if (isFollowUp) {
    return `Regarding ${session.lastTopic}: ${query}`
  }

  return query
}

function buildGreetingResponse() {
  return {
    success: true,
    message: "Greeting",
    source: "ai",
    data: {
      response: `Hello! Welcome to **MyCareer**. I'm your AI Career Counselor. 👋

I'm here to help you explore careers, study pathways, skills development, university programs, TVET opportunities, and professional growth.

**What career or field would you like to explore today?**

You can ask me about:
- **Careers** like Software Development, Medicine, Cybersecurity, Accounting, and more
- **Study programs** and **A'Level subject combinations**
- **TVET pathways** and vocational training opportunities
- **University programs** in Rwanda and abroad`,
      suggestions: [
        "Tell me about Software Development",
        "What can I study after MPC?",
        "How do I become a doctor?",
        "What is Cybersecurity about?",
        "What TVET programs are available in Rwanda?",
      ],
      lastTopic: null,
    },
  }
}

function buildRedirectResponse() {
  return {
    success: true,
    message: "Redirect",
    source: "ai",
    data: {
      response: `I'm here to help with **career and education guidance**! 🎯

I can assist you with:
- Exploring different **careers** and job opportunities
- Finding the right **study programs** and pathways
- Understanding **TVET and university options**
- Building **skills** for your dream career

**What career or field would you like to learn about?**`,
      suggestions: [
        "Tell me about Software Development",
        "What are the best TVET programs in Rwanda?",
        "How do I choose a career path?",
        "What can I study after high school?",
        "Which university programs are in demand?",
      ],
      lastTopic: null,
    },
  }
}

function buildFallbackResponse(entry) {
  let response = `# ${entry.name}\n\n`

  if (entry.overview) response += `## Career Overview\n${entry.overview}\n\n`
  if (entry.whyChoose) response += `## Why Choose This Career\n${entry.whyChoose}\n\n`
  if (entry.benefits) response += `## Benefits and Advantages\n${entry.benefits.map((b) => `- ${b}`).join("\n")}\n\n`
  if (entry.responsibilities) response += `## Daily Responsibilities\n${entry.responsibilities.map((r) => `- ${r}`).join("\n")}\n\n`
  if (entry.technicalSkills) response += `## Required Technical Skills\n${entry.technicalSkills.map((s) => `- ${s}`).join("\n")}\n\n`
  if (entry.softSkills) response += `## Required Soft Skills\n${entry.softSkills.map((s) => `- ${s}`).join("\n")}\n\n`
  if (entry.educationalPathways) response += `## Educational Pathways\n${entry.educationalPathways}\n\n`
  if (entry.careerOpportunities) response += `## Career Opportunities\n${entry.careerOpportunities.map((c) => `- ${c}`).join("\n")}\n\n`
  if (entry.futureOutlook) response += `## Future Outlook\n${entry.futureOutlook}\n\n`
  if (entry.advice) response += `## Advice for Students\n${entry.advice}\n\n`
  if (entry.followUpQuestions) {
    response += `## Suggested Follow-Up Questions\n${entry.followUpQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`
  }

  return response
}

function buildFollowUpSectionResponse(entry, query) {
  const q = query.toLowerCase()

  const sectionMap = [
    { keywords: ["overview", "about", "tell me about", "what is"], field: "overview", title: "Career Overview" },
    { keywords: ["why choose", "why should", "why study", "why this"], field: "whyChoose", title: "Why Choose This Career" },
    { keywords: ["benefit", "advantage", "pros", "good"], field: "benefits", title: "Benefits and Advantages", isList: true },
    { keywords: ["responsibilities", "daily", "day-to-day", "what do they do", "tasks", "duties"], field: "responsibilities", title: "Daily Responsibilities", isList: true },
    { keywords: ["technical skill", "hard skill", "technical"], field: "technicalSkills", title: "Required Technical Skills", isList: true },
    { keywords: ["soft skill", "interpersonal", "people skill"], field: "softSkills", title: "Required Soft Skills", isList: true },
    { keywords: ["education", "pathway", "study", "a'level", "combination", "university", "tvet", "degree", "diploma", "certificate", "program", "course"], field: "educationalPathways", title: "Educational Pathways" },
    { keywords: ["opportunities", "jobs", "career", "work as", "employment", "salary", "positions", "roles"], field: "careerOpportunities", title: "Career Opportunities", isList: true },
    { keywords: ["future", "outlook", "demand", "growth", "trend", "prospect"], field: "futureOutlook", title: "Future Outlook" },
    { keywords: ["advice", "tip", "recommend", "suggest", "guide", "how to", "how do i"], field: "advice", title: "Advice for Students" },
  ]

  for (const section of sectionMap) {
    if (section.keywords.some((k) => q.includes(k))) {
      const value = entry[section.field]
      if (!value) break

      let response = `# ${entry.name}\n\n## ${section.title}\n`
      if (section.isList && Array.isArray(value)) {
        response += value.map((v) => `- ${v}`).join("\n")
      } else {
        response += value
      }
      response += `\n\n## Suggested Follow-Up Questions\n`
      if (entry.followUpQuestions) {
        response += entry.followUpQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")
      }
      return response
    }
  }

  return buildFallbackResponse(entry)
}

async function handleCareerQuery(req, res) {
  const { query, sessionId } = req.body

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid query.",
      data: { response: "", suggestions: [], lastTopic: null },
    })
  }

  const input = query.trim()
  const session = getOrCreateSession(sessionId || req.ip)

  if (isGreeting(input)) {
    session.lastTopic = null
    return res.status(200).json(buildGreetingResponse())
  }

  if (isOffTopic(input)) {
    return res.status(200).json(buildRedirectResponse())
  }

  const contextualQuery = resolveContextQuery(input, session)

  try {
    const aiResponse = await getCareerAdvice(contextualQuery, session.history)

    const topicKeywords = input.split(" ").slice(0, 5).join(" ")
    session.lastTopic = topicKeywords
    session.history.push({ role: "user", content: input })
    session.history.push({ role: "assistant", content: aiResponse })

    if (session.history.length > 20) {
      session.history = session.history.slice(-20)
    }

    return res.status(200).json({
      success: true,
      message: "AI-generated career guidance.",
      source: "ai",
      data: {
        response: aiResponse,
        suggestions: [],
        lastTopic: session.lastTopic,
      },
    })
  } catch (aiError) {
    const match = findMatch(input)

    if (match) {
      const fallbackResponse = buildFallbackResponse(match)
      session.lastTopic = match.name

      return res.status(200).json({
        success: true,
        message: "Career data found (local fallback).",
        source: "local",
        data: {
          response: fallbackResponse,
          suggestions: match.followUpQuestions || [],
          lastTopic: session.lastTopic,
        },
      })
    }

    if (session.lastTopic) {
      const contextMatch = findMatch(session.lastTopic)
      if (contextMatch) {
        const sectionResponse = buildFollowUpSectionResponse(contextMatch, input)
        return res.status(200).json({
          success: true,
          message: "Career section data (context fallback).",
          source: "local",
          data: {
            response: sectionResponse,
            suggestions: contextMatch.followUpQuestions || [],
            lastTopic: session.lastTopic,
          },
        })
      }
    }

    return res.status(200).json({
      success: false,
      message: "AI service is currently unavailable.",
      source: "error",
      data: {
        response: `I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please try again later.

In the meantime, you can:
- Check our **Career Search** page for information
- Try asking again with a different topic
- Visit the **About** page to learn more about MyCareer

If the problem persists, please contact our support team.`,
        suggestions: [
          "What can I study after MPC?",
          "Tell me about Networking",
          "How do I become a Software Engineer?",
        ],
        lastTopic: null,
      },
    })
  }
}

function listCareers(req, res) {
  const { getAllCareers } = require("../data/careers")
  const careers = getAllCareers()
  res.json({ success: true, data: careers })
}

function getCareer(req, res) {
  const { getCareerById } = require("../data/careers")
  const career = getCareerById(req.params.id)
  if (!career) {
    return res.status(404).json({ success: false, message: "Career not found." })
  }
  res.json({ success: true, data: career })
}

function addCareer(req, res) {
  const { createCareer } = require("../data/careers")
  const { name } = req.body
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Career name is required." })
  }
  const career = createCareer(req.body)
  res.status(201).json({ success: true, data: career })
}

function editCareer(req, res) {
  const { updateCareer } = require("../data/careers")
  const career = updateCareer(req.params.id, req.body)
  if (!career) {
    return res.status(404).json({ success: false, message: "Career not found." })
  }
  res.json({ success: true, data: career })
}

function removeCareer(req, res) {
  const { deleteCareer } = require("../data/careers")
  const deleted = deleteCareer(req.params.id)
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Career not found." })
  }
  res.json({ success: true, message: "Career deleted." })
}

module.exports = { handleCareerQuery, listCareers, getCareer, addCareer, editCareer, removeCareer }
