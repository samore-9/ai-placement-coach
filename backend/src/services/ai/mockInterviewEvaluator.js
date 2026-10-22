import { getAIProvider } from './aiProviderFactory.js';

const INTERVIEWER_SYSTEM_PROMPT = `You are conducting a technical interview for an engineering internship/full-time
role. Ask one clear, focused question at a time appropriate to the requested topic and difficulty. Do not answer
your own question or provide hints unless explicitly asked.`;

const EVALUATOR_SYSTEM_PROMPT = `You are an experienced technical interviewer evaluating a candidate's spoken/typed
answer. You give honest, specific, constructive feedback — not generic encouragement.`;

export const generateInterviewQuestion = async ({ topic, difficulty }) => {
  const ai = getAIProvider();
  const question = await ai.generateText({
    system: INTERVIEWER_SYSTEM_PROMPT,
    prompt: `Ask one ${difficulty || 'medium'}-difficulty ${topic || 'technical'} interview question suitable for an engineering student applying for an SDE internship or entry-level role. Return ONLY the question text, nothing else.`,
    temperature: 0.6,
  });
  return question.trim();
};

const buildEvaluationPrompt = (question, answer) => `
Interview question asked: "${question}"

Candidate's answer: "${answer}"

Return a single JSON object with EXACTLY this shape:

{
  "technicalAccuracy": number,
  "confidence": number,
  "communication": number,
  "grammar": number,
  "overallRating": number,
  "improvementAreas": string[],
  "feedback": string
}

Rules:
- All numeric fields are 0-100.
- "confidence" and "communication" should be inferred from the structure, clarity, and assertiveness of the written answer (filler words, hedging, rambling vs. concise and structured).
- "overallRating" should weight "technicalAccuracy" most heavily, since a well-communicated wrong answer is still wrong.
- "improvementAreas" should be 2-4 specific, actionable points.
- "feedback" is 2-4 sentences of direct, specific feedback — reference something the candidate actually said.
- If the answer is empty, off-topic, or nonsensical, score accordingly (low) rather than being generous.
`;

export const evaluateInterviewAnswer = async (question, answer) => {
  const ai = getAIProvider();
  const result = await ai.generateJSON({
    system: EVALUATOR_SYSTEM_PROMPT,
    prompt: buildEvaluationPrompt(question, answer),
    temperature: 0.25,
  });

  return {
    technicalAccuracy: result.technicalAccuracy ?? 0,
    confidence: result.confidence ?? 0,
    communication: result.communication ?? 0,
    grammar: result.grammar ?? 0,
    overallRating: result.overallRating ?? 0,
    improvementAreas: result.improvementAreas ?? [],
    feedback: result.feedback ?? '',
  };
};
