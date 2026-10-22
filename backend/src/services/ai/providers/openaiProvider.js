import OpenAI from 'openai';
import { env } from '../../../config/env.js';
import { parseJSONResponse, JSON_INSTRUCTION } from '../jsonUtils.js';
import { ApiError } from '../../../utils/ApiError.js';
import { HTTP_STATUS } from '../../../constants/httpStatus.js';
import { logger } from '../../../config/logger.js';

// Created lazily: the OpenAI SDK throws if the key is empty, and this file is
// still imported at startup when AI_PROVIDER=gemini.
let client;
const getClient = () => {
  if (!env.ai.openai.apiKey) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'AI_PROVIDER is "openai" but OPENAI_API_KEY is not set.'
    );
  }
  if (!client) client = new OpenAI({ apiKey: env.ai.openai.apiKey });
  return client;
};

const complete = async ({ system, prompt, temperature = 0.4 }) => {
  const openai = getClient();
  try {
    const response = await openai.chat.completions.create({
      model: env.ai.openai.model,
      temperature,
      messages: [
        ...(system ? [{ role: 'system', content: system }] : []),
        { role: 'user', content: prompt },
      ],
    });
    return response.choices[0]?.message?.content ?? '';
  } catch (error) {
    logger.error(`OpenAI provider error: ${error.message}`);
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'OPENAI provider request failed. Please try again shortly.');
  }
};

export const openaiProvider = {
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