<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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

const formSaving = ref(false)
const notification = reactive({ show: false, type: '', message: '' })

function notify(type, message) {
  notification.show = true
  notification.type = type
  notification.message = message
  setTimeout(() => { notification.show = false }, 3000)
}

async function fetchCareers() {
  loading.value = true
  try {
    const res = await fetch(`${API}/careers`)
    const json = await res.json()
    careers.value = json.data || []
  } catch {
    notify('error', 'Failed to load careers.')
  } finally {
    loading.value = false
  }
}

function addTag(field) {
  const val = inputFields.value[field].trim()
  if (!val) return
  form[field].push(val)
  inputFields.value[field] = ''
}

function removeTag(field, idx) {
  form[field].splice(idx, 1)
}

function submitTag(e, field) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag(field)
  }
}

function openAddForm() {
  editingId.value = null
  Object.keys(form).forEach((k) => {
    if (Array.isArray(form[k])) form[k] = []
    else form[k] = ''
  })
  showForm.value = true
}

function openEditForm(career) {
  editingId.value = career.id
  Object.keys(form).forEach((k) => {
    form[k] = Array.isArray(career[k])
      ? [...(career[k] || [])]
      : career[k] || ''
  })
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingId.value = null
}

async function saveCareer() {
  if (!form.name.trim()) {
    notify('error', 'Career name is required.')
    return
  }

  saving.value = true
  const body = {}
  Object.keys(form).forEach((k) => { body[k] = form[k] })

  try {
    const url = editingId.value
      ? `${API}/careers/${editingId.value}`
      : `${API}/careers`
    const method = editingId.value ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const json = await res.json()
    if (!json.success) {
      notify('error', json.message || 'Failed to save career.')
      return
    }

    notify('success', editingId.value ? 'Career updated.' : 'Career created.')
    closeForm()
    await fetchCareers()
  } catch {
    notify('error', 'Network error. Could not save career.')
  } finally {
    saving.value = false
  }
}

async function deleteCareer(id) {
  deleting.value = id
  try {
    const res = await fetch(`${API}/careers/${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (!json.success) {
      notify('error', json.message || 'Failed to delete career.')
      return
    }
    notify('success', 'Career deleted.')
    await fetchCareers()
  } catch {
    notify('error', 'Network error. Could not delete career.')
  } finally {
    deleting.value = null
  }
}

function confirmDelete(id, name) {
  if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
    deleteCareer(id)
  }
}

onMounted(fetchCareers)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

      <div v-if="notification.show" class="fixed top-4 right-4 z-[100] animate-slide-in-right">
        <div
          class="px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2"
          :class="notification.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800'
            : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800'"
        >
          <svg v-if="notification.type === 'success'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {{ notification.message }}
        </div>
      </div>

      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Manage careers, opportunities, and descriptions.</p>
        </div>
        <button
          @click="openAddForm"
          class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300 transition-all duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Career
        </button>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="flex gap-2">
          <div class="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style="animation-delay:0ms"></div>
          <div class="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style="animation-delay:150ms"></div>
          <div class="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style="animation-delay:300ms"></div>
        </div>
      </div>

      <div v-else-if="careers.length === 0" class="text-center py-20">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center dark:bg-gray-800">
          <svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No careers yet</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Add your first career to get started.</p>
        <button @click="openAddForm" class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl">Add Career</button>
      </div>

      <div v-else class="grid gap-4">
        <div
          v-for="career in careers"
          :key="career.id"
          class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">{{ career.name }}</h3>
                <span class="shrink-0 px-2 py-0.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg dark:text-primary-300 dark:bg-primary-900/30">{{ career.id }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ career.overview || 'No description.' }}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg dark:text-emerald-300 dark:bg-emerald-900/30">
                  {{ career.careerOpportunities?.length || 0 }} opportunities
                </span>
                <span class="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg dark:text-blue-300 dark:bg-blue-900/30">
                  {{ career.benefits?.length || 0 }} benefits
                </span>
                <span class="px-2.5 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-lg dark:text-purple-300 dark:bg-purple-900/30">
                  {{ career.skills?.length || career.technicalSkills?.length || 0 }} skills
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button
                @click="openEditForm(career)"
                class="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors dark:hover:text-primary-400 dark:hover:bg-primary-900/30"
                title="Edit"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button
                @click="confirmDelete(career.id, career.name)"
                class="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors dark:hover:text-red-400 dark:hover:bg-red-900/30"
                title="Delete"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showForm" class="fixed inset-0 z-[60] flex items-start justify-center pt-10 pb-10 overflow-y-auto">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeForm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ editingId ? 'Edit Career' : 'Add New Career' }}
            </h2>
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
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Overview / Description</label>
              <textarea v-model="form.overview" rows="3" placeholder="Describe the career..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
            </div>

            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Career Opportunities</label>
                <div class="flex gap-2 mb-2">
                  <input v-model="inputFields.careerOpportunities" @keydown="submitTag($event, 'careerOpportunities')" type="text" placeholder="Add opportunity..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  <button @click="addTag('careerOpportunities')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">Add</button>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="(item, idx) in form.careerOpportunities" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-lg dark:bg-primary-900/30 dark:text-primary-300">
                    {{ item }}
                    <button @click="removeTag('careerOpportunities', idx)" class="hover:text-red-500">&times;</button>
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
                    {{ item }}
                    <button @click="removeTag('benefits', idx)" class="hover:text-red-500">&times;</button>
                  </span>
                  <span v-if="form.benefits.length === 0" class="text-xs text-gray-400">No benefits added.</span>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Required Technical Skills</label>
                <div class="flex gap-2 mb-2">
                  <input v-model="inputFields.technicalSkills" @keydown="submitTag($event, 'technicalSkills')" type="text" placeholder="Add skill..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  <button @click="addTag('technicalSkills')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="(item, idx) in form.technicalSkills" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                    {{ item }}
                    <button @click="removeTag('technicalSkills', idx)" class="hover:text-red-500">&times;</button>
                  </span>
                  <span v-if="form.technicalSkills.length === 0" class="text-xs text-gray-400">No skills added.</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Required Soft Skills</label>
                <div class="flex gap-2 mb-2">
                  <input v-model="inputFields.softSkills" @keydown="submitTag($event, 'softSkills')" type="text" placeholder="Add soft skill..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  <button @click="addTag('softSkills')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="(item, idx) in form.softSkills" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg dark:bg-purple-900/30 dark:text-purple-300">
                    {{ item }}
                    <button @click="removeTag('softSkills', idx)" class="hover:text-red-500">&times;</button>
                  </span>
                  <span v-if="form.softSkills.length === 0" class="text-xs text-gray-400">No soft skills added.</span>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Daily Responsibilities</label>
                <div class="flex gap-2 mb-2">
                  <input v-model="inputFields.responsibilities" @keydown="submitTag($event, 'responsibilities')" type="text" placeholder="Add responsibility..." class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  <button @click="addTag('responsibilities')" class="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="(item, idx) in form.responsibilities" :key="idx" class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg dark:bg-amber-900/30 dark:text-amber-300">
                    {{ item }}
                    <button @click="removeTag('responsibilities', idx)" class="hover:text-red-500">&times;</button>
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
                    {{ item }}
                    <button @click="removeTag('followUpQuestions', idx)" class="hover:text-red-500">&times;</button>
                  </span>
                  <span v-if="form.followUpQuestions.length === 0" class="text-xs text-gray-400">No questions added.</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Why Choose This Career</label>
              <textarea v-model="form.whyChoose" rows="2" placeholder="Explain why this career is valuable..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Educational Pathways</label>
              <textarea v-model="form.educationalPathways" rows="3" placeholder="A'Level combinations, TVET options, university programs..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Future Outlook</label>
              <textarea v-model="form.futureOutlook" rows="2" placeholder="Future demand, trends, growth prospects..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Advice for Students</label>
              <textarea v-model="form.advice" rows="3" placeholder="Motivational and practical advice..." class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-primary-900 resize-none"></textarea>
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
                      <span v-for="(item, idx) in form.keywords" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                        {{ item }}
                        <button @click="removeTag('keywords', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Programs</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.programs" @keydown="submitTag($event, 'programs')" type="text" placeholder="Add program..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('programs')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(item, idx) in form.programs" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                        {{ item }}
                        <button @click="removeTag('programs', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Career Titles</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.careers" @keydown="submitTag($event, 'careers')" type="text" placeholder="Add title..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('careers')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(item, idx) in form.careers" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                        {{ item }}
                        <button @click="removeTag('careers', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Skills (brief)</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.skills" @keydown="submitTag($event, 'skills')" type="text" placeholder="Add skill..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('skills')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(item, idx) in form.skills" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                        {{ item }}
                        <button @click="removeTag('skills', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Institutions</label>
                    <div class="flex gap-2 mb-2">
                      <input v-model="inputFields.institutions" @keydown="submitTag($event, 'institutions')" type="text" placeholder="Add institution..." class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                      <button @click="addTag('institutions')" class="px-2 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(item, idx) in form.institutions" :key="idx" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
                        {{ item }}
                        <button @click="removeTag('institutions', idx)" class="hover:text-red-500">&times;</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>

          <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
            <button @click="closeForm" class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">Cancel</button>
            <button
              @click="saveCareer"
              class="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center gap-2"
            >
              <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" class="opacity-75"/></svg>
              {{ saving ? 'Saving...' : (editingId ? 'Update Career' : 'Create Career') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
