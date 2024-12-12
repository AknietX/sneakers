import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

app.use(autoAnimatePlugin)
app.mount('#app')
