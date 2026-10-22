import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    type: { type: String, enum: ['daily', 'roadmap', 'custom'], required: true },
    date: { type: Date, required: true }, // the day this task belongs to (for daily/streak logic)

    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['coding', 'interview_question', 'cs_concept', 'aptitude', 'hr_question', 'other'],
      default: 'other',
    },

    relatedCodingQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'CodingQuestion' },
    relatedInterviewQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewQuestion' },
    relatedRoadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' },

    status: { type: String, enum: ['pending', 'completed', 'skipped'], default: 'pending' },
    completedAt: { type: Date },

    xpReward: { type: Number, default: 10 },
  },
  { timestamps: true }
);

taskSchema.index({ user: 1, date: 1 });
taskSchema.index({ user: 1, type: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);
