import type { NextApiRequest, NextApiResponse } from 'next'
import { AnthropicAPI } from '@/src/server/ai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { voiceProfile, postNotes } = req.body

      const anthropic = new AnthropicAPI();
      const generatedPost = await anthropic.generatePost(postNotes, voiceProfile);

      res.status(200).json({ generatedPost })
    } catch (error) {
      console.error('Error generating post:', error);
      res.status(500).json({ error: 'Error generating post' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}