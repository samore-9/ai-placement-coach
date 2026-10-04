import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { ReadinessPath } from '@/components/landing/ReadinessPath';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-8 sm:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(53,87,240,0.08),_transparent_60%)]" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-3.5 py-1.5 dark:bg-surface-dark-card dark:border-ink-700"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
          <span className="font-mono text-xs text-ink-500 dark:text-ink-300">Built for CS/IT/ECE engineering students</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-ink-100 sm:text-6xl"
        >
          Placement prep, minus the
          <br className="hidden sm:block" /> guesswork.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-ink-500 dark:text-ink-300 sm:text-lg"
        >
          Your resume, ATS score, DSA sheet, and mock interviews — read by one AI that tells you
          exactly what's weak and what to do about it today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link to="/register">
            <Button variant="gradient" size="lg">
              Start free <FiArrowRight />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="secondary" size="lg">
              <FiPlayCircle /> See how it works
            </Button>
          </a>
        </motion.div>

        <p className="mt-4 text-xs text-ink-300">No credit card. Takes under a minute.</p>
      </div>

      <ReadinessPath />
    </section>
  );
}
