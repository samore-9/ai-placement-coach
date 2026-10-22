import mongoose from 'mongoose';

const codingQuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },

    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },

    topics: [
      {
        type: String,
        enum: [
          'arrays', 'strings', 'hashmap', 'stack', 'queue', 'trees', 'bst', 'heap', 'trie',
          'graphs', 'dp', 'greedy', 'sliding_window', 'binary_search', 'bit_manipulation',
          'recursion', 'backtracking', 'system_design_basics',
        ],
        required: true,
      },
    ],

    companyTags: [{ type: String }],
    sheetTags: [{ type: String, enum: ['striver_a2z', 'neetcode', 'blind_75'] }],

    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    hints: [{ type: String }],
    complexity: {
      time: { type: String },
      space: { type: String },
    },

    solutionUrl: { type: String },
    videoUrl: { type: String },
    externalLink: { type: String }, // LeetCode/GFG link

    order: { type: Number, default: 0 }, // sheet ordering

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

codingQuestionSchema.index({ topics: 1 });
codingQuestionSchema.index({ difficulty: 1 });
codingQuestionSchema.index({ companyTags: 1 });
codingQuestionSchema.index({ sheetTags: 1, order: 1 });

export const CodingQuestion = mongoose.model('CodingQuestion', codingQuestionSchema);
