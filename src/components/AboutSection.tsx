import React from 'react';
import { ProfileData } from '../types/portfolio';
import { Database, BarChart2, Search, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: ProfileData;
  isDark: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, isDark }) => {
  const getPillarIcon = (idx: string) => {
    switch (idx) {
      case '01':
        return <Database className="w-5 h-5 text-sky-400" />;
      case '02':
        return <Search className="w-5 h-5 text-emerald-400" />;
      default:
        return <BarChart2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="about" className={`py-20 border-t ${isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 block">
            Background &amp; Overview
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-6 ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            Engineering data solutions with clarity and precision.
          </h2>
          <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {profile.bioNarrative.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* 3 Pillars Grid with Single-Elevation Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {profile.pillars.map((pillar) => (
            <div
              key={pillar.index}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isDark
                  ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/90 hover:bg-zinc-900/70'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    {getPillarIcon(pillar.index)}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 font-semibold">
                    {pillar.index}
                  </span>
                </div>

                <h3
                  className={`text-lg font-bold font-display mb-3 tracking-tight ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  {pillar.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Core Area</span>
                <span className="text-emerald-400">Practical Application</span>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Academic Rigor Grid (CGPA 7.30, NO specialization tags) */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <h3
              className={`text-xl font-bold font-display tracking-tight ${
                isDark ? 'text-zinc-100' : 'text-zinc-900'
              }`}
            >
              Academic Background
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.education.map((edu, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-200 ${
                  isDark
                    ? 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>{edu.period}</span>
                  <span className="font-bold text-sky-400">{edu.grade}</span>
                </div>

                <h4
                  className={`text-base font-bold font-display tracking-tight mb-1 ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  {edu.institution}
                </h4>

                <p className="text-xs font-mono text-zinc-400 mb-3">
                  {edu.degree}
                </p>

                {edu.details && (
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Verified Certifications Bar */}
        <div
          className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono ${
            isDark
              ? 'bg-zinc-900/40 border-zinc-800 text-zinc-300'
              : 'bg-zinc-100/80 border-zinc-200 text-zinc-700'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-zinc-200">Certifications:</span>
            <span>UC Davis SQL for Data Science</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>Microsoft PL-300 Candidate</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>AICTE Virtual Internship</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Credentials Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
