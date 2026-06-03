<script setup>
const teamMembers = [
  {
    name: 'IRANZI SANGWA Arnaud',
    role: 'Project Lead',
    initials: 'IS',
    color: 'from-primary-500 to-purple-600',
    description: 'Visionary leader driving the project forward with expertise in full-stack development and a passion for leveraging technology to solve real-world problems.',
    website: 'https://arnaud-00.netlify.app/',
  },
  {
    name: 'Muganwa Elie',
    role: 'Backend Developer',
    initials: 'ME',
    color: 'from-blue-500 to-indigo-600',
    description: 'Skilled backend developer focused on building scalable APIs and robust server-side architecture to power the platform\'s features.',
  },
  {
    name: 'Shyaka Tresor',
    role: 'Frontend Developer',
    initials: 'ST',
    color: 'from-emerald-500 to-teal-600',
    description: 'Talented frontend developer crafting intuitive, responsive user interfaces with modern frameworks for a seamless user experience.',
  },
  {
    name: 'Abakundanye Bruno',
    role: 'UI/UX Designer',
    initials: 'AB',
    color: 'from-amber-500 to-orange-600',
    description: 'Creative designer dedicated to crafting beautiful, accessible interfaces that make career discovery intuitive and engaging for every user.',
  },
  {
    name: 'Gakuba Landry',
    role: 'AI & Data Engineer',
    initials: 'GL',
    color: 'from-rose-500 to-pink-600',
    description: 'Data-driven engineer specializing in AI integration and data pipelines that power personalized career recommendations and insights.',
  },
]

const stats = [
  { value: '10K+', label: 'Active Students', icon: 'users' },
  { value: '500+', label: 'Career Paths', icon: 'paths' },
  { value: '200+', label: 'Partner Institutions', icon: 'institutions' },
  { value: '98%', label: 'Satisfaction Rate', icon: 'satisfaction' },
]
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Our Team
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in-up">
          Meet Our
          <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">Team</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
          The passionate people behind MyCareer, dedicated to empowering students with AI-driven career guidance.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          <div
            v-for="(member, idx) in teamMembers"
            :key="member.name"
            class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
            :class="`animate-fade-in-up stagger-${idx + 1}`"
          >
            <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300" :class="member.color">
              <span class="text-2xl font-bold text-white">{{ member.initials }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-0.5">{{ member.name }}</h3>
            <p class="text-sm font-medium text-primary-600 mb-3">{{ member.role }}</p>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ member.description }}</p>
            <div class="flex justify-center gap-2">
              <a v-if="member.website" :href="member.website" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors dark:bg-gray-700 dark:hover:bg-primary-900/30 dark:text-gray-500 dark:hover:text-primary-400" title="Website">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors dark:bg-gray-700 dark:hover:bg-primary-900/30 dark:text-gray-500 dark:hover:text-primary-400">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            class="bg-white rounded-2xl p-6 lg:p-8 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
            :class="`animate-fade-in-up stagger-${idx + 1}`"
          >
            <div class="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center">
              <svg v-if="stat.icon === 'users'" class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <svg v-else-if="stat.icon === 'paths'" class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <svg v-else-if="stat.icon === 'institutions'" class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/>
              </svg>
              <svg v-else-if="stat.icon === 'satisfaction'" class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">{{ stat.value }}</p>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
          </div>
        </div>

        <div class="max-w-3xl mx-auto bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-700">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-200">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p class="text-gray-600 leading-relaxed text-lg">
                We believe every student deserves access to personalized career guidance. Our team combines expertise in education, technology, and AI to build a platform that democratizes career discovery and empowers the next generation of professionals across Africa and beyond.
              </p>
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
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Join Us in Shaping Futures</h2>
        <p class="text-lg text-purple-100 mb-8 max-w-xl mx-auto">
          We're always looking for passionate individuals to join our mission. Explore career opportunities with MyCareer.
        </p>
        <a
          href="#"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg shadow-primary-900/20 transition-all"
        >
          View Open Positions
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  </div>
</template>
