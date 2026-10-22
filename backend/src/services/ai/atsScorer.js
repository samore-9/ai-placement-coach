import { getAIProvider } from './aiProviderFactory.js';

const SYSTEM_PROMPT = `You are an Applicant Tracking System (ATS) simulation engine combined with a technical
recruiter's judgment. You score resumes the way real ATS software parses them (keyword matching, structure,
section detection) AND the way a human recruiter reads them afterward. You are strict and consistent.`;

const buildATSPrompt = (resumeText, targetRole, targetCompany) => `
Score the following resume as if it were submitted for a "${targetRole || 'Software Engineer'}" role
${targetCompany ? `at ${targetCompany}` : 'at a product-based tech company'}.

Return a single JSON object with EXACTLY this shape:

{
  "overallScore": number,
  "breakdown": {
    "formatting": number,
    "keywords": number,
    "skills": number,
    "projects": number,
    "experience": number,
    "education": number,
    "achievements": number,
    "resumeLength": number
  },
  "suggestions": string[],
  "matchedKeywords": string[],
  "missingKeywords": string[]
}

Rules:
- Every field in "breakdown" is 0-100.
- "overallScore" is 0-100 and should roughly reflect a weighted average of the breakdown, weighted toward
  keywords, skills, and experience for this specific role.
- "missingKeywords" should list role-relevant keywords/technologies commonly expected for this role that are
  ABSENT from the resume (e.g. specific languages, frameworks, or concepts a real job description would list).
- "suggestions" should be specific and actionable (e.g. "Add a metrics-driven bullet point under the X project"),
  not generic advice like "use more keywords".
- Be strict: a resume with no quantified achievements, missing sections, or generic bullet points should NOT score above 60.

RESUME TEXT:
"""
${resumeText}
"""
`;

export const scoreResumeATS = async (resumeText, { targetRole, targetCompany } = {}) => {
  const ai = getAIProvider();
  const result = await ai.generateJSON({
    system: SYSTEM_PROMPT,
    prompt: buildATSPrompt(resumeText, targetRole, targetCompany),
    temperature: 0.25,
  });

  return {
    overallScore: result.overallScore ?? 0,
    breakdown: {
      formatting: 0,
      keywords: 0,
      skills: 0,
      projects: 0,
      experience: 0,
      education: 0,
      achievements: 0,
      resumeLength: 0,
      ...result.breakdown,
    },
    suggestions: result.suggestions ?? [],
    matchedKeywords: result.matchedKeywords ?? [],
    missingKeywords: result.missingKeywords ?? [],
  };
};
