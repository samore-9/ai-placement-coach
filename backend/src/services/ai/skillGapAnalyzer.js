import { getAIProvider } from './aiProviderFactory.js';

const SYSTEM_PROMPT = `You are a technical hiring manager who has run engineering interview loops at top
product-based and FAANG/MAANG companies. You know exactly what skill bar each company expects for SDE/intern
roles and can precisely identify gaps between a candidate's current skills and that bar.`;

const buildSkillGapPrompt = (currentSkills, targetCompany, targetRole) => `
A student has these current skills: ${currentSkills.length ? currentSkills.join(', ') : '(none listed)'}.

They are targeting a "${targetRole || 'Software Engineer'}" role at ${targetCompany}.

Return a single JSON object with EXACTLY this shape:

{
  "missingSkills": [{ "skill": string, "priority": "high"|"medium"|"low", "difficulty": "beginner"|"intermediate"|"advanced", "timeRequiredWeeks": number, "reason": string }],
  "weakSkills": [{ "skill": string, "priority": "high"|"medium"|"low", "reason": string }],
  "recommendedSkills": [{ "skill": string, "reason": string }],
  "matchPercentage": number,
  "summary": string
}

Rules:
- "missingSkills" are skills required for this role at this company that are ENTIRELY absent from the student's list.
- "weakSkills" are skills the student has listed but which likely need to go deeper for this company's bar (infer this reasonably; don't be overly harsh).
- "recommendedSkills" are nice-to-have skills that would meaningfully strengthen the application but aren't strictly required.
- "matchPercentage" (0-100) reflects how close the student's current skill set is to this company's typical bar for this role.
- Order "missingSkills" and "weakSkills" by priority (high first).
- Be specific to the company's actual known tech stack and interview focus areas where possible (e.g. distributed systems depth for companies known for infra-heavy interviews, DSA depth for companies known for it, etc.) rather than generic advice.
`;

export const analyzeSkillGap = async (currentSkills, targetCompany, targetRole) => {
  const ai = getAIProvider();
  const result = await ai.generateJSON({
    system: SYSTEM_PROMPT,
    prompt: buildSkillGapPrompt(currentSkills, targetCompany, targetRole),
    temperature: 0.35,
  });

  return {
    missingSkills: result.missingSkills ?? [],
    weakSkills: result.weakSkills ?? [],
    recommendedSkills: result.recommendedSkills ?? [],
    matchPercentage: result.matchPercentage ?? 0,
    summary: result.summary ?? '',
  };
};
