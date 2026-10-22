import mongoose from 'mongoose';

const atsReportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },

    overallScore: { type: Number, required: true, min: 0, max: 100 },

    breakdown: {
      formatting: { type: Number, min: 0, max: 100 },
      keywords: { type: Number, min: 0, max: 100 },
      skills: { type: Number, min: 0, max: 100 },
      projects: { type: Number, min: 0, max: 100 },
      experience: { type: Number, min: 0, max: 100 },
      education: { type: Number, min: 0, max: 100 },
      achievements: { type: Number, min: 0, max: 100 },
      resumeLength: { type: Number, min: 0, max: 100 },
    },

    targetRole: { type: String },
    targetCompany: { type: String },

    suggestions: [{ type: String }],

    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
  },
  { timestamps: true }
);

atsReportSchema.index({ user: 1, createdAt: -1 });

export const ATSReport = mongoose.model('ATSReport', atsReportSchema);
