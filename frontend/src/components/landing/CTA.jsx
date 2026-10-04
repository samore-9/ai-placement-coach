import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-signal px-8 py-16 text-center sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Placement season doesn't wait. Neither should your prep.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
            Set up your profile in under a minute and get your first ATS score today.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button variant="secondary" size="lg">
              Start free <FiArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
