import mongoose from 'mongoose';

const interviewQuestionSchema = new mongoose.Schema(
  {
    company: { type: String, index: true }, // e.g. Google, Amazon; empty = generic
    topic: {
      type: String,
      enum: [
        'hr', 'technical', 'behavioral', 'dbms', 'os', 'cn', 'oops',
        'java', 'javascript', 'react', 'node', 'mongodb', 'sql',
      ],
      required: true,
    },

    question: { type: String, required: true },
    expectedAnswer: { type: String, required: true },
    recruiterPerspective: { type: String },
    commonMistakes: [{ type: String }],
    sampleBestAnswer: { type: String },
    followUpQuestions: [{ type: String }],

    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    tags: [{ type: String }],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

interviewQuestionSchema.index({ topic: 1 });
interviewQuestionSchema.index({ company: 1, topic: 1 });

export const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);
