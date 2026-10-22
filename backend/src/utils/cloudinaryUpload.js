import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a buffer (from multer memoryStorage) to Cloudinary.
 * @param {Buffer} buffer
 * @param {{ folder: string, resourceType?: 'image'|'raw'|'auto', publicId?: string }} options
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadBufferToCloudinary = (buffer, { folder, resourceType = 'auto', publicId }) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, public_id: publicId, overwrite: true },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

export const deleteFromCloudinary = (publicId, resourceType = 'auto') =>
  cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
