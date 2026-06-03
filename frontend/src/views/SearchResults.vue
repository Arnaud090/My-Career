<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findSearchEntry } from '../data/searchData.js'

const route = useRoute()
const router = useRouter()
const query = ref(route.query.q || '')
const isLoading = ref(true)
const hasSearched = ref(false)

const careerData = computed(() => findSearchEntry(query.value))

const sections = computed(() => {
  if (!careerData.value) return []

  return [
    { id: 'overview', title: 'Overview', icon: 'info', data: careerData.value.overview, type: 'text' },
    { id: 'pathways', title: 'Study Pathways', icon: 'academic', data: careerData.value.pathways, type: 'list' },
    { id: 'opportunities', title: 'Career Opportunities', icon: 'chart', data: careerData.value.opportunities, type: 'cards' },
    { id: 'skills', title: 'Required Skills', icon: 'skills', data: careerData.value.skills, type: 'badges' },
    { id: 'institutions', title: 'Recommended Institutions', icon: 'institution', data: careerData.value.institutions, type: 'list' },
    { id: 'advice', title: 'Career Advice', icon: 'advice', data: careerData.value.advice, type: 'text' },
  ]
})

onMounted(() => {
  if (route.query.q) {
    query.value = route.query.q
    hasSearched.value = true
  }
  setTimeout(() => { isLoading.value = false }, 800)
})

function handleSearch(e) {
  e.preventDefault()
  if (!query.value.trim()) return
  hasSearched.value = true
  isLoading.value = true
  router.replace({ query: { q: query.value.trim() } })
  setTimeout(() => { isLoading.value = false }, 600)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <form @submit="handleSearch" class="max-w-3xl mx-auto mb-8 lg:mb-12">
        <div class="relative group">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="query"
            type="text"
            placeholder="Search careers, courses, or programs..."
            class="w-full pl-12 pr-20 py-4 bg-white border-2 border-gray-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 shadow-sm hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
          />
          <button
            type="submit"
            class="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-md shadow-primary-200 transition-all text-sm"
          >
            Search
          </button>
        </div>
      </form>

      <div v-if="isLoading" class="space-y-6">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded-lg w-64 mb-4 dark:bg-gray-700"></div>
          <div class="h-4 bg-gray-100 rounded w-full mb-2 dark:bg-gray-700"></div>
          <div class="h-4 bg-gray-100 rounded w-3/4 mb-2 dark:bg-gray-700"></div>
          <div class="h-4 bg-gray-100 rounded w-1/2 dark:bg-gray-700"></div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="animate-pulse">
            <div class="bg-gray-100 rounded-2xl h-32 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>

      <div v-else-if="!hasSearched" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-100">Search Careers & Programs</h2>
        <p class="text-gray-500 max-w-md mx-auto dark:text-gray-400">
          Enter a career, course, or program above to get detailed information about pathways, opportunities, and requirements.
        </p>
        <div class="flex flex-wrap gap-2 justify-center mt-6">
          <button
            @click="query = 'MPC'; handleSearch($event)"
            class="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
          >
            MPC Combination
          </button>
          <button
            @click="query = 'Cybersecurity'; handleSearch($event)"
            class="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
          >
            Cybersecurity
          </button>
          <button
            @click="query = 'Software Development'; handleSearch($event)"
            class="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
          >
            Software Development
          </button>
          <button
            @click="query = 'TVET programs'; handleSearch($event)"
            class="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
          >
            TVET Programs
          </button>
          <button
            @click="query = 'Accounting'; handleSearch($event)"
            class="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
          >
            Accounting
          </button>
          <button
            @click="query = 'Civil Engineering'; handleSearch($event)"
            class="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-xl text-sm transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400"
          >
            Civil Engineering
          </button>
        </div>
      </div>

      <div v-else-if="!careerData" class="text-center py-16 animate-fade-in">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800">
          <svg class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-100">No Results Found</h2>
        <p class="text-gray-500 max-w-md mx-auto mb-6 dark:text-gray-400">
          We couldn't find information for "{{ route.query.q }}". Try searching for something like "MPC", "Software Development", "Cybersecurity", "Accounting", or "Culinary Arts".
        </p>
        <button
          @click="query = ''; hasSearched = false"
          class="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all"
        >
          Try Again
        </button>
      </div>

      <div v-else class="animate-fade-in">
        <div class="mb-8">
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 dark:text-gray-100">{{ careerData.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400">Comprehensive career information and guidance</p>
        </div>

        <div class="space-y-8">
          <div v-for="section in sections" :key="section.id" class="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center dark:from-primary-900/40 dark:to-primary-800/30">
                <svg v-if="section.icon === 'info'" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <svg v-else-if="section.icon === 'academic'" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 21V9l8-5 8 5v12"/><path d="M4 21h16"/><path d="M12 21v-8"/><path d="M8 13h8"/><path d="M10 9l2-2 2 2"/>
                </svg>
                <svg v-else-if="section.icon === 'chart'" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
                <svg v-else-if="section.icon === 'skills'" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <svg v-else-if="section.icon === 'institution'" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/>
                </svg>
                <svg v-else-if="section.icon === 'advice'" class="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ section.title }}</h2>
            </div>

            <p v-if="section.type === 'text'" class="text-gray-600 leading-relaxed dark:text-gray-300">{{ section.data }}</p>

            <div v-else-if="section.type === 'list'" class="space-y-4">
              <div v-for="(item, i) in section.data" :key="i" class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50/50 transition-colors dark:bg-gray-800 dark:hover:bg-primary-900/20">
                <div v-if="section.icon === 'academic'" class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {{ i + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 dark:text-gray-100">{{ item.title || item }}</p>
                  <p v-if="item.type || item.duration" class="text-sm text-gray-500 mt-0.5 dark:text-gray-400">
                    <span v-if="item.type" class="inline-flex items-center gap-1">
                      <span class="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium dark:bg-primary-900/40 dark:text-primary-300">{{ item.type }}</span>
                    </span>
                    <span v-if="item.duration" class="ml-2">{{ item.duration }}</span>
                  </p>
                  <p v-if="item.description" class="text-sm text-gray-500 mt-1 dark:text-gray-400">{{ item.description }}</p>
                </div>
              </div>
            </div>

            <div v-else-if="section.type === 'cards'" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(item, i) in section.data" :key="i" class="p-4 bg-gray-50 rounded-xl hover:bg-primary-50/50 transition-colors dark:bg-gray-800 dark:hover:bg-primary-900/20">
                <p class="font-semibold text-gray-900 text-sm mb-2 dark:text-gray-100">{{ item.title }}</p>
                <p class="text-primary-700 font-bold text-lg dark:text-primary-400">{{ item.salary }}</p>
                <p class="text-emerald-600 text-xs font-medium mt-1 dark:text-emerald-400">{{ item.growth }} growth</p>
              </div>
            </div>

            <div v-else-if="section.type === 'badges'" class="flex flex-wrap gap-2">
              <span v-for="(skill, i) in section.data" :key="i" class="px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 rounded-xl text-sm font-medium border border-primary-100 hover:shadow-sm transition-all dark:from-primary-900/40 dark:to-primary-800/30 dark:text-primary-300 dark:border-primary-800">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 p-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white text-center">
          <h3 class="text-xl font-bold mb-2">Ready to Take the Next Step?</h3>
          <p class="text-purple-100 mb-4">Get personalized guidance from our AI Career Counselor</p>
          <router-link
            to="/assistant"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg transition-all"
          >
            Ask AI Counselor
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
