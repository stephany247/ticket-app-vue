import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// createApp(App).mount('#app')
const app = createApp(App)
app.use(createPinia())

// Tell Vue to use the router
app.use(router)

// Mount the app to index.html
app.mount('#app')
