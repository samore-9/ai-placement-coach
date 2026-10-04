import { Logo } from '@/components/common/Logo';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const COLUMNS = [
  {
    title: 'Product',
    links: ['Resume Analyzer', 'ATS Score', 'Coding Practice', 'Mock Interviews', 'Job Portal'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Placement Companies', 'Interview Guides', 'DSA Sheet', 'Success Stories'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service'],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-500 dark:text-ink-300">
              The AI mentor that turns unstructured placement prep into a tracked, day-by-day plan.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 text-ink-500 hover:text-signal-500 hover:border-signal-300 dark:border-ink-700 dark:text-ink-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-ink-900 dark:text-ink-100">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-ink-500 hover:text-signal-500 dark:text-ink-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-100 dark:border-ink-700/60 pt-6 sm:flex-row">
          <p className="text-xs text-ink-300">© {new Date().getFullYear()} AI Placement Coach. All rights reserved.</p>
          <p className="text-xs text-ink-300">Built for engineering students, by people who've sat the same interviews.</p>
        </div>
      </div>
    </footer>
  );
}
