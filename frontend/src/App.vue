<script setup>
import { ref, watch, onMounted, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const isDark = ref(false)

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('mycareer-theme', isDark.value ? 'dark' : 'light')
  applyTheme(isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('mycareer-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved ? saved === 'dark' : prefersDark
  applyTheme(isDark.value)
})

provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Navbar />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
