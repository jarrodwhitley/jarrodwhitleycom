import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import emailjs from '@emailjs/browser'
import VueAxios from 'vue-axios'
import router from './router'

const EMAILJS_PUBLIC_KEY = String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim()

if (EMAILJS_PUBLIC_KEY) {
	emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
}

// Create and mount the app
const app = createApp(App).use(VueAxios, axios).use(router)
app.mount('#app')