<script setup>
const sections = [
  {
    id: 'collection',
    title: 'Data Collection',
    icon: 'database',
    content: 'MyCareer collects minimal data necessary to provide personalized career guidance. This includes information you voluntarily provide such as your academic background, subjects, interests, and career preferences. We also collect anonymous usage data to improve our platform experience.\n\nWe do not collect sensitive personal information unless explicitly required and with your consent. All data collection complies with applicable data protection regulations including the Nigeria Data Protection Regulation (NDPR).',
  },
  {
    id: 'privacy',
    title: 'User Privacy',
    icon: 'lock',
    content: 'Your privacy is our priority. MyCareer implements strict privacy controls to ensure your personal information remains confidential. We never share your personal data with third parties for marketing purposes.\n\nYou have the right to access, modify, or delete your personal information at any time. We provide transparent privacy settings and clear explanations of how your data is used throughout the platform.',
  },
  {
    id: 'ai',
    title: 'AI Usage Policy',
    icon: 'cpu',
    content: 'MyCareer uses artificial intelligence to analyze career queries and generate personalized recommendations. Our AI models process your queries in real-time to provide relevant, accurate guidance.\n\nImportant notes about our AI usage:\n\n• AI conversations are processed securely and are not used to train external models\n• Your queries are analyzed only for the purpose of providing career recommendations\n• We regularly audit our AI systems to ensure fairness and reduce bias\n• AI recommendations are suggestions and should be verified with professional career counselors\n• We maintain human oversight of AI-generated content to ensure quality and accuracy',
  },
  {
    id: 'security',
    title: 'Security Measures',
    icon: 'shield',
    content: 'MyCareer employs industry-standard security measures to protect your data. This includes encryption in transit (TLS 1.3) and at rest, regular security audits, and strict access controls.\n\nOur security practices include:\n\n• End-to-end encryption for sensitive data\n• Regular penetration testing and vulnerability assessments\n• Employee security training and access controls\n• Incident response procedures\n• Compliance with international security standards\n\nWe continuously monitor and update our security infrastructure to address emerging threats.',
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: 'mail',
    content: 'If you have questions about this privacy policy or how we handle your data, please contact our Data Protection Officer:\n\nEmail: privacy@mycareer.edu\nPhone: +234 800 123 4567\nAddress: 42 Innovation Drive, Lagos, Nigeria\n\nWe aim to respond to all privacy inquiries within 48 hours. For data deletion requests, we process requests within 30 days as required by applicable regulations.',
  },
]

const lastUpdated = 'June 2, 2026'
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Privacy Policy
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in-up">
          Privacy
          <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">Policy</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
          Last updated: {{ lastUpdated }}
        </p>
      </div>
    </section>

    <section class="py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-gray max-w-none">
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 lg:p-8 border border-primary-100 mb-8 dark:from-gray-800 dark:to-gray-900 dark:border-primary-900">
            <p class="text-gray-600 leading-relaxed text-lg">
              At MyCareer, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you use our platform.
            </p>
          </div>

          <div class="space-y-6">
            <div
              v-for="(section, idx) in sections"
              :key="section.id"
              class="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-primary-900/20"
              :class="`animate-fade-in-up stagger-${Math.min(idx + 1, 4)}`"
            >
              <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <svg v-if="section.icon === 'database'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                  <svg v-else-if="section.icon === 'lock'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <svg v-else-if="section.icon === 'cpu'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
                  </svg>
                  <svg v-else-if="section.icon === 'shield'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <svg v-else-if="section.icon === 'mail'" class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900">{{ section.title }}</h2>
              </div>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ section.content }}
              </div>
            </div>
          </div>

          <div class="mt-10 bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Policy Updates</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will notify users of any material changes through the platform or via email. We encourage you to review this policy periodically.
            </p>
            <p class="text-sm text-gray-500">
              Last updated: {{ lastUpdated }}
            </p>
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
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted by Students Everywhere</h2>
        <p class="text-lg text-purple-100 mb-8 max-w-xl mx-auto">
          Your privacy and security are at the core of everything we do. Explore MyCareer with confidence.
        </p>
        <router-link
          to="/search"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-purple-50 shadow-lg shadow-primary-900/20 transition-all"
        >
          Start Exploring
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </router-link>
      </div>
    </section>
  </div>
</template>
