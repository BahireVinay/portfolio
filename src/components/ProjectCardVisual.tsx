import React from 'react';
import { Project } from '../types/portfolio';

interface ProjectCardVisualProps {
  project: Project;
  isDark: boolean;
}

export const ProjectCardVisual: React.FC<ProjectCardVisualProps> = ({ project, isDark }) => {
  switch (project.id) {
    case 'sales-performance-dashboard':
      // Power BI Sales & Margin Dashboard Visual
      return (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xl bg-zinc-950 flex flex-col justify-between p-4 border border-zinc-800/80">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
              <span className="text-xs font-mono font-bold text-zinc-200">Revenue Performance Matrix</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">+24.8% Growth</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2">
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-500 block">Total Sales</span>
              <span className="text-xs font-mono font-bold text-sky-400">$1.84M</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-500 block">Margin</span>
              <span className="text-xs font-mono font-bold text-emerald-400">32.6%</span>
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-500 block">Visual Tool</span>
              <span className="text-xs font-mono font-bold text-amber-400">Power BI</span>
            </div>
          </div>

          {/* Bar Chart Mockup */}
          <div className="flex items-end gap-2 h-14 pt-1">
            {[45, 65, 80, 55, 90, 75, 100, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-zinc-900 rounded-t h-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-sky-500/80 to-sky-400 rounded-t"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/80">
            <span>Star Schema &amp; Measures</span>
            <span className="text-zinc-300">Clean Interactive Slicers</span>
          </div>
        </div>
      );

    case 'sql-data-analysis':
      // SQL Queries & Relational Analysis Terminal
      return (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xl bg-zinc-950 flex flex-col justify-between p-4 border border-zinc-800/80 font-mono">
          <div className="flex items-center justify-between text-xs text-emerald-400 border-b border-zinc-800/80 pb-2">
            <span>MySQL · Relational Query Inspection</span>
            <span className="text-[10px] text-zinc-400">Status: OK</span>
          </div>

          <div className="text-[11px] space-y-1 text-zinc-300 bg-zinc-900/60 p-2.5 rounded border border-zinc-800/80 overflow-hidden">
            <div><span className="text-sky-400 font-bold">SELECT</span> c.category_name, <span className="text-amber-400 font-bold">COUNT</span>(o.order_id)</div>
            <div className="pl-3 text-zinc-400"><span className="text-sky-400">FROM</span> categories c <span className="text-sky-400">JOIN</span> products p <span className="text-sky-400">ON</span> c.id = p.cat_id</div>
            <div className="pl-3 text-zinc-400"><span className="text-sky-400">JOIN</span> orders o <span className="text-sky-400">ON</span> p.id = o.prod_id</div>
            <div><span className="text-sky-400 font-bold">GROUP BY</span> c.category_name <span className="text-sky-400 font-bold">HAVING</span> count &gt; 50;</div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
            <span className="text-emerald-400 font-bold">Multi-Table Joins</span>
            <span>Accurate Aggregations</span>
          </div>
        </div>
      );

    case 'python-data-wrangling':
      // Python & Pandas Data Wrangling Visual
      return (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xl bg-zinc-950 flex flex-col justify-between p-4 border border-zinc-800/80 font-mono">
          <div className="flex items-center justify-between text-xs text-sky-400 border-b border-zinc-800/80 pb-2">
            <span>Python 3 · Pandas Scripting</span>
            <span className="text-[10px] text-zinc-400">data_cleaning.py</span>
          </div>

          <div className="text-[11px] space-y-1 text-zinc-300 bg-zinc-900/60 p-2.5 rounded border border-zinc-800/80 overflow-hidden">
            <div><span className="text-sky-400">import</span> pandas <span className="text-sky-400">as</span> pd</div>
            <div>df = pd.<span className="text-amber-400">read_csv</span>(&apos;sales_records.csv&apos;)</div>
            <div>df.<span className="text-emerald-400">dropna</span>(subset=[&apos;revenue&apos;], inplace=<span className="text-amber-400">True</span>)</div>
            <div>df[&apos;margin&apos;] = df[&apos;revenue&apos;] - df[&apos;cost&apos;]</div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
            <span>Data Wrangling</span>
            <span className="text-sky-400">Normalized Datasets</span>
          </div>
        </div>
      );

    case 'aicte-internship':
      // Data Cleaning & Statistical EDA
      return (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xl bg-zinc-950 flex flex-col justify-between p-4 border border-zinc-800/80">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-xs font-mono font-bold text-purple-400">AICTE Data Science Internship</span>
            <span className="text-[10px] font-mono text-emerald-400">Validated</span>
          </div>

          <svg className="w-full h-20" viewBox="0 0 300 80" fill="none">
            {/* Bell curve & variance visualization */}
            <path
              d="M 10 75 Q 80 75, 120 40 T 150 15 T 180 40 T 290 75"
              stroke="#a855f7"
              strokeWidth="2"
              fill="rgba(168, 85, 247, 0.15)"
            />
            <line x1="150" y1="15" x2="150" y2="75" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="150" cy="15" r="3" fill="#c084fc" />
            <text x="160" y="25" fill="#e9d5ff" fontSize="9" fontFamily="JetBrains Mono">Dataset Analysis</text>
          </svg>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
            <span>Exploratory Analysis</span>
            <span className="text-purple-300">Structured Reporting</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-xl bg-zinc-950 flex items-center justify-center p-4 border border-zinc-800/80">
          <div className="text-center font-mono text-xs text-zinc-400">
            <span className="block font-semibold text-zinc-200 mb-1">{project.title}</span>
            <span>Analytics &amp; Data Pipeline Architecture</span>
          </div>
        </div>
      );
  }
};
