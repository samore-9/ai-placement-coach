import { motion } from 'framer-motion';

const STATS = [
  { value: '40,000+', label: 'DSA problems tracked' },
  { value: '18', label: 'company-specific prep tracks' },
  { value: '2.3×', label: 'avg. ATS score improvement' },
  { value: '92%', label: 'roadmap completion rate' },
];

export function Stats() {
  return (
    <section className="border-y border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="text-center"
          >
            <p className="font-mono text-2xl font-semibold text-signal-500 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-300 sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
