import { createApp } from 'vue'
import './style.scss'
// import './assets/js/all.min.js';
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App).use(VueAxios, axios)
app.mount('#app')

// test

