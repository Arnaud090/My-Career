<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const features = [
  {
    icon: 'sparkles',
    title: 'AI Career Guidance',
    description: 'Get personalized career recommendations powered by advanced AI that analyzes your interests, skills, and academic background.',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: 'academic',
    title: 'University Pathways',
    description: 'Discover university programs, entry requirements, and application guidance tailored to your academic profile and career goals.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: 'tvet',
    title: 'TVET Opportunities',
    description: 'Explore technical and vocational education programs that offer hands-on training and direct pathways to skilled careers.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: 'chart',
    title: 'Skills Recommendations',
    description: 'Identify the skills you need for your dream career with curated learning resources and growth roadmaps.',
    gradient: 'from-amber-500 to-orange-600',
  },
]

const popularCareers = [
  { title: 'Software Developer', growth: '+22%', color: 'from-blue-500 to-indigo-600', icon: 'code' },
  { title: 'Doctor', growth: '+14%', color: 'from-red-500 to-rose-600', icon: 'health' },
  { title: 'Civil Engineer', growth: '+18%', color: 'from-amber-500 to-orange-600', icon: 'building' },
  { title: 'Data Analyst', growth: '+25%', color: 'from-emerald-500 to-teal-600', icon: 'chart' },
  { title: 'Network Engineer', growth: '+16%', color: 'from-cyan-500 to-blue-600', icon: 'network' },
  { title: 'Accountant', growth: '+11%', color: 'from-violet-500 to-purple-600', icon: 'calc' },
]

const steps = [
  {
    step: '01',
    title: 'Enter Your Goal',
    description: 'Tell us your combination, preferred course, or career aspiration. The more detail, the better your recommendations.',
    color: 'from-primary-500 to-purple-600',
  },
  {
    step: '02',
    title: 'AI Analyzes',
    description: 'Our advanced AI engine processes your profile against thousands of career paths, university programs, and skill requirements.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    step: '03',
    title: 'Get Recommendations',
    description: 'Receive a detailed, personalized roadmap with study pathways, career options, skill gaps, and recommended institutions.',
    color: 'from-emerald-500 to-teal-600',
  },
]

const testimonials = [
  {
    name: 'Amara Okafor',
    role: 'University Applicant',
    avatar: 'AO',
    text: 'MyCareer helped me discover Computer Science when I wasn\'t sure what to study after my A\'Levels. The AI recommendations were spot on!',
    rating: 5,
  },
  {
    name: 'Kofi Mensah',
    role: 'TVET Student',
    avatar: 'KM',
    text: 'I never knew TVET could lead to such amazing career paths. MyCareer opened my eyes to opportunities in networking and cybersecurity.',
    rating: 5,
  },
  {
    name: 'Chioma Eze',
    role: 'Secondary School Student',
    avatar: 'CE',
    text: 'The career guidance helped me choose the right subjects for my SSCE. I now have a clear path to becoming a Civil Engineer.',
    rating: 5,
  },
]

function handleSearch(e) {
  e.preventDefault()
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
  }
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-b from-primary-50/80 via-white to-white pt-16 pb-20 lg:pt-24 lg:pb-32 dark:from-gray-900/80 dark:via-gray-950 dark:to-gray-950">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100/80 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              AI-Powered Career Guidance
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
              Discover Your
              <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">Future</span>
              with MyCareer
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up stagger-1">
              AI-powered career guidance for students and future professionals. Explore pathways, discover opportunities, and build your dream career.
            </p>

            <form @submit="handleSearch" class="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0 mb-6 animate-fade-in-up stagger-2">
              <div class="relative flex-1">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="e.g., What can I study with MPC..."
                  class="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all shadow-sm"
                />
              </div>
              <button
                type="submit"
                class="px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all duration-200 active:scale-[0.98]"
              >
                Explore
              </button>
            </form>

            <div class="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-gray-500 animate-fade-in-up stagger-3">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                10,000+ Students
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                500+ Career Paths
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                200+ Universities
              </span>
            </div>
          </div>

          <div class="hidden lg:block relative animate-fade-in-up stagger-3">
            <div class="relative">
              <div class="w-full aspect-square max-w-lg mx-auto">
                <div class="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-[40px] rotate-6 dark:from-primary-600/20 dark:to-purple-600/20"></div>
                <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-[40px] -rotate-3 dark:from-primary-400/10"></div>
                <div class="relative bg-white rounded-[32px] shadow-2xl shadow-primary-200/50 p-8 border border-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-primary-900/30">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-5 text-white">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                        <span class="text-sm font-medium">AI Recommendation</span>
                      </div>
                      <p class="text-lg font-bold leading-tight mb-1">Software Engineer</p>
                      <p class="text-sm text-white/80">96% match based on your profile</p>
                    </div>

                    <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                        <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      </div>
                      <p class="text-xs text-gray-500">University</p>
                      <p class="text-sm font-semibold text-gray-800">Unilag</p>
                    </div>
                    <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-2">
                        <svg class="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                      </div>
                      <p class="text-xs text-gray-500">Skills</p>
                      <p class="text-sm font-semibold text-gray-800">Python, JS</p>
                    </div>
                    <div class="col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <svg class="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        </div>
                        <div>
                          <p class="text-xs text-amber-700 font-medium">Avg. Starting Salary</p>
                          <p class="text-sm font-bold text-amber-900">$65,000 - $95,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-primary-100 rounded-full -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span class="bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and resources to guide you from secondary school to your dream career.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div
            v-for="(feature, idx) in features"
            :key="feature.title"
            class="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
            :class="`animate-fade-in-up stagger-${idx + 1}`"
          >
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110" :class="feature.gradient">
              <svg v-if="feature.icon === 'sparkles'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg v-else-if="feature.icon === 'academic'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 21V9l8-5 8 5v12"/><path d="M4 21h16"/><path d="M12 21v-8"/><path d="M8 13h8"/><path d="M10 9l2-2 2 2"/>
              </svg>
              <svg v-else-if="feature.icon === 'tvet'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
              </svg>
              <svg v-else-if="feature.icon === 'chart'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular
            <span class="bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">Career Paths</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore high-demand careers with strong growth potential and excellent opportunities.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(career, idx) in popularCareers"
            :key="career.title"
            class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
            :class="`animate-fade-in-up stagger-${idx + 1}`"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm" :class="career.color">
                <svg v-if="career.icon === 'code'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
                <svg v-else-if="career.icon === 'health'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <svg v-else-if="career.icon === 'building'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/>
                </svg>
                <svg v-else-if="career.icon === 'chart'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
                <svg v-else-if="career.icon === 'network'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="8" height="8" rx="2"/><rect x="14" y="2" width="8" height="8" rx="2"/><rect x="2" y="14" width="8" height="8" rx="2"/><rect x="14" y="14" width="8" height="8" rx="2"/>
                </svg>
                <svg v-else-if="career.icon === 'calc'" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/>
                </svg>
              </div>
              <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">{{ career.growth }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ career.title }}</h3>
            <p class="text-sm text-gray-500">Projected job growth</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It
            <span class="bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to discover your ideal career path.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              <div class="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 -translate-y-8 dark:from-primary-800 dark:via-primary-700 dark:to-primary-800"></div>
          <div
            v-for="(step, idx) in steps"
            :key="step.step"
            class="relative text-center"
            :class="`animate-fade-in-up stagger-${idx + 1}`"
          >
            <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg relative z-10" :class="step.color">
              <span class="text-2xl font-bold text-white">{{ step.step }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-500 leading-relaxed max-w-xs mx-auto">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Students
            <span class="bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">Say</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who have used MyCareer to shape their future.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(t, idx) in testimonials"
            :key="t.name"
            class="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
            :class="`animate-fade-in-up stagger-${idx + 1}`"
          >
            <div class="flex gap-1 mb-4">
              <svg v-for="i in t.rating" :key="i" class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <p class="text-gray-600 leading-relaxed mb-6 italic">"{{ t.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {{ t.avatar }}
              </div>
              <div>
                <p class="font-semibold text-gray-900 text-sm">{{ t.name }}</p>
                <p class="text-xs text-gray-500">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-16 lg:py-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-purple-700"></div>
      <div class="absolute inset-0 opacity-20">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Start Exploring Your Future Today
        </h2>
        <p class="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already discovered their career path with MyCareer. Your future starts now.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/search"
            class="px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg shadow-primary-900/20 hover:shadow-xl transition-all duration-200"
          >
            Explore Careers
          </router-link>
          <router-link
            to="/assistant"
            class="px-8 py-3.5 bg-primary-800/50 text-white font-semibold rounded-xl border border-white/20 hover:bg-primary-800/70 hover:border-white/30 transition-all duration-200"
          >
            Ask AI Assistant
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
