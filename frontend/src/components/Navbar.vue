<script setup>
import { ref, watch, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isDark = inject('isDark')
const toggleDark = inject('toggleDark')

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isMoreOpen = ref(false)
const searchQuery = ref('')

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/search', label: 'Career Search' },
  { path: '/assistant', label: 'AI Assistant' },
  { path: '/about', label: 'About' },
]

const moreLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/team', label: 'Our Team', icon: 'users' },
  { path: '/contact', label: 'Contact Us', icon: 'mail' },
  { path: '/faq', label: 'FAQs', icon: 'help' },
  { path: '/privacy', label: 'Privacy Policy', icon: 'shield' },
]

const isMoreActive = computed(() =>
  moreLinks.some(l => route.path === l.path)
)

watch(() => route.path, () => {
  isMenuOpen.value = false
  isMoreOpen.value = false
})

function handleSearch(e) {
  e.preventDefault()
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    isMenuOpen.value = false
  }
}

function handleMoreKeydown(e) {
  if (e.key === 'Escape') isMoreOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80 dark:bg-gray-950/80 dark:border-gray-800/80" @keydown="handleMoreKeydown">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md shadow-primary-200 group-hover:shadow-lg group-hover:shadow-primary-300 transition-all duration-300">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 21V9l8-5 8 5v12" />
              <path d="M4 21h16" />
              <path d="M12 21v-8" />
              <path d="M8 13h8" />
              <path d="M10 9l2-2 2 2" />
            </svg>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">MyCareer</span>
        </router-link>

        <div class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            :class="route.path === link.path
              ? 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'"
          >
            {{ link.label }}
          </router-link>

          <div class="relative" @mouseenter="isMoreOpen = true" @mouseleave="isMoreOpen = false">
            <button
              class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              :class="isMoreActive
                ? 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'"
              @click="isMoreOpen = !isMoreOpen"
              aria-haspopup="true"
              :aria-expanded="isMoreOpen"
            >
              More
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isMoreOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              leave-active-class="transition-all duration-150 ease-in"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="isMoreOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-black/5 border border-gray-100 py-2 overflow-hidden dark:bg-gray-900 dark:border-gray-700"
                @mouseenter="isMoreOpen = true"
                @mouseleave="isMoreOpen = false"
              >
                <router-link
                  v-for="link in moreLinks"
                  :key="link.path"
                  :to="link.path"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-colors dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/30"
                  :class="{ 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30': route.path === link.path }"
                >
                  <svg v-if="link.icon === 'dashboard'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  <svg v-else-if="link.icon === 'users'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <svg v-else-if="link.icon === 'mail'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <svg v-else-if="link.icon === 'help'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <svg v-else-if="link.icon === 'shield'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  {{ link.label }}
                </router-link>
              </div>
            </transition>
          </div>
        </div>

        <div class="hidden lg:flex items-center gap-3">
          <form @submit="handleSearch" class="relative group/search">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within/search:text-primary-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search careers..."
              class="w-56 pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
            />
          </form>
          <button
            @click="toggleDark"
            class="p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="!isDark" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </button>
          <router-link
            to="/assistant"
            class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-700 hover:to-primary-800 shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300 transition-all duration-200"
          >
            Ask AI
          </router-link>
        </div>

        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMenuOpen" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>

    <transition
      enter-from-class="opacity-0 -translate-y-4"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/95">
        <div class="px-4 py-4 space-y-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
            :class="route.path === link.path
              ? 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'"
          >
            {{ link.label }}
          </router-link>

          <div class="pt-2 pb-1">
            <p class="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider dark:text-gray-500">More</p>
            <router-link
              v-for="link in moreLinks"
              :key="link.path"
              :to="link.path"
              class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
              :class="route.path === link.path
                ? 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'"
            >
              {{ link.label }}
            </router-link>
          </div>

          <hr class="my-3 border-gray-100 dark:border-gray-800" />
          <form @submit="handleSearch">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search careers..."
                class="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
              />
            </div>
          </form>
          <router-link
            to="/assistant"
            class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg mt-2"
          >
            Ask AI Assistant
          </router-link>
          <button
            @click="toggleDark"
            class="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
          >
            <svg v-if="!isDark" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>
