# AI Service Layer (implemented in the "AI Features" phase)

Planned structure:
- `aiProvider.interface.js` — common interface: generateText(), generateJSON()
- `providers/openaiProvider.js` — OpenAI implementation
- `providers/geminiProvider.js` — Gemini implementation
- `aiProviderFactory.js` — returns active provider based on `env.ai.provider`

Consumers (resumeAnalyzer, atsScorer, roadmapGenerator, mockInterviewEvaluator, etc.)
depend only on the interface, never on a specific provider — so switching
OpenAI <-> Gemini requires changing one env var, not application code.
