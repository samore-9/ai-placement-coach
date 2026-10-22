import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    stage: {
      type: String,
      enum: [
        'current_level', 'target_skills', 'projects', 'dsa', 'system_design',
        'interview_prep', 'mock_interviews', 'resume', 'applications', 'placement_ready',
      ],
      required: true,
    },
    status: { type: String, enum: ['locked', 'pending', 'in_progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },
    completedAt: { type: Date },
    order: { type: Number, required: true },
  },
  { _id: true, timestamps: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    targetCompany: { type: String, required: true },
    targetRole: { type: String, required: true },
    currentLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },

    requiredSkills: [{ type: String }],

    milestones: [milestoneSchema],

    weeklyTasks: [
      {
        week: Number,
        tasks: [String],
        completed: { type: Boolean, default: false },
      },
    ],
    monthlyTasks: [
      {
        month: Number,
        tasks: [String],
        completed: { type: Boolean, default: false },
      },
    ],

    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' },
    generatedByAI: { type: Boolean, default: true },
  },
  { timestamps: true }
);

roadmapSchema.index({ user: 1, status: 1 });

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);
