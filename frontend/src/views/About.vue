<script setup>
const timeline = [
  { year: '2024', title: 'Idea & Research', description: 'Identified the gap in career guidance for African students. Conducted extensive research with students, educators, and career counselors.' },
  { year: '2025', title: 'Platform Development', description: 'Built the first version of MyCareer with AI-powered recommendations and comprehensive career database.' },
  { year: '2026', title: 'Launch & Growth', description: 'Official launch with thousands of students using the platform. Expanded to cover 500+ career paths and 200+ institutions.' },
  { year: '2027', title: 'AI Enhancement', description: 'Advanced AI capabilities including personalized learning recommendations, mentorship matching, and industry partnership integration.' },
]

const benefits = [
  {
    icon: 'compass',
    title: 'Clear Direction',
    description: 'Stop feeling lost about your future. Get a clear, actionable roadmap from where you are now to your dream career.',
    color: 'from-primary-500 to-purple-600',
  },
  {
    icon: 'bulb',
    title: 'Informed Decisions',
    description: 'Make confident choices about subjects, courses, and institutions with comprehensive data and AI-powered insights.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: 'chart',
    title: 'Market-Ready Skills',
    description: 'Identify the skills employers are looking for and get recommendations on how to acquire them through the best channels.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: 'connect',
    title: 'Opportunity Discovery',
    description: 'Discover career paths and educational opportunities you never knew existed, from TVET programs to international scholarships.',
    color: 'from-amber-500 to-orange-600',
  },
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
            <path d="M4 21V9l8-5 8 5v12"/><path d="M4 21h16"/><path d="M12 21v-8"/><path d="M8 13h8"/><path d="M10 9l2-2 2 2"/>
          </svg>
          About MyCareer
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
          Empowering Students to
          <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">Shape Their Future</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
          MyCareer was created to bridge the gap between students and the information they need to make informed decisions about their education and career paths.
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 lg:p-10 border border-primary-100 animate-fade-in-up dark:from-gray-800 dark:to-gray-900 dark:border-primary-900">
            <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-primary-200">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p class="text-gray-600 leading-relaxed text-lg">
              To democratize career guidance by providing every student with access to personalized, AI-powered career recommendations that help them discover pathways they never knew existed.
            </p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 lg:p-10 border border-blue-100 animate-fade-in-up stagger-1 dark:from-gray-800 dark:to-gray-900 dark:border-blue-900">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-200">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p class="text-gray-600 leading-relaxed text-lg">
              A world where every student, regardless of background, has the tools and knowledge to pursue a fulfilling career that matches their unique talents and aspirations.
            </p>
          </div>
        </div>

        <div class="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Why We Created MyCareer</h2>
          <div class="space-y-4 text-left">
            <p class="text-gray-600 leading-relaxed text-lg">
              Every year, millions of students complete secondary school with little to no guidance about their next steps. They choose subjects, courses, and institutions based on limited information, peer pressure, or family expectations — often discovering too late that the path they chose doesn't align with their true interests or the job market.
            </p>
            <p class="text-gray-600 leading-relaxed text-lg">
              MyCareer was born from a simple belief: <strong class="text-gray-900">every student deserves access to personalized career guidance</strong> that considers their unique strengths, interests, and circumstances. We combine the power of AI with comprehensive data about careers, educational programs, and skill requirements to provide students with recommendations that can genuinely transform their lives.
            </p>
            <p class="text-gray-600 leading-relaxed text-lg">
              Whether you're a secondary school student choosing your SSCE subjects, an A'Level student deciding on a university program, or a TVET student exploring certification options — MyCareer is here to help you make informed decisions about your future.
            </p>
          </div>
        </div>

        <div class="mb-16 lg:mb-20">
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">Benefits for Students</h2>
          <div class="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <div
              v-for="(benefit, idx) in benefits"
              :key="benefit.title"
              class="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl hover:bg-primary-50/50 transition-colors dark:bg-gray-800 dark:hover:bg-primary-900/20"
              :class="`animate-fade-in-up stagger-${idx + 1}`"
            >
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm" :class="benefit.color">
                <svg v-if="benefit.icon === 'compass'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
                <svg v-else-if="benefit.icon === 'bulb'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
                </svg>
                <svg v-else-if="benefit.icon === 'chart'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
                <svg v-else-if="benefit.icon === 'connect'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1.5">{{ benefit.title }}</h3>
                <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">Our Roadmap</h2>
          <div class="relative">
            <div class="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"></div>
            <div class="space-y-8 lg:space-y-12">
              <div
                v-for="(item, idx) in timeline"
                :key="item.year"
                class="relative"
                :class="`animate-fade-in-up stagger-${idx + 1}`"
              >
                <div class="md:flex items-center gap-8 lg:gap-12" :class="idx % 2 === 0 ? '' : 'md:flex-row-reverse'">
                  <div class="hidden md:block w-1/2" :class="idx % 2 === 0 ? 'text-right' : 'text-left'">
                    <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm inline-block text-left max-w-md dark:bg-gray-900 dark:border-gray-700">
                      <h3 class="text-lg font-bold text-gray-900 mb-1">{{ item.title }}</h3>
                      <p class="text-sm text-gray-500">{{ item.description }}</p>
                    </div>
                  </div>
                  <div class="hidden md:flex items-center justify-center w-12 shrink-0">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-200 relative z-10">
                      {{ item.year.slice(-2) }}
                    </div>
                  </div>
                  <div class="md:hidden flex items-start gap-4">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
                      {{ item.year.slice(-2) }}
                    </div>
                    <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex-1 dark:bg-gray-900 dark:border-gray-700">
                      <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">{{ item.year }}</span>
                      <h3 class="text-lg font-bold text-gray-900 mt-1 mb-1">{{ item.title }}</h3>
                      <p class="text-sm text-gray-500">{{ item.description }}</p>
                    </div>
                  </div>
                  <div class="hidden md:block w-1/2"></div>
                </div>
              </div>
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
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Discover Your Path?</h2>
        <p class="text-lg text-purple-100 mb-8 max-w-xl mx-auto">
          Join thousands of students who are using MyCareer to make informed decisions about their future.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/search"
            class="px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg shadow-primary-900/20 transition-all"
          >
            Explore Careers
          </router-link>
          <router-link
            to="/assistant"
            class="px-8 py-3.5 bg-primary-800/50 text-white font-semibold rounded-xl border border-white/20 hover:bg-primary-800/70 transition-all"
          >
            Ask AI Assistant
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
