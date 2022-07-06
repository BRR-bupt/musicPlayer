import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
// import { createWebHistory } from 'vue-router'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router/index'

import './styles/main.css'
import 'uno.css'
import '@unocss/reset/tailwind.css'

// const router = createRouter(createWebHistory())

const app = createApp(App)

app.use(router)
// app.use(ElementPlus, { size: 'large', zIndex: 3000 })
app.use(createPinia())
app.use(VueLazyload)

app.mount('#app')

// createApp(App).use(router).use(ElementPlus, { size: 'large', zIndex: 3000 }).use(createPinia()).mount('#app')
