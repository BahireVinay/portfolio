import React, { useState } from 'react';
import { SkillCategory, SkillItem } from '../types/portfolio';
import { Terminal, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  isDark: boolean;
  onFilterByProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories,
  isDark,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'frontend');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(categories[0]?.skills[0] || null);

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 block">
          Technical Arsenal &amp; Disciplines
        </span>
        <h2
          className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-4 ${
            isDark ? 'text-zinc-100' : 'text-zinc-900'
          }`}
        >
          Specialized depth across the entire compute stack.
        </h2>
        <p className={`text-base ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Rigorous engineering standards applied from kernel-level distributed primitives to sub-pixel UI rendering pipelines.
        </p>
      </div>

      {/* Category Tabs: Segmented Buttons */}
      <div
        className={`flex items-center gap-1.5 p-1 rounded-xl border mb-8 overflow-x-auto ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
        }`}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedSkill(cat.skills[0] || null);
            }}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? isDark
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                  : 'bg-white text-zinc-950 font-semibold shadow-sm'
                : isDark
                ? 'text-zinc-400 hover:text-zinc-200'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Skills Matrix + Interactive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skills List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono text-zinc-500 mb-2">
            {currentCategory?.summary}
          </div>

          {currentCategory?.skills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-zinc-900 border-sky-500/70 shadow-sm'
                      : 'bg-white border-sky-500 shadow-sm'
                    : isDark
                    ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold tracking-tight font-display ${
                        isDark ? 'text-zinc-100' : 'text-zinc-900'
                      }`}
                    >
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      ({skill.years})
                    </span>
                  </div>

                  <span className="text-xs font-mono tabular-nums text-sky-400 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-zinc-800/80 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-sky-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Highlight unboxed text */}
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {skill.highlight}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Skill Inspector */}
        <div className="lg:col-span-5 sticky top-24">
          <div
            className={`p-6 rounded-2xl border ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60 mb-5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Skill Inspector
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Active Benchmark
              </span>
            </div>

            {selectedSkill ? (
              <div className="space-y-5">
                <div>
                  <h3
                    className={`text-xl font-bold font-display tracking-tight mb-1 ${
                      isDark ? 'text-zinc-100' : 'text-zinc-900'
                    }`}
                  >
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span>Experience: {selectedSkill.years}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-sky-400">Mastery: {selectedSkill.level}/100</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
                  isDark ? 'bg-black/60 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}>
                  <div className="text-zinc-500 mb-1">// Production application pattern</div>
                  <div>{selectedSkill.highlight}</div>
                </div>

                <div>
                  <span className="text-xs font-mono text-zinc-500 block mb-2">
                    Used In Core Projects
                  </span>
                  <div className="space-y-1.5">
                    {selectedSkill.associatedProjects.length > 0 ? (
                      selectedSkill.associatedProjects.map((projId) => (
                        <a
                          key={projId}
                          href="#projects"
                          className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-colors ${
                            isDark
                              ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-300 hover:text-white'
                              : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50 text-zinc-700 hover:text-black'
                          }`}
                        >
                          <span className="font-medium capitalize">{projId.replace('-', ' ')}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </a>
                      ))
                    ) : (
                      <span className="text-xs text-zinc-500 font-mono">
                        Integrated across cross-functional infrastructure
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs font-mono text-zinc-500">
                Select any skill to inspect architectural invariants
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
