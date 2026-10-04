const COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'Oracle',
  'Salesforce', 'Atlassian', 'Flipkart', 'Swiggy', 'Uber',
];

export function Companies() {
  return (
    <section id="companies" className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-center font-mono text-xs uppercase tracking-wider text-ink-400">
        Prep tracks mapped to real hiring bars at
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {COMPANIES.map((name) => (
          <span key={name} className="font-display text-lg font-medium text-ink-300 dark:text-ink-600">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
