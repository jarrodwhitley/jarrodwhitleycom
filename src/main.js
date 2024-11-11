import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Create and mount the app
const app = createApp(App).use(VueAxios, axios)
app.use(router)
app.mount('#app')