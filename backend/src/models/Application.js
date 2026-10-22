import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },

    status: {
      type: String,
      enum: ['applied', 'oa_round', 'interview', 'offer', 'rejected', 'withdrawn'],
      default: 'applied',
    },

    appliedAt: { type: Date, default: Date.now },
    resumeUsed: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },

    notes: { type: String },
    timeline: [
      {
        status: String,
        note: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, job: 1 }, { unique: true });
applicationSchema.index({ user: 1, status: 1 });

export const Application = mongoose.model('Application', applicationSchema);
