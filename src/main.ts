import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import './index.css'

import { supabase } from './lib/supabase'
import { userSession } from '@/lib/useAuth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
/**
 * Realiza un seguimiento de si el usuario ha iniciado o no sesión 
 * y actualizará el estado de la sesión de usuario en consecuencia. 
 */
 supabase.auth.onAuthStateChange((event, session) => {
    userSession.value = session
    })