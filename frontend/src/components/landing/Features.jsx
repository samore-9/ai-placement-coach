import { motion } from 'framer-motion';
import { FiFileText, FiTarget, FiMap, FiCode, FiMic, FiBriefcase } from 'react-icons/fi';

const FEATURES = [
  {
    icon: FiFileText,
    title: 'Resume Analyzer',
    description: 'Upload a PDF and get section-by-section feedback — missing sections, weak bullet points, and recruiter-style critique.',
    span: 'sm:col-span-2',
  },
  {
    icon: FiTarget,
    title: 'ATS Score',
    description: 'A breakdown across formatting, keywords, and experience, scored the way applicant tracking systems actually read resumes.',
  },
  {
    icon: FiMap,
    title: 'AI Career Roadmap',
    description: 'Pick a target company and role — get a week-by-week plan from your current level to placement-ready.',
  },
  {
    icon: FiCode,
    title: 'Coding Practice',
    description: 'Striver A2Z, NeetCode, and Blind 75, organized by topic, difficulty, and company — with streaks that keep you honest.',
    span: 'sm:col-span-2',
  },
  {
    icon: FiMic,
    title: 'Mock Interviews',
    description: 'An AI interviewer scores your answers on technical accuracy, confidence, and communication — before the real one does.',
    span: 'sm:col-span-2',
  },
  {
    icon: FiBriefcase,
    title: 'Job Portal',
    description: 'Curated internships and placements filtered to your eligibility — batch, CGPA, and branch.',
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-signal-500">What's inside</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 dark:text-ink-100 sm:text-4xl">
          Everything placement season throws at you, in one place.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover dark:bg-surface-dark-card dark:border-ink-700/60 ${f.span || ''}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-50 text-signal-500 dark:bg-signal-900/40">
              <f.icon size={18} />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink-900 dark:text-ink-100">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
