<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const API = import.meta.env.VITE_API_URL || '/api'

const TEAM_MEMBERS = [
  { name: 'IRANZI SANGWA Arnaud', password: 'admin123', role: 'superadmin' },
  { name: 'Muganwa Elie', password: 'elie2024', role: 'member' },
  { name: 'Shyaka Tresor', password: 'tresor2024', role: 'member' },
  { name: 'Abakundanye Bruno', password: 'bruno2024', role: 'member' },
  { name: 'Gakuba Landry', password: 'landry2024', role: 'member' },
]

const activities = ref(JSON.parse(localStorage.getItem('mycareer_activities') || '[]'))
function logActivity(action) {
  const entry = { member: currentUser.value.name, action, timestamp: new Date().toISOString() }
  activities.value.unshift(entry)
  if (activities.value.length > 100) activities.value = activities.value.slice(0, 100)
  localStorage.setItem('mycareer_activities', JSON.stringify(activities.value))
}

const announcements = ref(JSON.parse(localStorage.getItem('mycareer_announcements') || '[]'))
const announcementText = ref('')
function addAnnouncement() {
  if (!announcementText.value.trim()) return
  announcements.value.unshift({ id: Date.now(), text: announcementText.value.trim(), date: new Date().toISOString() })
  if (announcements.value.length > 50) announcements.value = announcements.value.slice(0, 50)
  localStorage.setItem('mycareer_announcements', JSON.stringify(announcements.value))
  announcementText.value = ''
  logActivity('Added an announcement')
}
function deleteAnnouncement(id) {
  announcements.value = announcements.value.filter(a => a.id !== id)
  localStorage.setItem('mycareer_announcements', JSON.stringify(announcements.value))
}

const careers = ref([])
const loading = ref(false)
const showForm = ref(false)
const editingId = ref(null)
const saving = ref(false)
const deleting = ref(null)

const form = reactive({
  name: '',
  overview: '',
  whyChoose: '',
  benefits: [],
  responsibilities: [],
  technicalSkills: [],
  softSkills: [],
  educationalPathways: '',
  careerOpportunities: [],
  futureOutlook: '',
  advice: '',
  keywords: [],
  programs: [],
  careers: [],
  skills: [],
  institutions: [],
  followUpQuestions: [],
})

const inputFields = ref({
  benefits: '',
  responsibilities: '',
  technicalSkills: '',
  softSkills: '',
  careerOpportunities: '',
  keywords: '',
  programs: '',
  careers: '',
  skills: '',
  institutions: '',
  followUpQuestions: '',
})

const notification = reactive({ show: false, type: '', message: '' })
const currentUser = ref(null)
const showMemberSelect = ref(true)
const selectedMember = ref('')
const passwordInput = ref('')
const passwordError = ref(false)
const unlocked = ref(false)
const activeSection = ref('dashboard')
const sidebarOpen = ref(false)
const isDark = ref(localStorage.getItem('theme') === 'dark')

function selectMember() {
  if (selectedMember.value) { showMemberSelect.value = false; passwordError.value = false }
}
function checkPassword() {
  const member = TEAM_MEMBERS.find(m => m.name === selectedMember.value)
  if (member && passwordInput.value === member.password) {
    currentUser.value = member; unlocked.value = true; passwordError.value = false
    showMemberSelect.value = false; logActivity('Logged in'); fetchCareers()
  } else { passwordError.value = true }
}
function logout() {
  logActivity('Logged out'); currentUser.value = null; unlocked.value = false
  showMemberSelect.value = true; selectedMember.value = ''; passwordInput.value = ''; passwordError.value = false
}
function goBack() { showMemberSelect.value = true; passwordInput.value = ''; passwordError.value = false }

const isSuperAdmin = computed(() => currentUser.value?.role === 'superadmin')

function navigateTo(section) {
  activeSection.value = section; sidebarOpen.value = false
  if (section === 'addcareer') openAddForm()
}

function notify(type, message) {
  notification.show = true; notification.type = type; notification.message = message
  setTimeout(() => { notification.show = false }, 3000)
}

async function fetchCareers() {
  loading.value = true
  try { const r = await fetch(`${API}/careers`); const j = await r.json(); careers.value = j.data || [] }
  catch { notify('error', 'Failed to load careers.') }
  finally { loading.value = false }
}

function addTag(f) { const v = inputFields.value[f].trim(); if (!v) return; form[f].push(v); inputFields.value[f] = '' }
function removeTag(f, i) { form[f].splice(i, 1) }
function submitTag(e, f) { if (e.key === 'Enter') { e.preventDefault(); addTag(f) } }

function openAddForm() {
  editingId.value = null
  Object.keys(form).forEach(k => { if (Array.isArray(form[k])) form[k] = []; else form[k] = '' })
  showForm.value = true; activeSection.value = 'addcareer'
}
function openEditForm(c) {
  editingId.value = c.id
  Object.keys(form).forEach(k => { form[k] = Array.isArray(c[k]) ? [...(c[k] || [])] : c[k] || '' })
  showForm.value = true; activeSection.value = 'addcareer'
}
function closeForm() { showForm.value = false; editingId.value = null; activeSection.value = 'careers' }

async function saveCareer() {
  if (!form.name.trim()) { notify('error', 'Career name is required.'); return }
  saving.value = true; const body = {}; Object.keys(form).forEach(k => { body[k] = form[k] })
  try {
    const url = editingId.value ? `${API}/careers/${editingId.value}` : `${API}/careers`
    const method = editingId.value ? 'PUT' : 'POST'
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const j = await r.json()
    if (!j.success) { notify('error', j.message || 'Failed to save career.'); return }
    logActivity(editingId.value ? `Updated career: ${form.name}` : `Created career: ${form.name}`)
    notify('success', editingId.value ? 'Career updated.' : 'Career created.')
    closeForm(); await fetchCareers()
  } catch { notify('error', 'Network error. Could not save career.') }
  finally { saving.value = false }
}
async function deleteCareer(id, name) {
  deleting.value = id
  try {
    const r = await fetch(`${API}/careers/${id}`, { method: 'DELETE' }); const j = await r.json()
    if (!j.success) { notify('error', j.message || 'Failed to delete career.'); return }
    logActivity(`Deleted career: ${name}`); notify('success', 'Career deleted.'); await fetchCareers()
  } catch { notify('error', 'Network error. Could not delete career.') }
  finally { deleting.value = null }
}
function confirmDelete(id, name) { if (window.confirm(`Delete "${name}"? This cannot be undone.`)) deleteCareer(id, name) }

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

const totalSkills = computed(() => careers.value.reduce((s, c) => s + (c.technicalSkills?.length || 0) + (c.softSkills?.length || 0), 0))
const totalOpportunities = computed(() => careers.value.reduce((s, c) => s + (c.careerOpportunities?.length || 0), 0))

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'careers', label: 'Careers', icon: 'briefcase' },
  { id: 'addcareer', label: 'Add Career', icon: 'plus' },
  { id: 'analytics', label: 'Career Analytics', icon: 'chart' },
  { id: 'requests', label: 'Career Requests', icon: 'inbox' },
  { id: 'subjects', label: 'Subject Combinations', icon: 'book' },
  { id: 'aianalytics', label: 'AI Analytics', icon: 'cpu' },
  { id: 'feedback', label: 'Feedback', icon: 'message' },
  { id: 'announcements', label: 'Announcements', icon: 'megaphone' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'logout', label: 'Logout', icon: 'logout' },
]

const sidebarIcons = {
  grid: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8m6 3.13a4 4 0 0 1 0 7.75M23 21v-2a4 4 0 0 0-3-3.87',
  briefcase: 'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m-6-4H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2',
  plus: 'M12 5v14m-7-7h14',
  chart: 'M18 20V10m-6 10V4M6 20v-6',
  inbox: 'M22 12h-5l-2 3H9l-2-3H2m18-4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m14-4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2',
  book: 'M4 6h16M4 12h16m-7-6h-6m0 0H4m16 0h-7M4 18h16',
  cpu: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7z',
  message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  megaphone: 'M11 5L6 9H2v6h4l5 4V5zm10 0s-1 6-1 10-1 6-1 6',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0-13v2m0 14v2m-7-9H3m18 0h-2M6.34 6.34l-1.42 1.42m12.72 12.72l-1.42-1.42M6.34 17.66l-1.42-1.42m12.72-12.72l-1.42 1.42',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9',
}

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark')
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950" :class="{ dark: isDark }">

    <!-- Notification -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-[100] animate-slide-in-right">
      <div class="px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2"
        :class="notification.type === 'success'
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800'
          : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800'">
        <svg v-if="notification.type === 'success'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        {{ notification.message }}
      </div>
    </div>

    <!-- Login Screen -->
    <div v-if="!unlocked" class="max-w-md mx-auto mt-20 px-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div class="text-center mb-6">
          <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Select your name and enter your password.</p>
        </div>
        <div v-if="showMemberSelect">
          <form @submit.prevent="selectMember" class="space-y-4">
            <select v-model="selectedMember" class="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
              <option value="" disabled>Select your name</option>
              <option v-for="m in TEAM_MEMBERS" :key="m.name" :value="m.name">{{ m.name }}</option>
            </select>
            <button type="submit" :disabled="!selectedMember" class="w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50">Continue</button>
          </form>
        </div>
        <div v-else>
          <div class="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <button @click="goBack" class="hover:text-primary-600 transition-colors">&larr; Change</button>
            <span class="font-medium text-gray-700 dark:text-gray-200">{{ selectedMember }}</span>
          </div>
          <form @submit.prevent="checkPassword" class="space-y-4">
            <input v-model="passwordInput" type="password" placeholder="Enter your password"
              class="w-full px-4 py-3 text-sm bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all text-center"
              :class="passwordError ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'" />
            <p v-if="passwordError" class="text-xs text-red-500 -mt-2">Incorrect password. Try again.</p>
            <button type="submit" class="w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Admin Layout -->
    <div v-else class="flex min-h-screen">

      <!-- Mobile overlay -->
      <div v-if="sidebarOpen" class="fixed inset-0 bg-black/40 z-40 lg:hidden" @click="sidebarOpen = false"></div>

      <!-- Sidebar -->
      <aside class="fixed lg:sticky top-0 left-0 z-50 lg:z-30 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
        <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 21V9l8-5 8 5v12"/><path d="M4 21h16"/><path d="M12 21v-8"/><path d="M8 13h8"/><path d="M10 9l2-2 2 2"/>
              </svg>
            </div>
            <span class="text-lg font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">Admin</span>
          </div>
          <button @click="sidebarOpen = false" class="lg:hidden p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <nav class="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-65px)]">
          <button v-for="item in sidebarItems" :key="item.id" @click="item.id === 'logout' ? logout() : navigateTo(item.id)"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-150"
            :class="item.id === 'logout'
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              : activeSection === item.id
                ? 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path :d="sidebarIcons[item.icon]" />
            </svg>
            {{ item.label }}
          </button>
        </nav>

        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {{ currentUser?.name?.split(' ').map(w => w[0]).slice(0, 2).join('') }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs font-semibold text-gray-900 dark:text-white truncate">{{ currentUser?.name }}</p>
              <p class="text-xs text-gray-400 truncate">{{ isSuperAdmin ? 'Super Admin' : 'Team Member' }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 min-w-0">
        <!-- Top bar -->
        <div class="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
          <div class="flex items-center justify-between px-4 lg:px-8 py-3">
            <div class="flex items-center gap-3">
              <button @click="sidebarOpen = true" class="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900 dark:text-white capitalize">{{ activeSection === 'addcareer' ? 'Add Career' : activeSection === 'aianalytics' ? 'AI Analytics' : activeSection }}</h1>
            </div>
            <button @click="toggleTheme" class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors">
              <svg v-if="!isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
          </div>
        </div>

        <div class="p-4 lg:p-8">

          <!-- ==================== DASHBOARD ==================== -->
          <div v-if="activeSection === 'dashboard'" class="space-y-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Careers</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ careers.length }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Skills</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ totalSkills }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Opportunities</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ totalOpportunities }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Team Members</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ TEAM_MEMBERS.length }}</p>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  Activity Log
                </h3>
                <button @click="activities = []; localStorage.removeItem('mycareer_activities')" class="text-xs text-red-500 hover:text-red-700 font-medium">Clear</button>
              </div>
              <div class="max-h-72 overflow-y-auto">
                <div v-if="activities.length === 0" class="px-6 py-8 text-center text-sm text-gray-400">No activity recorded.</div>
                <div v-for="(act, i) in activities" :key="i" class="flex items-start gap-3 px-6 py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {{ act.member.split(' ').map(w => w[0]).slice(0, 2).join('') }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-700 dark:text-gray-300"><strong>{{ act.member }}</strong> <span class="text-gray-500">{{ act.action }}</span></p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ new Date(act.timestamp).toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== USERS ==================== -->
          <div v-if="activeSection === 'users'" class="space-y-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-100 dark:border-gray-700 text-left">
                    <th class="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">Name</th>
                    <th class="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">Role</th>
                    <th class="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="m in TEAM_MEMBERS" :key="m.name" class="border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <td class="px-6 py-4 text-gray-900 dark:text-white font-medium">{{ m.name }}</td>
                    <td class="px-6 py-4">
                      <span class="px-2.5 py-1 text-xs font-semibold rounded-lg"
                        :class="m.role === 'superadmin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'">
                        {{ m.role === 'superadmin' ? 'Super Admin' : 'Member' }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="flex items-center gap-1.5 text-xs text-emerald-600">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ==================== CAREERS ==================== -->
          <div v-if="activeSection === 'careers'" class="space-y-4">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ careers.length }} career(s) total</p>
              <button @click="openAddForm" class="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all">+ Add Career</button>
            </div>

            <div v-if="loading" class="flex items-center justify-center py-20">
              <div class="flex gap-2"><div class="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style="animation-delay:0ms"></div><div class="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style="animation-delay:150ms"></div><div class="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style="animation-delay:300ms"></div></div>
            </div>

            <div v-else-if="careers.length === 0" class="text-center py-20">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center dark:bg-gray-800">
                <svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No careers yet</h3>
              <p class="text-gray-500 dark:text-gray-400 mb-4">Add your first career to get started.</p>
              <button @click="openAddForm" class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl">Add Career</button>
            </div>

            <div v-else class="grid gap-3">
              <div v-for="career in careers" :key="career.id" class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3 mb-1">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">{{ career.name }}</h3>
                      <span class="shrink-0 px-2 py-0.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg dark:text-primary-300 dark:bg-primary-900/30">#{{ career.id }}</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ career.overview || 'No description.' }}</p>
                    <div class="flex flex-wrap gap-2 mt-3">
                      <span class="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg dark:text-emerald-300 dark:bg-emerald-900/30">{{ career.careerOpportunities?.length || 0 }} opportunities</span>
                      <span class="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg dark:text-blue-300 dark:bg-blue-900/30">{{ career.benefits?.length || 0 }} benefits</span>
                      <span class="px-2.5 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-lg dark:text-purple-300 dark:bg-purple-900/30">{{ career.skills?.length || career.technicalSkills?.length || 0 }} skills</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <button @click="openEditForm(career)" class="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors dark:hover:text-primary-400 dark:hover:bg-primary-900/30" title="Edit">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button @click="confirmDelete(career.id, career.name)" class="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors dark:hover:text-red-400 dark:hover:bg-red-900/30" title="Delete">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== ADD CAREER (modal form) ==================== -->
          <div v-if="showForm" class="fixed inset-0 z-[60] flex items-start justify-center pt-10 pb-10 overflow-y-auto">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeForm"></div>
            <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ editingId ? 'Edit Career' : 'Add New Career' }}</h2>
                <button @click="closeForm" class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors dark:hover:text-gray-300 dark:hover:bg-gray-700">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Career Name <span class="text-red-500">*</span></label>
                  <input v-model="form.name" type="text" placeholder="e.g., Software Development" class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Overview</label>
                  <textarea v-model="form.overview" rows="3" placeholder="Describe the career..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
                </div>
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Career Opportunities</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.careerOpportunities" @keydown="submitTag($event, 'careerOpportunities')" type="text" placeholder="Add opportunity..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('careerOpportunities')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="(item, idx) in form.careerOpportunities" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-lg dark:bg-primary-900/30 dark:text-primary-300">
                        {{ item }} <button @click="removeTag('careerOpportunities', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                      <span v-if="form.careerOpportunities.length === 0" class="text-xs text-gray-400">No opportunities added.</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Benefits & Advantages</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.benefits" @keydown="submitTag($event, 'benefits')" type="text" placeholder="Add benefit..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('benefits')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="(item, idx) in form.benefits" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-300">
                        {{ item }} <button @click="removeTag('benefits', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                      <span v-if="form.benefits.length === 0" class="text-xs text-gray-400">No benefits added.</span>
                    </div>
                  </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Technical Skills</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.technicalSkills" @keydown="submitTag($event, 'technicalSkills')" type="text" placeholder="Add skill..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('technicalSkills')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="(item, idx) in form.technicalSkills" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                        {{ item }} <button @click="removeTag('technicalSkills', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                      <span v-if="form.technicalSkills.length === 0" class="text-xs text-gray-400">No skills added.</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Soft Skills</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.softSkills" @keydown="submitTag($event, 'softSkills')" type="text" placeholder="Add skill..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('softSkills')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="(item, idx) in form.softSkills" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg dark:bg-purple-900/30 dark:text-purple-300">
                        {{ item }} <button @click="removeTag('softSkills', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                      <span v-if="form.softSkills.length === 0" class="text-xs text-gray-400">No soft skills added.</span>
                    </div>
                  </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Responsibilities</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.responsibilities" @keydown="submitTag($event, 'responsibilities')" type="text" placeholder="Add responsibility..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('responsibilities')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="(item, idx) in form.responsibilities" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg dark:bg-amber-900/30 dark:text-amber-300">
                        {{ item }} <button @click="removeTag('responsibilities', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                      <span v-if="form.responsibilities.length === 0" class="text-xs text-gray-400">No responsibilities added.</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Follow-Up Questions</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.followUpQuestions" @keydown="submitTag($event, 'followUpQuestions')" type="text" placeholder="Add question..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('followUpQuestions')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="(item, idx) in form.followUpQuestions" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-700 rounded-lg dark:bg-rose-900/30 dark:text-rose-300">
                        {{ item }} <button @click="removeTag('followUpQuestions', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                      <span v-if="form.followUpQuestions.length === 0" class="text-xs text-gray-400">No questions added.</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Why Choose This Career</label>
                  <textarea v-model="form.whyChoose" rows="2" class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Educational Pathways</label>
                  <textarea v-model="form.educationalPathways" rows="3" placeholder="A'Level combinations, TVET options, university programs..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Future Outlook</label>
                  <textarea v-model="form.futureOutlook" rows="2" class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Advice for Students</label>
                  <textarea v-model="form.advice" rows="3" class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
                </div>
                <details class="group">
                  <summary class="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-primary-600 transition-colors">Additional Fields</summary>
                  <div class="mt-4 space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Keywords</label>
                        <div class="flex gap-2 mb-2">
                          <input v-model="inputFields.keywords" @keydown="submitTag($event, 'keywords')" type="text" placeholder="Add keyword..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                          <button @click="addTag('keywords')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                        </div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(item, idx) in form.keywords" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">{{ item }} <button @click="removeTag('keywords', idx)" class="hover:text-red-500">&times;</button></span>
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Programs</label>
                        <div class="flex gap-2 mb-2">
                          <input v-model="inputFields.programs" @keydown="submitTag($event, 'programs')" type="text" placeholder="Add program..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                          <button @click="addTag('programs')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                        </div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(item, idx) in form.programs" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">{{ item }} <button @click="removeTag('programs', idx)" class="hover:text-red-500">&times;</button></span>
                        </div>
                      </div>
                    </div>
                    <div class="grid sm:grid-cols-3 gap-4">
                      <div><label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Career Titles</label>
                        <div class="flex gap-2 mb-2">
                          <input v-model="inputFields.careers" @keydown="submitTag($event, 'careers')" type="text" placeholder="Add title..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                          <button @click="addTag('careers')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                        </div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(item, idx) in form.careers" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">{{ item }} <button @click="removeTag('careers', idx)" class="hover:text-red-500">&times;</button></span>
                        </div>
                      </div>
                      <div><label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Skills</label>
                        <div class="flex gap-2 mb-2">
                          <input v-model="inputFields.skills" @keydown="submitTag($event, 'skills')" type="text" placeholder="Add skill..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                          <button @click="addTag('skills')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                        </div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(item, idx) in form.skills" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">{{ item }} <button @click="removeTag('skills', idx)" class="hover:text-red-500">&times;</button></span>
                        </div>
                      </div>
                      <div><label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Institutions</label>
                        <div class="flex gap-2 mb-2">
                          <input v-model="inputFields.institutions" @keydown="submitTag($event, 'institutions')" type="text" placeholder="Add institution..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                          <button @click="addTag('institutions')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                        </div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(item, idx) in form.institutions" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">{{ item }} <button @click="removeTag('institutions', idx)" class="hover:text-red-500">&times;</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
              <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
                <button @click="closeForm" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">Cancel</button>
                <button @click="saveCareer" class="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all flex items-center gap-2">
                  <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" class="opacity-75"/></svg>
                  {{ saving ? 'Saving...' : (editingId ? 'Update Career' : 'Create Career') }}
                </button>
              </div>
            </div>
          </div>

          <!-- ==================== CAREER ANALYTICS ==================== -->
          <div v-if="activeSection === 'analytics'" class="space-y-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg Skills/Career</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ careers.length ? (totalSkills / careers.length).toFixed(1) : 0 }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg Opportunities</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ careers.length ? (totalOpportunities / careers.length).toFixed(1) : 0 }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">With Overview</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ careers.filter(c => c.overview).length }} / {{ careers.length }}</p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">With Pathways</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ careers.filter(c => c.educationalPathways).length }} / {{ careers.length }}</p>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
              <p class="text-sm text-gray-400">Detailed analytics charts coming soon.</p>
            </div>
          </div>

          <!-- ==================== CAREER REQUESTS ==================== -->
          <div v-if="activeSection === 'requests'" class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center dark:bg-primary-900/30">
              <svg class="w-8 h-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-5l-2 3H9l-2-3H2"/><path d="M20 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8"/><path d="M18 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Career Requests</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">When users request a new career, it will appear here for review. No requests yet.</p>
          </div>

          <!-- ==================== SUBJECT COMBINATIONS ==================== -->
          <div v-if="activeSection === 'subjects'" class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center dark:bg-emerald-900/30">
              <svg class="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M4 12h16m-7-6h-6"/><path d="M4 18h16"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Subject Combinations</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">Manage A'Level subject combinations and their linked careers. Coming soon.</p>
          </div>

          <!-- ==================== AI ANALYTICS ==================== -->
          <div v-if="activeSection === 'aianalytics'" class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-purple-50 rounded-2xl flex items-center justify-center dark:bg-purple-900/30">
              <svg class="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">AI Analytics</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">View AI assistant usage stats, popular queries, and performance metrics. Coming soon.</p>
          </div>

          <!-- ==================== FEEDBACK ==================== -->
          <div v-if="activeSection === 'feedback'" class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-rose-50 rounded-2xl flex items-center justify-center dark:bg-rose-900/30">
              <svg class="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">User Feedback</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">User-submitted feedback will appear here. No feedback received yet.</p>
          </div>

          <!-- ==================== ANNOUNCEMENTS ==================== -->
          <div v-if="activeSection === 'announcements'" class="space-y-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">New Announcement</h3>
              <div class="flex gap-2">
                <input v-model="announcementText" @keydown="submitTag($event, 'announcement')" type="text" placeholder="Write an announcement..." class="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                <button @click="addAnnouncement" class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all">Post</button>
              </div>
            </div>
            <div v-if="announcements.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
              <p class="text-sm text-gray-400">No announcements posted yet.</p>
            </div>
            <div v-for="a in announcements" :key="a.id" class="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-start justify-between gap-4">
              <div>
                <p class="text-sm text-gray-900 dark:text-white">{{ a.text }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ new Date(a.date).toLocaleString() }}</p>
              </div>
              <button @click="deleteAnnouncement(a.id)" class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>

          <!-- ==================== SETTINGS ==================== -->
          <div v-if="activeSection === 'settings'" class="space-y-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
              <div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p class="text-xs text-gray-400">Toggle between light and dark theme</p>
                </div>
                <button @click="toggleTheme" class="relative w-11 h-6 rounded-full transition-colors" :class="isDark ? 'bg-primary-600' : 'bg-gray-300'">
                  <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" :class="isDark ? 'translate-x-5' : ''"></span>
                </button>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">API Endpoint</h3>
              <p class="text-xs text-gray-400 break-all">{{ API }}</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>
