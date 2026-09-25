import React, { useState, useEffect, useRef } from 'react';
import { ProfileData, Project, Achievement, SkillCategory } from '../types/portfolio';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  profile: ProfileData;
  projects: Project[];
  achievements: Achievement[];
  skills: SkillCategory[];
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  profile,
  projects,
  achievements,
  skills,
  isOpen,
  onClose,
  isDark,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'whoami',
      output: (
        <div>
          <span className="text-emerald-400 font-bold">{profile.name}</span> — {profile.title}
          <div className="text-zinc-400 text-xs mt-1">{profile.bioHeadline}</div>
        </div>
      ),
    },
    {
      command: 'help',
      output: (
        <div className="space-y-1 text-xs text-zinc-400">
          <div>Available shell utilities:</div>
          <div>  <span className="text-sky-400 font-bold">whoami</span>    - Executive identity &amp; role</div>
          <div>  <span className="text-sky-400 font-bold">education</span> - Degrees &amp; academic background</div>
          <div>  <span className="text-sky-400 font-bold">projects</span>  - List production architecture systems</div>
          <div>  <span className="text-sky-400 font-bold">skills</span>    - Core technical capabilities</div>
          <div>  <span className="text-sky-400 font-bold">awards</span>    - Hackathons, grants &amp; milestones</div>
          <div>  <span className="text-sky-400 font-bold">contact</span>   - Email &amp; direct coordinates</div>
          <div>  <span className="text-sky-400 font-bold">clear</span>     - Clear terminal buffer</div>
          <div>  <span className="text-sky-400 font-bold">exit</span>      - Exit shell session</div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
      case 'quit':
        onClose();
        return;
      case 'whoami':
        output = (
          <div>
            <span className="text-emerald-400 font-bold">{profile.name}</span> — {profile.title}
            <div className="text-zinc-400 text-xs mt-1">{profile.location} · {profile.email}</div>
          </div>
        );
        break;
      case 'education':
      case 'college':
        output = (
          <div className="space-y-2 text-xs">
            {profile.education.map((e, idx) => (
              <div key={idx}>
                <span className="text-sky-400 font-bold">{e.institution}</span> [{e.period}]
                <div className="text-zinc-300">{e.degree} — <span className="text-emerald-400">{e.grade}</span></div>
                {e.details && <div className="text-zinc-500">{e.details}</div>}
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            {projects.map((p) => (
              <div key={p.id}>
                <span className="text-sky-400 font-bold">{p.title}</span> [{p.year}]
                <div className="text-zinc-400">{p.tagline}</div>
                <div className="text-zinc-500 font-mono">Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            {skills.map((c) => (
              <div key={c.id}>
                <span className="text-amber-400 font-bold">{c.name}:</span>
                <div className="text-zinc-400">
                  {c.skills.map((s) => `${s.name} (${s.level}%)`).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case 'awards':
      case 'achievements':
      case 'milestones':
        output = (
          <div className="space-y-2 text-xs">
            {achievements.map((a) => (
              <div key={a.id}>
                <span className="text-emerald-400 font-bold">{a.year}</span> — {a.title} ({a.issuer})
                <div className="text-zinc-400">{a.metric}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'contact':
      case 'email':
        output = (
          <div className="text-xs text-zinc-300">
            <div>Email: <a href={`mailto:${profile.email}`} className="text-sky-400 underline">{profile.email}</a></div>
            <div>GitHub: <span className="text-zinc-400">{profile.socials.github}</span></div>
            <div>X/Twitter: <span className="text-zinc-400">{profile.socials.twitter}</span></div>
          </div>
        );
        break;
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-zinc-400">
            <div>Commands: whoami, projects, skills, awards, contact, clear, exit</div>
          </div>
        );
        break;
      default:
        output = (
          <div className="text-rose-400 text-xs">
            Command not recognized: &apos;{cmd}&apos;. Type <span className="text-white underline">help</span> for assistance.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/75 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl h-[520px] flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-zinc-100">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-zinc-400 ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              vinay@workstation:~ (interactive shell)
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal window"
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div className="text-zinc-500 text-xs">
            Type <span className="text-sky-400 font-bold">help</span> to list commands or inspect systems.
          </div>

          {history.map((log, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400">vinay@system:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
              </div>
              <div className="pl-4 py-1">{log.output}</div>
            </div>
          ))}

          {/* Active Command Prompt Input */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 shrink-0 font-bold">vinay@system:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono placeholder:text-zinc-700"
              placeholder="type 'help' or any command..."
            />
            <button type="submit" aria-label="Submit command" className="text-zinc-600 hover:text-zinc-300">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
