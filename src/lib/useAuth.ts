import { ref } from 'vue'
import type { Session } from '@supabase/gotrue-js/dist/main/lib/types'

const userSession = ref<Session | null>(null)

export {
  userSession,
}