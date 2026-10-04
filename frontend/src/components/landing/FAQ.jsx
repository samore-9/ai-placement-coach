import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FAQS = [
  {
    q: 'Which AI model does the resume analysis?',
    a: "The AI layer is provider-agnostic — it runs on OpenAI or Gemini depending on configuration, so the scoring stays consistent even if the underlying model changes.",
  },
  {
    q: "I'm a first-year — is this too early?",
    a: 'No — the roadmap adjusts to your year. First and second years get a longer runway focused on fundamentals and projects; third/final years get an accelerated, interview-focused track.',
  },
  {
    q: 'Does the ATS score match what real recruiting software sees?',
    a: 'The scoring breakdown (formatting, keywords, skills, experience, education) mirrors the categories real ATS platforms parse for — it\'s a strong proxy, not a guarantee, since every company\'s ATS is configured slightly differently.',
  },
  {
    q: 'Can my college track cohort progress?',
    a: 'Yes — the Campus plan gives Training & Placement cells an admin dashboard with cohort-wide readiness analytics.',
  },
  {
    q: 'Is my resume data used to train anything?',
    a: "No. Your resume and profile data are used only to generate your analysis and roadmap — not for model training.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-signal-500">FAQ</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 dark:text-ink-100 sm:text-4xl">
          Questions, answered plainly.
        </h2>
      </div>

      <div className="mt-10 divide-y divide-ink-100 dark:divide-ink-700/60 rounded-2xl border border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark-card">
        {FAQS.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-medium text-ink-900 dark:text-ink-100">{item.q}</span>
              <FiChevronDown
                className={`shrink-0 text-ink-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>
            {open === i && (
              <p className="px-6 pb-5 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
