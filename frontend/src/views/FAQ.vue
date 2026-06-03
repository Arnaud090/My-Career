<script setup>
import { ref } from 'vue'

const faqItems = [
  {
    q: 'What is MyCareer?',
    a: 'MyCareer is an AI-powered career guidance platform designed to help students discover educational pathways, university programs, TVET opportunities, career options, and professional skills. It provides personalized recommendations based on your academic background, interests, and career goals.',
    icon: 'info',
  },
  {
    q: 'How does the AI work?',
    a: 'MyCareer uses advanced natural language processing and machine learning algorithms to analyze your queries and profile. It cross-references your input against a comprehensive database of career paths, educational programs, skill requirements, and industry trends to deliver personalized, accurate recommendations tailored to your unique situation.',
    icon: 'sparkles',
  },
  {
    q: 'Is MyCareer free?',
    a: 'Yes! MyCareer is completely free for students. We believe every student deserves access to quality career guidance regardless of their financial situation. Our platform is supported through institutional partnerships and grants, ensuring it remains accessible to all.',
    icon: 'free',
  },
  {
    q: 'Who can use MyCareer?',
    a: 'MyCareer is designed for secondary school students, A\'Level students, TVET students, and university applicants. Whether you\'re choosing your SSCE subjects, deciding on a university program, or exploring vocational training options, MyCareer provides guidance relevant to your stage of education.',
    icon: 'users',
  },
  {
    q: 'Which careers are supported?',
    a: 'MyCareer covers over 500 career paths across diverse industries including technology, healthcare, engineering, finance, education, creative arts, law, agriculture, and more. Our database is continuously updated to reflect emerging careers and changing industry demands.',
    icon: 'briefcase',
  },
  {
    q: 'How accurate are the recommendations?',
    a: 'MyCareer\'s recommendations are based on comprehensive data analysis and continuously improved AI models. While we strive for high accuracy, we recommend using our suggestions as a starting point for your research. Combine our AI insights with guidance from career counselors, teachers, and family for the best results.',
    icon: 'target',
  },
  {
    q: 'Can I save my career searches?',
    a: 'Currently, MyCareer provides real-time search results and AI conversations. We\'re working on a user account feature that will allow you to save your career searches, bookmark favorite pathways, and track your exploration history. This feature will be available in an upcoming update.',
    icon: 'bookmark',
  },
  {
    q: 'How do I contact support?',
    a: 'You can reach us through the Contact page on this website, send an email to hello@mycareer.edu, or call us at +234 800 123 4567. Our support team typically responds within 24 hours during business days.',
    icon: 'support',
  },
]

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
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
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          FAQs
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in-up">
          Frequently Asked
          <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">Questions</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
          Everything you need to know about MyCareer. Can't find what you're looking for? Feel free to contact us.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-4">
          <div
            v-for="(item, idx) in faqItems"
            :key="idx"
            class="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
            :class="`animate-fade-in-up stagger-${Math.min(idx + 1, 4)}`"
          >
            <button
              @click="toggle(idx)"
              class="w-full flex items-center gap-4 px-6 py-5 text-left"
              :aria-expanded="openIndex === idx"
            >
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shrink-0">
                <svg v-if="item.icon === 'info'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <svg v-else-if="item.icon === 'sparkles'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <svg v-else-if="item.icon === 'free'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <svg v-else-if="item.icon === 'users'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
                <svg v-else-if="item.icon === 'briefcase'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <svg v-else-if="item.icon === 'target'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                </svg>
                <svg v-else-if="item.icon === 'bookmark'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                <svg v-else-if="item.icon === 'support'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <span class="flex-1 text-base font-semibold text-gray-900">{{ item.q }}</span>
              <svg
                class="w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0"
                :class="{ 'rotate-180': openIndex === idx }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openIndex === idx" class="overflow-hidden">
                <div class="px-6 pb-5 pt-0">
                  <div class="pl-14">
                    <p class="text-gray-600 leading-relaxed">{{ item.a }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
        <p class="text-gray-600 mb-8 max-w-lg mx-auto">
          Our team is here to help. Reach out and we'll get back to you as soon as possible.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/contact"
            class="px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-md shadow-primary-200 transition-all"
          >
            Contact Us
          </router-link>
          <a
            href="mailto:hello@mycareer.edu"
            class="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-primary-300 hover:text-primary-700 shadow-sm transition-all dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:text-primary-400"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
