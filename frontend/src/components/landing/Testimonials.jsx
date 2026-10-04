import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "The ATS breakdown found three formatting issues I'd never have caught — my callback rate roughly doubled after fixing them.",
    name: 'Ananya R.',
    meta: 'Final year, IT · placed at a product-based company',
  },
  {
    quote: "I stopped guessing what to study. The roadmap just told me: this week, arrays and hashing. Next week, trees.",
    name: 'Rohit K.',
    meta: 'Third year, CSE',
  },
  {
    quote: "Mock interviews were the difference. Getting scored on 'confidence' sounds soft until you see how much it affects real answers.",
    name: 'Sneha M.',
    meta: 'Final year, ECE · SDE intern offer',
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-signal-500">From students</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 dark:text-ink-100 sm:text-4xl">
          Not a testimonial carousel — just what changed.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:bg-surface-dark-card dark:border-ink-700/60"
          >
            <blockquote className="text-sm leading-relaxed text-ink-700 dark:text-ink-100">"{t.quote}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-signal text-xs font-semibold text-white">
                {t.name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{t.name}</p>
                <p className="text-xs text-ink-400">{t.meta}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
