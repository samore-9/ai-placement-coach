import multer from 'multer';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const storage = multer.memoryStorage();

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const PDF_TYPE = 'application/pdf';

const fileFilter = (allowed) => (req, file, cb) => {
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new ApiError(HTTP_STATUS.BAD_REQUEST, `Invalid file type. Allowed: ${allowed.join(', ')}`), false);
};

// Profile photo — image only, 3MB max
export const uploadImage = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: fileFilter(IMAGE_TYPES),
});

// Resume — PDF only, 5MB max
export const uploadResume = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter([PDF_TYPE]),
});

// Certificates — image or PDF, 5MB max
export const uploadDocument = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter([...IMAGE_TYPES, PDF_TYPE]),
});
