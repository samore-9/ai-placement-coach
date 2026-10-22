import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    type: {
      type: String,
      enum: [
        'job_posted', 'deadline_reminder', 'streak_risk', 'badge_earned',
        'roadmap_update', 'ats_report_ready', 'announcement', 'system',
      ],
      required: true,
    },

    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.model('Notification', notificationSchema);
