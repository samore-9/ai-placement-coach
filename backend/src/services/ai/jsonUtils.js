import { ApiError } from '../../utils/ApiError.js';
import { HTTP_STATUS } from '../../constants/httpStatus.js';

/**
 * Strips markdown code fences and parses JSON. Throws a clean ApiError
 * (surfaced to the client as a 502) rather than letting a raw JSON.parse
 * SyntaxError leak through, since a malformed AI response is an upstream
 * failure, not a client input error.
 */
export const parseJSONResponse = (raw) => {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'AI provider returned a malformed response. Please try again.');
  }
};

export const JSON_INSTRUCTION =
  'Respond with ONLY valid JSON. No markdown code fences, no preamble, no explanation before or after the JSON object.';
