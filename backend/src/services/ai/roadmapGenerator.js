import { getAIProvider } from './aiProviderFactory.js';

const SYSTEM_PROMPT = `You are an expert placement mentor who has coached hundreds of engineering students
into offers at top companies. You build realistic, week-by-week preparation plans — not vague advice — based
on a student's current level, target company/role, and available time.`;

const STAGE_ORDER = [
  'current_level', 'target_skills', 'projects', 'dsa', 'system_design',
  'interview_prep', 'mock_interviews', 'resume', 'applications', 'placement_ready',
];

const buildRoadmapPrompt = ({ currentLevel, currentSkills, targetCompany, targetRole, timelineWeeks }) => `
Build a personalized placement roadmap for a student:
- Current level: ${currentLevel}
- Current skills: ${currentSkills.length ? currentSkills.join(', ') : '(none listed)'}
- Target company: ${targetCompany}
- Target role: ${targetRole}
- Timeline: ${timelineWeeks} weeks

Return a single JSON object with EXACTLY this shape:

{
  "requiredSkills": string[],
  "milestones": [
    { "stage": string, "title": string, "description": string, "order": number }
  ],
  "weeklyTasks": [
    { "week": number, "tasks": string[] }
  ],
  "monthlyTasks": [
    { "month": number, "tasks": string[] }
  ]
}

Rules:
- "milestones" MUST have exactly one entry per stage, in this exact order and using these exact stage keys:
  ${STAGE_ORDER.map((s, i) => `${i + 1}. "${s}"`).join(', ')}.
- Each milestone's "order" field must match its position in that list (1-indexed).
- "weeklyTasks" should cover all ${timelineWeeks} weeks of the timeline, with 3-6 concrete tasks per week
  (e.g. "Solve 8 array + hashing problems from the DSA sheet", "Build the auth module of your capstone project"),
  not vague goals.
- "monthlyTasks" should be a higher-level summary, roughly 1 entry per 4 weeks.
- Tailor difficulty and depth to both the current level AND the specific target company's known interview focus.
`;

export const generateRoadmap = async ({ currentLevel, currentSkills, targetCompany, targetRole, timelineWeeks }) => {
  const ai = getAIProvider();
  const result = await ai.generateJSON({
    system: SYSTEM_PROMPT,
    prompt: buildRoadmapPrompt({ currentLevel, currentSkills, targetCompany, targetRole, timelineWeeks }),
    temperature: 0.4,
  });

  // Guarantee all 10 stages exist even if the model drops one — the UI
  // (Phase 6 RoadmapProgressCard, and the dedicated Roadmap page) depends on
  // rendering the full fixed pipeline.
  const milestonesByStage = new Map((result.milestones || []).map((m) => [m.stage, m]));
  const milestones = STAGE_ORDER.map((stage, i) => {
    const existing = milestonesByStage.get(stage);
    return {
      stage,
      order: i + 1,
      title: existing?.title || stage.replace(/_/g, ' '),
      description: existing?.description || '',
      status: i === 0 ? 'in_progress' : 'pending',
    };
  });

  return {
    requiredSkills: result.requiredSkills ?? [],
    milestones,
    weeklyTasks: (result.weeklyTasks ?? []).map((w) => ({ ...w, completed: false })),
    monthlyTasks: (result.monthlyTasks ?? []).map((m) => ({ ...m, completed: false })),
  };
};
