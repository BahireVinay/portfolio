import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ profile, isDark }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t py-12 transition-colors ${
        isDark ? 'border-zinc-800/80 bg-zinc-950 text-zinc-400' : 'border-zinc-200 bg-white text-zinc-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
              {profile.name}
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>© {new Date().getFullYear()}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="hidden sm:inline">Crafted with intentional minimalism &amp; zero slop</span>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="flex items-center gap-6 text-xs font-mono">
            <a
              href="#about"
              className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
            >
              About
            </a>
            <a
              href="#projects"
              className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
            >
              Skills
            </a>
            <a
              href="#contact"
              className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
            >
              Contact
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className={`p-2 rounded-lg border transition-colors flex items-center gap-1 ${
                isDark
                  ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:text-white'
                  : 'border-zinc-200 hover:border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-black'
              }`}
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
