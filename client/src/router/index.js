import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Boards from '../pages/Boards.vue'
import Program from '../pages/Program.vue'
import Speakers from '../pages/Speakers.vue'
import Registration from '../pages/Registration.vue'
import PaperRules from '../pages/PaperRules.vue'
import Contact from '../pages/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/kurullar', component: Boards },
  { path: '/program', component: Program },
  { path: '/program/konusmacilar', component: Speakers },
  { path: '/kayit', component: Registration },
  { path: '/bildiri-kurallari', component: PaperRules },
  { path: '/iletisim', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router