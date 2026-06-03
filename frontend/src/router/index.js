import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchResults from '../views/SearchResults.vue'
import AIAssistant from '../views/AIAssistant.vue'
import About from '../views/About.vue'
import Team from '../views/Team.vue'
import Contact from '../views/Contact.vue'
import FAQ from '../views/FAQ.vue'
import Privacy from '../views/Privacy.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchResults', component: SearchResults },
  { path: '/assistant', name: 'AIAssistant', component: AIAssistant },
  { path: '/about', name: 'About', component: About },
  { path: '/team', name: 'Team', component: Team },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/faq', name: 'FAQ', component: FAQ },
  { path: '/privacy', name: 'Privacy', component: Privacy },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
