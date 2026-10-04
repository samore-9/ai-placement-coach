export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-7 w-64 rounded-lg bg-ink-100 dark:bg-ink-700" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-ink-100 dark:bg-ink-700" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-64 rounded-2xl bg-ink-100 dark:bg-ink-700 lg:col-span-2" />
        <div className="h-64 rounded-2xl bg-ink-100 dark:bg-ink-700" />
      </div>
    </div>
  );
}
