/**
 * Common interface every AI provider must implement. Consumers (resumeAnalyzer,
 * atsScorer, roadmapGenerator, skillGapAnalyzer, mockInterviewEvaluator) only
 * ever call these two methods — never a provider-specific SDK method — so
 * swapping OpenAI <-> Gemini is an env var change (`AI_PROVIDER`), not a
 * code change.
 *
 * @typedef {Object} AIProvider
 * @property {(params: { system?: string, prompt: string, temperature?: number }) => Promise<string>} generateText
 *   Returns raw text completion.
 * @property {(params: { system?: string, prompt: string, temperature?: number }) => Promise<Object>} generateJSON
 *   Returns a parsed JSON object. The provider is responsible for instructing
 *   the underlying model to return ONLY JSON and for stripping any markdown
 *   fences before parsing.
 */

export const AI_PROVIDER_INTERFACE_VERSION = 1;
