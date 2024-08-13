import { createApp } from 'vue'
import './style.css'
import router from './router'
import i18n from './i18n/i18n';
import App from './App.vue'

// 引入 Bootstrap 的 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App)
.use(router)
.use(i18n)
.mount('#app')
