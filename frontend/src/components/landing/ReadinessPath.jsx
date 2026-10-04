import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STAGES = [
  { label: 'Skills', sub: 'gap mapped' },
  { label: 'Projects', sub: 'portfolio-ready' },
  { label: 'DSA', sub: '312 solved' },
  { label: 'System Design', sub: 'HLD/LLD' },
  { label: 'Interview Prep', sub: '4 mocks done' },
  { label: 'Placement Ready', sub: '' },
];

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3)))); // ease-out cubic
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

export function ReadinessPath() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const readiness = useCountUp(87, inView);

  return (
    <div ref={ref} className="relative mx-auto mt-16 w-full max-w-4xl">
      {/* Floating readiness badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -top-6 right-2 z-10 flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3.5 py-2 shadow-card-hover dark:bg-surface-dark-card dark:border-ink-700 sm:right-8"
      >
        <span className="h-2 w-2 rounded-full bg-status-success animate-pulse" />
        <span className="font-mono text-sm font-semibold text-ink-900 dark:text-ink-100">{readiness}%</span>
        <span className="text-xs text-ink-400">placement ready</span>
      </motion.div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card dark:bg-surface-dark-card dark:border-ink-700/60 sm:p-10">
        {/* Desktop: horizontal path */}
        <div className="hidden sm:block relative">
          <div className="absolute left-0 right-0 top-5 h-[2px] bg-ink-100 dark:bg-ink-700" />
          <motion.div
            className="absolute left-0 top-5 h-[2px] bg-gradient-signal"
            initial={{ width: '0%' }}
            animate={inView ? { width: '84%' } : {}}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
          />
          <div className="relative grid grid-cols-6 gap-2">
            {STAGES.map((stage, i) => {
              const done = i < 5;
              return (
                <div key={stage.label} className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.15 * i, duration: 0.4 }}
                    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-mono font-semibold ${
                      done
                        ? 'bg-signal-500 text-white'
                        : 'bg-gradient-streak text-white ring-4 ring-streak-400/20'
                    }`}
                  >
                    {i + 1}
                  </motion.div>
                  <p className="mt-3 text-xs font-semibold text-ink-900 dark:text-ink-100">{stage.label}</p>
                  {stage.sub && <p className="mt-0.5 font-mono text-[10px] text-ink-400">{stage.sub}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical path */}
        <div className="sm:hidden relative pl-9">
          <div className="absolute left-[19px] top-1 bottom-1 w-[2px] bg-ink-100 dark:bg-ink-700" />
          <motion.div
            className="absolute left-[19px] top-1 w-[2px] bg-gradient-signal"
            initial={{ height: '0%' }}
            animate={inView ? { height: '84%' } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          <div className="space-y-6">
            {STAGES.map((stage, i) => {
              const done = i < 5;
              return (
                <div key={stage.label} className="relative flex items-center gap-4">
                  <div
                    className={`absolute -left-9 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-mono font-semibold ${
                      done ? 'bg-signal-500 text-white' : 'bg-gradient-streak text-white'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{stage.label}</p>
                    {stage.sub && <p className="font-mono text-[11px] text-ink-400">{stage.sub}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
