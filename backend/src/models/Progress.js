import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true },

    atsScore: { type: Number, min: 0, max: 100 },
    skillScore: { type: Number, min: 0, max: 100 },
    placementReadiness: { type: Number, min: 0, max: 100 },

    codingStats: {
      solvedToday: { type: Number, default: 0 },
      totalSolved: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
    },

    interviewPrepCount: { type: Number, default: 0 },
    roadmapCompletion: { type: Number, min: 0, max: 100 },

    xpEarned: { type: Number, default: 0 },
    totalXp: { type: Number, default: 0 },

    applicationsSubmitted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// One snapshot per user per day
progressSchema.index({ user: 1, date: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);
