import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getSession() {
  const supabase = createServerComponentClient({ cookies })
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
  const supabase = createServerComponentClient({ cookies })
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
  const supabase = createServerComponentClient({ cookies })
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