export function ComingSoon({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 dark:border-ink-700 py-24 text-center">
      <p className="font-mono text-xs text-signal-500">building_this_next</p>
      <h2 className="mt-3 font-display text-xl font-semibold text-ink-900 dark:text-ink-100">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-500 dark:text-ink-300">{description}</p>
    </div>
  );
}
