import pdfParse from 'pdf-parse';
import { ApiError } from './ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Extracts raw text from a PDF buffer (e.g. from multer memoryStorage).
 * Throws a clean 400 if the file isn't a parseable PDF (corrupted, scanned
 * image with no text layer, etc.) rather than letting pdf-parse's error
 * surface as a raw 500.
 */
export const extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    const text = data.text?.trim();
    if (!text || text.length < 30) {
      throw new Error('empty');
    }
    return text;
  } catch (error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Could not extract text from this PDF. Make sure it is a text-based resume, not a scanned image.'
    );
  }
};
