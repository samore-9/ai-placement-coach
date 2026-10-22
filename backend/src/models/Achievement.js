import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    badgeKey: { type: String, required: true }, // e.g. 'streak_7', 'first_ats_90', 'dsa_100_solved'
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String, default: '' },

    tier: { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' },
    earnedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

achievementSchema.index({ user: 1, badgeKey: 1 }, { unique: true });

export const Achievement = mongoose.model('Achievement', achievementSchema);
