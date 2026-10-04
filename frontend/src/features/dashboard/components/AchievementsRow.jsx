import { FiAward } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TIER_COLOR = {
  bronze: 'from-amber-700 to-amber-500',
  silver: 'from-slate-400 to-slate-300',
  gold: 'from-streak-500 to-streak-400',
  platinum: 'from-signal-600 to-signal-400',
};

export function AchievementsRow({ achievements = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <p className="text-sm text-ink-400">Complete tasks and hit streaks to start earning badges.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {achievements.map((badge) => (
              <div key={badge._id} className="flex w-20 flex-col items-center text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${TIER_COLOR[badge.tier]} text-white`}>
                  <FiAward size={18} />
                </div>
                <p className="mt-2 line-clamp-2 text-[11px] font-medium text-ink-700 dark:text-ink-100">{badge.title}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
