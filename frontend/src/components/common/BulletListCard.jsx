import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function BulletListCard({ title, icon: Icon, items = [], emptyText = 'None found — nice.', tone = 'default' }) {
  const dotColor = {
    default: 'bg-ink-300',
    danger: 'bg-status-danger',
    warning: 'bg-status-warning',
  }[tone];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {Icon && <Icon size={16} className="text-ink-400" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-ink-400">{emptyText}</p>
        ) : (
          <ul className="space-y-2.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-ink-100">
                <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', dotColor)} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
