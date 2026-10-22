import { getAIProvider } from './aiProviderFactory.js';

const SYSTEM_PROMPT = `You are a senior technical recruiter and resume reviewer with 15+ years of experience
hiring engineering students for internships and full-time SDE roles at top product-based and FAANG/MAANG
companies. You are precise, honest, and never inflate scores — most student resumes score 40-70 on a first pass.`;

const buildAnalysisPrompt = (resumeText) => `
Analyze the following resume text extracted from a PDF. Return a single JSON object with EXACTLY this shape:

{
  "parsedData": {
    "skills": string[],
    "education": [{ "institution": string, "degree": string, "field": string, "startYear": number|null, "endYear": number|null }],
    "projects": [{ "title": string, "description": string, "techStack": string[] }],
    "experience": [{ "company": string, "role": string, "duration": string, "description": string }],
    "achievements": string[],
    "missingSections": string[]
  },
  "aiReview": {
    "strengthScore": number,
    "grammarIssues": string[],
    "formattingSuggestions": string[],
    "improvementSuggestions": string[],
    "improvedBulletPoints": string[],
    "weakAreas": string[],
    "recruiterFeedback": string
  }
}

Rules:
- "strengthScore" is 0-100, scored strictly against what a real recruiter would expect from a placement-ready engineering student resume.
- "missingSections" should name standard resume sections absent from this resume (e.g. "Projects", "Certifications", "Achievements").
- "improvedBulletPoints" should rewrite 3-5 of the weakest existing bullet points into stronger, metric-driven versions.
- "recruiterFeedback" is 2-4 sentences, written the way a recruiter would actually give feedback — direct, not generic praise.
- If a field genuinely has no data in the resume, return an empty array or null — do not invent content.

RESUME TEXT:
"""
${resumeText}
"""
`;

export const analyzeResume = async (resumeText) => {
  const ai = getAIProvider();
  const result = await ai.generateJSON({
    system: SYSTEM_PROMPT,
    prompt: buildAnalysisPrompt(resumeText),
    temperature: 0.3, // low temperature — this is an evaluation task, not creative writing
  });

  // Defensive defaults in case the model omits a key despite instructions
  return {
    parsedData: {
      skills: [],
      education: [],
      projects: [],
      experience: [],
      achievements: [],
      missingSections: [],
      ...result.parsedData,
    },
    aiReview: {
      strengthScore: 0,
      grammarIssues: [],
      formattingSuggestions: [],
      improvementSuggestions: [],
      improvedBulletPoints: [],
      weakAreas: [],
      recruiterFeedback: '',
      ...result.aiReview,
    },
  };
};
