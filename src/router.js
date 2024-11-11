import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'
import Birdle from './components/Birdle.vue'

const routes = [
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: '/', component: Home },
    { path: '/birdle', component: Birdle },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router