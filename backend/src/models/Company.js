import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logoUrl: { type: String, default: '' },
    category: {
      type: String,
      enum: ['startup', 'product_based', 'service_based', 'faang_maang'],
      required: true,
    },

    hiringProcess: [{ type: String }], // high-level description steps
    rounds: [
      {
        name: { type: String, required: true },
        description: { type: String },
        order: { type: Number },
      },
    ],

    packageRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'INR' },
    },

    eligibility: {
      minCgpa: { type: Number },
      allowedBranches: [{ type: String }],
      batches: [{ type: Number }],
    },

    interviewExperiences: [
      {
        title: String,
        content: String,
        role: String,
        result: { type: String, enum: ['selected', 'rejected', 'in_progress'] },
        submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    preparationTips: [{ type: String }],
    resources: [
      {
        title: String,
        url: String,
        type: { type: String, enum: ['article', 'video', 'course', 'doc'] },
      },
    ],

    requiredSkills: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

companySchema.index({ category: 1 });
companySchema.index({ name: 'text' });

export const Company = mongoose.model('Company', companySchema);
