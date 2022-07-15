import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
 "https://jzpjoyidrmtqxwvhsttg.supabase.co" as string,
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6cGpveWlkcm10cXh3dmhzdHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1MjYyNTUsImV4cCI6MTk3MzEwMjI1NX0.zkg6RL-V9HqvW9Fsqg0CRXrtxfPH4DKd8JiZA5XaftY" as string,
)