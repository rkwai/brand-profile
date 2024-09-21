import { createClient } from '@supabase/supabase-js'
import { Request, Response, NextFunction } from 'express'
import { User } from '@supabase/supabase-js'

// Add this type declaration
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error) throw error
    if (!user) throw new Error('User not found')
    req.user = user
    next()
  } catch (error) {
    console.error('Error in authMiddleware:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    console.error('Error signing in with Google:', error)
    return null
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
  }
}