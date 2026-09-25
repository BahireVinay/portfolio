import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { ProjectCardVisual } from './ProjectCardVisual';
import { ArrowUpRight, Code, Layers, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  isDark: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isDark,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'systems' | 'frontend' | 'tools'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header & Interactive Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 block">
            Selected Works & Systems
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            Engineering depth meets tactile execution.
          </h2>
        </div>

        {/* Filter Tabs / Segmented Control: Functional Buttons with Click Handlers */}
        <div
          className={`flex items-center gap-1 p-1 rounded-xl border self-start md:self-auto overflow-x-auto max-w-full ${
            isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
          }`}
        >
          {[
            { id: 'all', label: 'All Works' },
            { id: 'systems', label: 'Systems & Edge' },
            { id: 'frontend', label: 'Creative & WebGL' },
            { id: 'tools', label: 'Developer Tools' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === tab.id
                  ? isDark
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : isDark
                  ? 'text-zinc-400 hover:text-zinc-200'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const isLarge = project.featured && filter === 'all';
          const colSpanClass = isLarge ? 'col-span-12 lg:col-span-8' : 'col-span-12 md:col-span-6 lg:col-span-4';

          return (
            <div
              key={project.id}
              className={`${colSpanClass} flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-200 group ${
                isDark
                  ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                  : 'bg-white border-zinc-200/90 hover:border-zinc-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Visual Art/Preview Element */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <ProjectCardVisual project={project} isDark={isDark} />
                </div>

                {/* Metadata Row: Zero-Pill discipline (clean unboxed text) */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
                  <span className="font-medium text-zinc-300">{project.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>

                {/* Title & Tagline */}
                <h3
                  className={`text-xl font-bold font-display tracking-tight mb-2 ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  {project.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {project.tagline}
                </p>

                {/* Quantitative Metric Highlights */}
                <div className={`grid grid-cols-2 gap-3 py-3 mb-4 border-y ${
                  isDark ? 'border-zinc-800/70' : 'border-zinc-100'
                }`}>
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx}>
                      <span className={`text-sm font-bold font-mono tabular-nums block ${
                        isDark ? 'text-zinc-200' : 'text-zinc-800'
                      }`}>
                        {m.value}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack: Clean Unboxed Text with Separators */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-zinc-500 mb-6">
                  {project.techStack.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {i < project.techStack.length - 1 && <span aria-hidden="true" className="opacity-40">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Functional Handlers */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 transition-colors ${
                    isDark ? 'text-white hover:text-sky-400' : 'text-zinc-950 hover:text-sky-600'
                  }`}
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          : 'border-zinc-200 text-zinc-600 hover:text-black'
                      }`}
                      title="View GitHub Repository"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`${project.title} live demo and inspection`}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          : 'border-zinc-200 text-zinc-600 hover:text-black'
                      }`}
                      title="Interactive Simulator"
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
