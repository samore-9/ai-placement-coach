import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },

    action: {
      type: String,
      required: true,
      // e.g. 'login', 'logout', 'register', 'password_reset', 'resume_upload',
      // 'ats_scan', 'job_apply', 'admin_job_post', ...
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },

    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

// Auto-expire logs after 180 days to keep the collection lean
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 });

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
