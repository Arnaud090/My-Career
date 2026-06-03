<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

const contactInfo = [
  {
    icon: 'phone',
    label: 'Phone',
    value: '+234 800 123 4567',
    href: 'tel:+2348001234567',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'hello@mycareer.edu',
    href: 'mailto:hello@mycareer.edu',
  },
  {
    icon: 'location',
    label: 'Office',
    value: '42 Innovation Drive, Lagos, Nigeria',
    href: '#',
  },
]

const faqLinks = [
  { q: 'What is MyCareer?', to: '/faq' },
  { q: 'How does the AI work?', to: '/faq' },
  { q: 'Is MyCareer free?', to: '/faq' },
  { q: 'Which careers are supported?', to: '/faq' },
]

function handleSubmit() {
  submitted.value = true
  form.value = { name: '', email: '', subject: '', message: '' }
  setTimeout(() => { submitted.value = false }, 4000)
}
</script>

<template>
  <div>
    <section class="relative bg-gradient-to-b from-primary-50/80 via-white to-white pt-16 pb-12 lg:pt-20 lg:pb-16 overflow-hidden dark:from-gray-900/80 dark:via-gray-950 dark:to-gray-950">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100/80 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
          Contact Us
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in-up">
          Get in
          <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
          Have a question, suggestion, or want to partner with us? We'd love to hear from you.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div class="animate-fade-in-up">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1.5 dark:text-gray-300">Full Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Your full name"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
                  />
                </div>
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-primary-900"
                />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Tell us more about your inquiry..."
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-md shadow-primary-200 hover:shadow-lg transition-all duration-200"
              >
                Send Message
              </button>
              <div
                v-if="submitted"
                class="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm animate-fade-in"
              >
                <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Thank you! Your message has been sent successfully.
              </div>
            </form>
          </div>

          <div class="animate-fade-in-up stagger-1">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div class="space-y-5 mb-8">
              <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50/50 transition-colors dark:bg-gray-800 dark:hover:bg-primary-900/20">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shrink-0">
                  <svg v-if="info.icon === 'phone'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <svg v-else-if="info.icon === 'mail'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <svg v-else-if="info.icon === 'location'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">{{ info.label }}</p>
                  <a :href="info.href" class="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">{{ info.value }}</a>
                </div>
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-sm font-semibold text-gray-900 mb-3">Follow Us</h3>
              <div class="flex gap-2">
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary-600 transition-all dark:bg-gray-800 dark:hover:bg-primary-900/30 dark:text-gray-400 dark:hover:text-primary-400">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-900 mb-3">Quick Answers</h3>
              <div class="space-y-2">
                <router-link
                  v-for="faq in faqLinks"
                  :key="faq.q"
                  :to="faq.to"
                  class="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  {{ faq.q }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-700">
          <div class="aspect-[21/9] lg:aspect-[3/1] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div class="text-center relative z-10">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/90 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p class="text-white text-lg font-semibold drop-shadow-sm">MyCareer Headquarters</p>
              <p class="text-white/80 text-sm">42 Innovation Drive, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-16 lg:py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-purple-700"></div>
      <div class="absolute inset-0 opacity-20">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Partnership Opportunities</h2>
        <p class="text-lg text-purple-100 mb-8 max-w-xl mx-auto">
          Interested in partnering with MyCareer? We're always open to collaborations with educational institutions, organizations, and impact-driven brands.
        </p>
        <a
          href="mailto:partnerships@mycareer.edu"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg shadow-primary-900/20 transition-all"
        >
          Become a Partner
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  </div>
</template>
