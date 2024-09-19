import type { NextApiRequest, NextApiResponse } from 'next'
import { AnthropicAPI } from '@/src/server/ai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { contentPillars, uvp } = req.body

      const anthropic = new AnthropicAPI()
      const voiceProfile = await anthropic.generateVoiceProfile(contentPillars, uvp)

      res.status(200).json({ voiceProfile })
    } catch (error) {
      console.error('Error generating voice profile:', error)
      res.status(500).json({ error: 'Error generating voice profile' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}