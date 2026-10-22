import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date },
    credentialUrl: { type: String },

    fileUrl: { type: String },
    publicId: { type: String },
  },
  { timestamps: true }
);

certificateSchema.index({ user: 1 });

export const Certificate = mongoose.model('Certificate', certificateSchema);
