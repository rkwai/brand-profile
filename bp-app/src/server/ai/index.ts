import Anthropic from '@anthropic-ai/sdk';

export class AnthropicAPI {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY, // Make sure this environment variable is set
    });
  }

  async generateVoiceProfile(contentPillars: string, uvp: string): Promise<string> {
    const prompt = `Generate a voice profile based on the following content pillars: ${contentPillars} and UVP: ${uvp}`
    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    })
    return response.content[0].type === 'text' ? response.content[0].text : ''
  }

  async generatePost(notes: string, voiceProfile: string): Promise<string> {
    const prompt = `Generate a post based on the following notes: ${notes} using this voice profile: ${voiceProfile}`
    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    })
    return response.content[0].type === 'text' ? response.content[0].text : ''
  }
}