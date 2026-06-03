<script setup>
const footerLinks = {
  Platform: [
    { label: 'Career Search', path: '/search' },
    { label: 'AI Assistant', path: '/assistant' },
    { label: 'About', path: '/about' },
  ],
  Company: [
    { label: 'Our Team', path: '/team' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQs', path: '/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '#' },
  ],
}
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        <div class="col-span-2 md:col-span-1">
          <router-link to="/" class="flex items-center gap-2.5 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 21V9l8-5 8 5v12"/><path d="M4 21h16"/><path d="M12 21v-8"/><path d="M8 13h8"/><path d="M10 9l2-2 2 2"/>
              </svg>
            </div>
            <span class="text-lg font-bold text-white">MyCareer</span>
          </router-link>
          <p class="text-sm text-gray-400 leading-relaxed mb-4">
            AI-powered career guidance platform helping students discover their perfect educational and professional pathway.
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors dark:bg-gray-700 dark:hover:bg-primary-600">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
        </div>

        <div v-for="(links, title) in footerLinks" :key="title">
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{{ title }}</h3>
          <ul class="space-y-2.5">
            <li v-for="link in links" :key="link.label">
              <router-link
                v-if="link.path.startsWith('/')"
                :to="link.path"
                class="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {{ link.label }}
              </router-link>
              <a
                v-else
                :href="link.path"
                class="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-500">&copy; 2026 MyCareer. All rights reserved.</p>
        <p class="text-sm text-gray-500">
          Empowering students with AI-driven career guidance
        </p>
      </div>
    </div>
  </footer>
</template>
