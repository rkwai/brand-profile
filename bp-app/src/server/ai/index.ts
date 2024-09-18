import { Anthropic } from '@anthropic-ai/sdk'

export class AnthropicAPI {
  private api: Anthropic

  constructor(apiKey: string) {
    this.api = new Anthropic({ apiKey })
  }

  async generateVoiceProfile(contentPillars: string[], uvp: string): Promise<string> {
    const prompt = `Generate a voice profile based on the following content pillars: ${contentPillars.join(', ')} and UVP: ${uvp}`
    const response = await this.api.completions.create({
      model: 'claude-2',
      prompt,
      max_tokens_to_sample: 200
    })
    return response.completion.trim()
  }

  async generatePost(notes: string, voiceProfile: string): Promise<string> {
    const prompt = `Generate a post based on the following notes: ${notes} using this voice profile: ${voiceProfile}`
    const response = await this.api.completions.create({
      model: 'claude-2',
      prompt,
      max_tokens_to_sample: 500
    })
    return response.completion.trim()
  }
}