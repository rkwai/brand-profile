import Anthropic from '@anthropic-ai/sdk';

export class AnthropicAPI {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY, // Make sure this environment variable is set
    });
  }

  async generateVoiceProfile(contentPillars: string, uvp: string): Promise<string> {
    const userPrompt = `Generate a succinct voice profile that can be used to generate a post based on the following content pillars: ${contentPillars} and UVP: ${uvp}. Use under 200 tokens.`;
    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 250,
      messages: [
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: 'Your voice profile is:' }
      ]
    });
    const fullText = response.content[0].type === 'text' ? response.content[0].text : '';
    return fullText.split('[END]')[0].trim();
  }

  async generatePost(notes: string, voiceProfile: string): Promise<string> {
    const userPrompt = `Generate a post based on the following notes: ${notes} using this voice profile: ${voiceProfile}. Use under 250 tokens.`;
    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      messages: [
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: 'Your post is:' }
      ]
    });
    const fullText = response.content[0].type === 'text' ? response.content[0].text : '';
    return fullText.split('[END]')[0].trim();
  }
}