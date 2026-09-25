import React from 'react';
import { Achievement } from '../types/portfolio';
import { Award, GitPullRequest, TrendingUp, BookOpen } from 'lucide-react';

interface AchievementsSectionProps {
  achievements: Achievement[];
  isDark: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  isDark,
}) => {
  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'Award':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'Open Source':
        return <GitPullRequest className="w-4 h-4 text-emerald-400" />;
      case 'Architecture':
        return <TrendingUp className="w-4 h-4 text-sky-400" />;
      case 'Publication':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="milestones" className={`py-20 border-t ${isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 block">
            Recognitions &amp; Quantifiable Milestones
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            Milestones grounded in measurable impact.
          </h2>
        </div>

        {/* Editorial Timeline / List with Tabular Figures */}
        <div className="space-y-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isDark
                  ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
              }`}
            >
              {/* Left Zone: Year, Icon, Title, Context */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span className={`text-base font-bold font-mono tabular-nums ${
                    isDark ? 'text-zinc-300' : 'text-zinc-900'
                  }`}>
                    {item.year}
                  </span>
                  <div className="mt-2 p-2 rounded-lg bg-zinc-800/40 border border-zinc-700/40">
                    {getCategoryIcon(item.category)}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {/* Unboxed metadata: Category · Issuer */}
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="text-zinc-300 font-medium">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.issuer}</span>
                  </div>

                  <h3
                    className={`text-base sm:text-lg font-bold font-display tracking-tight ${
                      isDark ? 'text-zinc-100' : 'text-zinc-900'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    {item.context}
                  </p>
                </div>
              </div>

              {/* Right Zone: Quantitative Metric */}
              <div className="md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800/50">
                <span className={`text-sm sm:text-base font-bold font-mono tabular-nums block ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {item.metric}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 mt-0.5 block">
                  Verified Outcome
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
