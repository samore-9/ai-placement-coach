import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TIERS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Everything you need to start tracking placement prep properly.',
    features: ['1 resume analysis / month', 'ATS score breakdown', 'Full DSA sheet access', 'Daily task tracker', 'Community job board'],
    cta: 'Start free',
    variant: 'secondary',
  },
  {
    name: 'Pro',
    price: '₹299',
    period: '/month',
    description: 'For students in active application season.',
    features: ['Unlimited resume + ATS scans', 'AI-generated roadmap', 'Unlimited mock interviews', 'Company-specific prep tracks', 'Priority job alerts'],
    cta: 'Start free trial',
    variant: 'gradient',
    highlighted: true,
  },
  {
    name: 'Campus',
    price: 'Custom',
    period: '',
    description: 'For colleges and training & placement cells.',
    features: ['Cohort-wide analytics', 'Admin dashboard for T&P officers', 'Bulk company drives', 'Dedicated onboarding'],
    cta: 'Talk to us',
    variant: 'secondary',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white dark:bg-surface-dark-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-signal-500">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 dark:text-ink-100 sm:text-4xl">
            Free to start. Pay only in application season.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-7 ${
                tier.highlighted
                  ? 'border-signal-500 bg-gradient-signal text-white shadow-card-hover'
                  : 'border-ink-100 bg-surface-light dark:bg-surface-dark dark:border-ink-700/60'
              }`}
            >
              <h3 className={`font-display text-lg font-semibold ${tier.highlighted ? 'text-white' : 'text-ink-900 dark:text-ink-100'}`}>
                {tier.name}
              </h3>
              <p className={`mt-1 text-sm ${tier.highlighted ? 'text-white/80' : 'text-ink-500 dark:text-ink-300'}`}>
                {tier.description}
              </p>
              <p className="mt-5">
                <span className={`font-display text-3xl font-semibold ${tier.highlighted ? 'text-white' : 'text-ink-900 dark:text-ink-100'}`}>
                  {tier.price}
                </span>
                <span className={`text-sm ${tier.highlighted ? 'text-white/70' : 'text-ink-400'}`}> {tier.period}</span>
              </p>

              <ul className="mt-6 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <FiCheck className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-white' : 'text-signal-500'}`} size={15} />
                    <span className={tier.highlighted ? 'text-white/90' : 'text-ink-500 dark:text-ink-300'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className="block mt-7">
                <Button variant={tier.highlighted ? 'secondary' : tier.variant} className="w-full">
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
