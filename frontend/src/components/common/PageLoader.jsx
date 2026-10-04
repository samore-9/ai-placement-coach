export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-signal-500 border-t-transparent animate-spin" />
        <span className="text-sm text-ink-500 dark:text-ink-300 font-mono">loading…</span>
      </div>
    </div>
  );
}
