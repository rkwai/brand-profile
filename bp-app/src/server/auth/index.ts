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

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
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
    res.status(401).json({ error: 'Invalid token' })
  }
}