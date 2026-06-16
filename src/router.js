import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import MusicView from './views/MusicView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/music',
            name: 'music',
            component: MusicView,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            const nav = document.querySelector('.site-nav')
            const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0

            return {
                el: to.hash,
                top: navHeight + 20,
                behavior: 'smooth',
            }
        }

        return {
            top: 0,
        }
    },
})

export default router
