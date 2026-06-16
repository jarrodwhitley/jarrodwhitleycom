import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

// Create and mount the app
const app = createApp(App).use(VueAxios, axios).use(router)
app.mount('#app')