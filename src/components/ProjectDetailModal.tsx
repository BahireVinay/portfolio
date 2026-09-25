import React, { useEffect, useState } from 'react';
import { Project } from '../types/portfolio';
import { X, ArrowUpRight, Github, CheckCircle2, ShieldCheck, Activity, Cpu } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  isDark,
}) => {
  // Interactive simulator states
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'architecture' | 'simulator'>('architecture');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/70 animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              {project.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-xs font-mono text-zinc-400">{project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  : 'border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mb-2">
              {project.title}
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {project.tagline}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'architecture'
                  ? isDark
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'bg-zinc-200 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Architecture &amp; Invariants
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? isDark
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'bg-zinc-200 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>Interactive Simulator</span>
            </button>
          </div>

          {activeTab === 'architecture' ? (
            <>
              {/* Summary & Challenge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Core Engineering Challenge
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {project.challenge}
                  </p>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    Architectural Solution
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Architectural Breakdown Points */}
              <div>
                <h3 className="text-sm font-semibold font-display mb-3">
                  Architectural Specifications &amp; Invariants
                </h3>
                <div className="space-y-2.5">
                  {project.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${
                        isDark ? 'bg-zinc-900/30 border-zinc-800/80 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmarks & Performance Metrics */}
              <div>
                <h3 className="text-sm font-semibold font-display mb-3">
                  Production Invariants &amp; Benchmarks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-center ${
                        isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <span className="text-xl font-bold font-mono tabular-nums block text-sky-400">
                        {metric.value}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 mt-1 block">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Interactive Sandbox / Simulator */
            <div className={`p-6 rounded-2xl border space-y-6 ${
              isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold font-display">
                    Interactive Parameter Tweaker
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Modulate live parameters and observe the architectural response
                  </p>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                  Val: {sliderVal}
                </span>
              </div>

              {/* Slider Control */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Throughput / Variable Scaling</span>
                  <span>{sliderVal * 20} units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              {/* Live Simulated Output Box */}
              <div className="p-4 rounded-xl bg-black border border-zinc-800 font-mono text-xs space-y-2">
                <div className="text-zinc-500">// Real-time simulation readout</div>
                <div className="text-emerald-400">
                  → Pipeline Status: ACTIVE (Nominal backpressure)
                </div>
                <div className="text-zinc-300">
                  → Calculated FPS / Latency: {(60 - (sliderVal * 0.04)).toFixed(1)} fps · {(sliderVal * 0.08).toFixed(2)}ms P99
                </div>
                <div className="text-zinc-300">
                  → Simulated Heap Usage: {(22 + (sliderVal * 0.15)).toFixed(1)} MB peak
                </div>
                <div className="text-sky-400">
                  → Verification Invariant: VALIDATED (0 dropped frames)
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Unboxed Text */}
          <div className="pt-4 border-t border-zinc-800/60">
            <span className="text-xs font-mono text-zinc-500 block mb-2">Technologies &amp; Protocols</span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-zinc-400">
              {project.techStack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="text-zinc-300">{tech}</span>
                  {i < project.techStack.length - 1 && <span aria-hidden="true" className="opacity-40">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800/80 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  isDark
                    ? 'border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
                    : 'border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              isDark ? 'bg-zinc-100 text-zinc-950 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-black'
            }`}
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
};
