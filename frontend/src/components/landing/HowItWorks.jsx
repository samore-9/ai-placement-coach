import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    title: 'Tell it where you\'re headed',
    description: 'Set your target company, role, and timeline. Upload your resume so the AI has a real baseline, not a guess.',
  },
  {
    n: '02',
    title: 'Get your gap, not just a score',
    description: 'ATS score, skill gap vs. that company\'s bar, and a roadmap broken into weekly tasks — DSA, projects, system design.',
  },
  {
    n: '03',
    title: 'Do the next task, daily',
    description: 'One coding problem, one interview question, one concept — every day. Streaks and XP keep momentum, not guilt.',
  },
  {
    n: '04',
    title: 'Walk into the interview rehearsed',
    description: 'Mock interviews score your actual answers. By application time, nothing about the process is unfamiliar.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white dark:bg-surface-dark-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-signal-500">The process</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 dark:text-ink-100 sm:text-4xl">
            Four steps. No spreadsheet required.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative"
            >
              <span className="font-mono text-4xl font-semibold text-ink-100 dark:text-ink-700">{step.n}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink-900 dark:text-ink-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
