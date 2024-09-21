import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Remove the Express-related imports and type declarations as they're not needed in a Next.js app

const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error signing in with email:', error)
    return null
  }

  return data
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error signing up with email:', error)
    return null
  }

  return data
}

export async function getSession() {
  const supabase = createClientComponentClient()
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createClientComponentClient()
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single()
    return userDetails
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getSubscription() {
  const supabase = createClientComponentClient()
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError()
    return subscription
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// Remove the authMiddleware function as it's not typically used in Next.js apps