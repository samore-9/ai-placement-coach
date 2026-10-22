import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    itemType: {
      type: String,
      enum: ['job', 'coding_question', 'interview_question', 'company', 'resource'],
      required: true,
    },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemTypeRef' },

    // Mongoose refPath needs an actual field holding the model name
    itemTypeRef: {
      type: String,
      required: true,
      enum: ['Job', 'CodingQuestion', 'InterviewQuestion', 'Company'],
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
