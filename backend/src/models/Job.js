import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    companyName: { type: String, required: true }, // denormalized for jobs without a full Company profile

    role: { type: String, required: true },
    jobType: { type: String, enum: ['internship', 'full_time', 'internship_ppo'], default: 'full_time' },

    package: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'INR' },
    },

    location: { type: String, required: true },
    isRemote: { type: Boolean, default: false },

    eligibility: {
      minCgpa: { type: Number },
      allowedBranches: [{ type: String }],
    },
    batch: [{ type: Number }],

    deadline: { type: Date, required: true },
    applyLink: { type: String, required: true },

    description: { type: String, required: true },
    requiredSkills: [{ type: String }],

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

jobSchema.index({ requiredSkills: 1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ isActive: 1, createdAt: -1 });
jobSchema.index({ role: 'text', companyName: 'text', description: 'text' });

export const Job = mongoose.model('Job', jobSchema);
