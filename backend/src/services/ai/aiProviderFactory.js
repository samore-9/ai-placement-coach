import { env } from '../../config/env.js';
import { openaiProvider } from './providers/openaiProvider.js';
import { geminiProvider } from './providers/geminiProvider.js';

const PROVIDERS = {
  openai: openaiProvider,
  gemini: geminiProvider,
};

/**
 * Every AI feature service imports getAIProvider(), never a specific provider
 * module. Switching the whole app from OpenAI to Gemini (or per-request, if
 * ever needed) is a single call-site change here.
 */
export const getAIProvider = () => {
  const provider = PROVIDERS[env.ai.provider];
  if (!provider) {
    throw new Error(`Unknown AI_PROVIDER "${env.ai.provider}". Expected one of: ${Object.keys(PROVIDERS).join(', ')}`);
  }
  return provider;
};
