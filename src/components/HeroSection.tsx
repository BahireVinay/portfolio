import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Copy, Check, Terminal, Mail } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ProfileAvatar } from './ProfileAvatar';

interface HeroSectionProps {
  profile: ProfileData;
  isDark: boolean;
  onOpenContact: () => void;
  onOpenTerminalView: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  isDark,
  onOpenContact,
  onOpenTerminalView,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10">
          {/* Initial Profile Image Only (Minimal & Prominent) */}
          <div className="shrink-0">
            <ProfileAvatar
              avatarUrl={profile.avatarUrl}
              name={profile.name}
              isDark={isDark}
              size="xl"
              className="mx-auto"
            />
          </div>

          {/* Minimal Clean Details */}
          <div className="flex-1 space-y-4">
            {/* TCS mention limited strictly to this clean intro badge */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-300 font-semibold">{profile.title}</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>{profile.location}</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="text-emerald-400 font-medium">B.E. (CGPA: 7.30)</span>
            </div>

            {/* Name */}
            <h1
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-display ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {profile.name}
            </h1>

            {/* Minimal Bio Headline */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Information Technology graduate from I²IT Pune. Working with SQL relational databases, Python data wrangling, and Power BI dashboards.
            </p>

            {/* Minimal Clean Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg transition-transform duration-150 hover:-translate-y-0.5 shadow-sm ${
                  isDark
                    ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                    : 'bg-zinc-950 text-white hover:bg-zinc-800'
                }`}
              >
                <span>View Projects</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onOpenContact}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-zinc-900/80 text-zinc-200 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                    : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200 hover:text-black'
                }`}
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-zinc-950/60 text-zinc-400 border-zinc-800/80 hover:text-zinc-200 hover:border-zinc-700'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:text-zinc-900'
                }`}
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : profile.email}</span>
              </button>

              <button
                type="button"
                onClick={onOpenTerminalView}
                aria-label="Open CLI developer terminal preview"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-zinc-950/40 text-zinc-400 border-zinc-800 hover:text-white'
                    : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:text-zinc-900'
                }`}
                title="Developer CLI Terminal View"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>cli</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Unboxed Metrics Row */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-6 border-t ${
            isDark ? 'border-zinc-800/60' : 'border-zinc-200'
          }`}
        >
          {profile.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col text-center sm:text-left">
              <span
                className={`text-xl font-bold font-mono tabular-nums ${
                  isDark ? 'text-zinc-200' : 'text-zinc-900'
                }`}
              >
                {metric.value}
              </span>
              <span className="text-xs text-zinc-400 mt-0.5 font-mono">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
