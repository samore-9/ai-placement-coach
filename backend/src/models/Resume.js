import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    fileUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    originalFileName: { type: String },

    version: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },

    // Raw extracted text, cached so ATS scoring / skill-gap analysis don't
    // need to re-download and re-parse the PDF on every subsequent request.
    // Not exposed directly in most API responses (large), but selectable.
    extractedText: { type: String, select: false },

    parsedData: {
      skills: [{ type: String }],
      education: [
        {
          institution: String,
          degree: String,
          field: String,
          startYear: Number,
          endYear: Number,
        },
      ],
      projects: [
        {
          title: String,
          description: String,
          techStack: [String],
        },
      ],
      experience: [
        {
          company: String,
          role: String,
          duration: String,
          description: String,
        },
      ],
      achievements: [{ type: String }],
      missingSections: [{ type: String }],
    },

    aiReview: {
      strengthScore: { type: Number, min: 0, max: 100 },
      grammarIssues: [{ type: String }],
      formattingSuggestions: [{ type: String }],
      improvementSuggestions: [{ type: String }],
      improvedBulletPoints: [{ type: String }],
      weakAreas: [{ type: String }],
      recruiterFeedback: { type: String },
      generatedAt: { type: Date },
    },

    parseStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

resumeSchema.index({ user: 1, isActive: 1 });
resumeSchema.index({ user: 1, createdAt: -1 });

export const Resume = mongoose.model('Resume', resumeSchema);
