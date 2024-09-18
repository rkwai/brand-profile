import { createClient } from '@supabase/supabase-js'
import { AnthropicAPI } from './ai'
import { authMiddleware } from './auth'
import { Request, Response } from 'express'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)
const anthropic = new AnthropicAPI(process.env.ANTHROPIC_API_KEY!)

// API endpoint for handling onboarding
export async function handleOnboarding(req: Request, res: Response) {
  authMiddleware(req, res, async () => {
    // Implementation for onboarding logic
    // ...
  })
}

// API endpoint for generating voice profile
export async function generateVoiceProfile(req: Request, res: Response) {
  authMiddleware(req, res, async () => {
    const { contentPillars, uvp } = req.body
    const voiceProfile = await anthropic.generateVoiceProfile(contentPillars, uvp)
    await supabase.from('voice_profiles').insert({ user_id: (req.user as any).id, profile: voiceProfile })
    res.json({ voiceProfile })
  })
}

// API endpoint for generating post
export async function generatePost(req: Request, res: Response) {
  authMiddleware(req, res, async () => {
    const { notes, voiceProfile } = req.body
    const post = await anthropic.generatePost(notes, voiceProfile)
    await supabase.from('posts').insert({ user_id: (req.user as any).id, content: post })
    res.json({ post })
  })
}

// API endpoint for saving data to Supabase
export async function saveData(req: Request, res: Response) {
  authMiddleware(req, res, async () => {
    const { table, data } = req.body
    const { data: savedData, error } = await supabase.from(table).insert(data)
    if (error) {
      res.status(400).json({ error: error.message })
    } else {
      res.json({ data: savedData })
    }
  })
}