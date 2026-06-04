<script setup>
import { ref, nextTick, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const messages = ref([])
const input = ref('')
const isTyping = ref(false)
const chatContainer = ref(null)
const sessionId = ref('')

const defaultSuggestions = [
  'Tell me about Software Development',
  'What can I study after MPC?',
  'How do I become a doctor?',
  'What is Cybersecurity about?',
  'What TVET programs are available in Rwanda?',
]

const showSuggestions = ref(true)
const currentSuggestions = ref([])

function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8)
}

function addMessage(role, content, isHtml = false) {
  messages.value.push({ role, content, isHtml, id: Date.now() + Math.random() })
}

async function sendMessage(text) {
  if (!text.trim()) return
  const query = text.trim()
  addMessage('user', query)
  input.value = ''
  isTyping.value = true
  showSuggestions.value = false

  await nextTick()
  scrollToBottom()

  try {
    const res = await fetch(`${API_URL}/career`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, sessionId: sessionId.value }),
    })

    const json = await res.json()

    if (json.success && json.data) {
      const responseText = json.data.response || ''
      const html = renderMarkdown(responseText)
      addMessage('assistant', html, true)

      if (json.data.suggestions && json.data.suggestions.length > 0) {
        currentSuggestions.value = json.data.suggestions
      } else {
        currentSuggestions.value = extractSuggestions(responseText)
      }
    } else {
      addMessage('assistant', renderMarkdown(json.data?.response || 'Service unavailable. Please try again.'), true)
      currentSuggestions.value = defaultSuggestions
    }
  } catch {
    addMessage('assistant', renderMarkdown(`I'm having trouble connecting to the career guidance service. Please try again.`), true)
    currentSuggestions.value = defaultSuggestions
  }

  isTyping.value = false
  await nextTick()
  scrollToBottom()
}

function extractSuggestions(text) {
  const lines = text.split('\n')
  const suggestions = []
  let inSection = false

  for (const line of lines) {
    if (line.toLowerCase().includes('suggested follow-up') || line.toLowerCase().includes('follow-up question')) {
      inSection = true
      continue
    }
    if (inSection) {
      const trimmed = line.trim()
      if (trimmed.match(/^\d+[\.\)]/)) {
        const q = trimmed.replace(/^\d+[\.\)]\s*/, '').trim()
        if (q) suggestions.push(q)
      } else if (trimmed.startsWith('- ')) {
        const q = trimmed.substring(2).trim()
        if (q) suggestions.push(q)
      } else if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('**')) {
        if (trimmed.length > 10 && trimmed.length < 120 && suggestions.length < 5) {
          if (trimmed.includes('?')) suggestions.push(trimmed)
        }
      } else if (!trimmed) {
        break
      }
    }
  }

  return suggestions.length > 0 ? suggestions.slice(0, 5) : defaultSuggestions
}

function useSuggestion(suggestion) {
  sendMessage(suggestion)
}

function scrollToBottom() {
  if (chatContainer.value) {
    setTimeout(() => {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }, 50)
  }
}

function renderMarkdown(text) {
  if (!text) return ''

  const lines = text.split('\n')
  const result = []
  let inList = false
  let listType = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      if (inList) {
        result.push('</ul>')
        inList = false
        listType = null
      }
      result.push('<div class="h-2"></div>')
      continue
    }

    if (trimmed.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; listType = null }
      result.push(`<h3 class="text-base font-bold text-gray-900 mt-4 mb-2 dark:text-gray-100">${parseInline(trimmed.substring(4))}</h3>`)
      continue
    }

    if (trimmed.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; listType = null }
      const sectionIcon = getSectionIcon(trimmed.substring(3))
      result.push(`<div class="flex items-center gap-2 mb-3 mt-5 first:mt-0">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shrink-0">${sectionIcon}</div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">${parseInline(trimmed.substring(3))}</h2>
      </div>`)
      continue
    }

    if (trimmed.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; listType = null }
      result.push(`<h1 class="text-2xl font-bold text-gray-900 mb-3 dark:text-gray-100">${parseInline(trimmed.substring(2))}</h1>`)
      continue
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        if (inList) result.push('</ul>')
        result.push('<ul class="space-y-1.5 my-2">')
        inList = true
        listType = 'ul'
      }
      result.push(`<li class="flex items-start gap-2 text-gray-700 dark:text-gray-300"><span class="text-primary-500 mt-1.5 shrink-0">•</span><span>${parseInline(trimmed.substring(2))}</span></li>`)
      continue
    }

    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/)
    if (numberedMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) result.push('</ul>')
        result.push('<ol class="space-y-1.5 my-2 list-none">')
        inList = true
        listType = 'ol'
      }
      result.push(`<li class="flex items-start gap-2 text-gray-700 dark:text-gray-300"><span class="text-primary-600 font-semibold shrink-0 w-5">${numberedMatch[1]}.</span><span>${parseInline(numberedMatch[2])}</span></li>`)
      continue
    }

    if (inList) {
      result.push('</ul>')
      inList = false
      listType = null
    }

    result.push(`<p class="text-gray-700 leading-relaxed dark:text-gray-300">${parseInline(trimmed)}</p>`)
  }

  if (inList) {
    result.push(listType === 'ol' ? '</ol>' : '</ul>')
  }

  return result.join('\n')
}

function parseInline(text) {
  let result = text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

  return result
}

function getSectionIcon(title) {
  const t = title.toLowerCase()
  if (t.includes('overview')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  }
  if (t.includes('why choose')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
  }
  if (t.includes('benefits') || t.includes('advantage')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
  }
  if (t.includes('responsibilities') || t.includes('daily')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  }
  if (t.includes('technical skill') || t.includes('hard skill')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
  }
  if (t.includes('soft skill')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  }
  if (t.includes('education') || t.includes('pathway')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 21V9l8-5 8 5v12"/><path d="M4 21h16"/><path d="M12 21v-8"/><path d="M8 13h8"/><path d="M10 9l2-2 2 2"/></svg>`
  }
  if (t.includes('opportunities') || t.includes('career')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
  }
  if (t.includes('future') || t.includes('outlook')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  }
  if (t.includes('advice') || t.includes('student')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  }
  if (t.includes('follow-up') || t.includes('question') || t.includes('suggest')) {
    return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  }
  return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
}

onMounted(() => {
  sessionId.value = generateSessionId()

  setTimeout(() => {
    addMessage('assistant',
      `<div class="flex items-center gap-3 mb-2">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-lg font-bold shadow-md shrink-0">✦</div>
        <div>
          <p class="font-bold text-gray-900 dark:text-gray-100 text-base">MyCareer AI Counselor</p>
          <p class="text-xs text-emerald-600 font-medium">Online • Ready to help</p>
        </div>
      </div>
      <p class="text-gray-700 dark:text-gray-300 mt-2">Hello! Welcome to <strong class="text-gray-900 dark:text-gray-100">MyCareer</strong>. I'm your AI Career Counselor! 👋</p>
      <p class="text-gray-700 dark:text-gray-300 mt-2">I'm here to help you explore careers, study pathways, skills development, university programs, TVET opportunities, and professional growth.</p>
      <p class="text-gray-700 dark:text-gray-300 mt-3"><strong class="text-gray-900 dark:text-gray-100">What career or field would you like to explore today?</strong></p>
      <div class="flex flex-wrap gap-2 mt-3">
        <span class="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg dark:bg-primary-900/40 dark:text-primary-300 border border-primary-100 dark:border-primary-800">🎯 Careers</span>
        <span class="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg dark:bg-primary-900/40 dark:text-primary-300 border border-primary-100 dark:border-primary-800">📚 Study Pathways</span>
        <span class="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg dark:bg-primary-900/40 dark:text-primary-300 border border-primary-100 dark:border-primary-800">🎓 University Programs</span>
        <span class="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg dark:bg-primary-900/40 dark:text-primary-300 border border-primary-100 dark:border-primary-800">🔧 TVET Options</span>
      </div>`,
      true
    )
    showSuggestions.value = true
  }, 500)
})
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900/50 dark:via-gray-950 dark:to-gray-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div class="text-center mb-6">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 dark:text-gray-100">
          AI Career
          <span class="bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">Counselor</span>
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Get personalized career guidance, study pathways, and professional advice</p>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-white font-semibold text-sm">MyCareer AI Counselor</p>
            <p class="text-primary-200 text-xs">Online &middot; Professional Career Guidance</p>
          </div>
        </div>

        <div ref="chatContainer" class="h-[520px] lg:h-[580px] overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-800/50">
          <div v-for="msg in messages" :key="msg.id" class="animate-fade-in" :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div v-if="msg.role === 'user'" class="flex items-start gap-3 max-w-[88%] lg:max-w-[75%] flex-row-reverse">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="bg-primary-600 text-white rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-relaxed shadow-sm">
                {{ msg.content }}
              </div>
            </div>
            <div v-else class="flex items-start gap-3 max-w-[92%] lg:max-w-[82%]">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm dark:bg-gray-800 dark:border-gray-600 min-w-0">
                <div v-if="msg.isHtml" v-html="msg.content" class="text-sm leading-relaxed prose-headings:text-gray-900 prose-headings:dark:text-gray-100"></div>
                <p v-else class="text-gray-700 text-sm dark:text-gray-300">{{ msg.content }}</p>
              </div>
            </div>
          </div>

          <div v-if="isTyping" class="flex justify-start animate-fade-in">
            <div class="flex items-start gap-3 max-w-[88%] lg:max-w-[75%]">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm dark:bg-gray-800 dark:border-gray-600">
                <div class="flex gap-1.5">
                  <span class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                  <span class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
                  <span class="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="messages.length === 1 && showSuggestions" class="pt-2">
            <p class="text-xs text-gray-400 text-center mb-3 dark:text-gray-500">Suggested questions to get started</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="suggestion in defaultSuggestions"
                :key="suggestion"
                @click="useSuggestion(suggestion)"
                class="px-4 py-2 bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>

          <div v-if="currentSuggestions.length > 0 && messages.length > 1 && !isTyping" class="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p class="text-xs text-gray-400 text-center mb-3 dark:text-gray-500">Follow-up questions you can ask</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="(suggestion, idx) in currentSuggestions.slice(0, 5)"
                :key="'sug-' + idx"
                @click="useSuggestion(suggestion)"
                class="px-4 py-2 bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {{ suggestion.length > 60 ? suggestion.substring(0, 60) + '...' : suggestion }}
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 p-4 bg-white dark:border-gray-700 dark:bg-gray-900">
          <form @submit.prevent="sendMessage(input)" class="flex gap-3">
            <input
              v-model="input"
              type="text"
              placeholder="Ask about careers, programs, or pathways..."
              class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
            />
            <button
              type="submit"
              :disabled="!input.trim() || isTyping"
              class="px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-primary-200"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(h1),
:deep(h2),
:deep(h3) {
  scroll-margin-top: 1rem;
}

:deep(ul), :deep(ol) {
  padding-left: 0;
}

:deep(li) {
  line-height: 1.6;
}
</style>
