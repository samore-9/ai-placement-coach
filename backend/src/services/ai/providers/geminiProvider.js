import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../../../config/env.js';
import { parseJSONResponse, JSON_INSTRUCTION } from '../jsonUtils.js';
import { ApiError } from '../../../utils/ApiError.js';
import { HTTP_STATUS } from '../../../constants/httpStatus.js';
import { logger } from '../../../config/logger.js';

// Created lazily so startup never depends on the key being present.
let genAI;
const getGenAI = () => {
  if (!env.ai.gemini.apiKey) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'AI_PROVIDER is "gemini" but GEMINI_API_KEY is not set.'
    );
  }
  if (!genAI) genAI = new GoogleGenerativeAI(env.ai.gemini.apiKey);
  return genAI;
};

const complete = async ({ system, prompt, temperature = 0.4 }) => {
  const client = getGenAI();
  try {
    const model = client.getGenerativeModel({
      model: env.ai.gemini.model,
      systemInstruction: system,
      generationConfig: { temperature },
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    logger.error(`Gemini provider error: ${error.message}`);
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Gemini AI provider request failed. Please try again shortly.');
  }
};

export const geminiProvider = {
  generateText: async ({ system, prompt, temperature }) => complete({ system, prompt, temperature }),

  generateJSON: async ({ system, prompt, temperature }) => {
    const raw = await complete({
      system: `${system ? system + '\n\n' : ''}${JSON_INSTRUCTION}`,
      prompt,
      temperature,
    });
    return parseJSONResponse(raw);
  },
};