import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'
import BirdleContainer from './components/BirdleContainer.vue'

const routes = [
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: '/', component: Home },
    { path: '/birdle', component: BirdleContainer },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router