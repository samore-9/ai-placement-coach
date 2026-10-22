import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    techStack: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
  },
  { _id: true, timestamps: false }
);

const internshipSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
  },
  { _id: true, timestamps: false }
);

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    photoUrl: { type: String, default: '' },
    activeResume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },

    college: { type: String, trim: true },
    university: { type: String, trim: true },
    degree: { type: String, trim: true },
    branch: { type: String, trim: true },
    cgpa: { type: Number, min: 0, max: 10 },
    passingYear: { type: Number },

    phone: { type: String, trim: true },

    skills: [{ type: String, trim: true }],
    languages: [{ type: String, trim: true }],
    projects: [projectSchema],
    internships: [internshipSchema],

    links: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      portfolio: { type: String, default: '' },
      leetcode: { type: String, default: '' },
      codeforces: { type: String, default: '' },
      codechef: { type: String, default: '' },
      hackerrank: { type: String, default: '' },
      gfg: { type: String, default: '' },
    },

    careerInterests: {
      preferredCompany: { type: String, default: '' },
      preferredRole: { type: String, default: '' },
      preferredLocation: { type: String, default: '' },
      expectedSalary: { type: Number },
    },

    profileCompletion: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

profileSchema.index({ 'careerInterests.preferredRole': 1 });
profileSchema.index({ skills: 1 });

export const Profile = mongoose.model('Profile', profileSchema);
