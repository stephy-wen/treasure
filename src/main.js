import { createApp } from 'vue'
import './style.css'
import router from './router'
import i18n from './i18n/i18n';
import App from './App.vue'

createApp(App)
.use(router)
.use(i18n)
.mount('#app')
