import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verifyConnection() {
  console.log('Connecting to Supabase...')
  
  // Try to fetch one category to verify connection
  const { data, error } = await supabase
    .from('challenge_categories')
    .select('name')
    .limit(1)

  if (error) {
    console.error('Connection failed:', error.message)
    process.exit(1)
  } else {
    console.log('Connected successfully! Found data:', data)
  }
}

verifyConnection()
