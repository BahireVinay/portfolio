import React, { useState, useEffect } from 'react';
import { Sun, Moon, FileText, Sliders, Menu, X } from 'lucide-react';

interface NavbarProps {
  name: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenCustomize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenCustomize,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Milestones', href: '#milestones' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        scrolled
          ? isDark
            ? 'bg-zinc-950/85 backdrop-blur-md border-zinc-800/80 shadow-md shadow-black/20'
            : 'bg-white/85 backdrop-blur-md border-zinc-200/80 shadow-sm'
          : isDark
          ? 'bg-transparent border-transparent'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className={`text-lg font-bold tracking-tight transition-colors font-display whitespace-nowrap shrink-0 ${
            isDark ? 'text-zinc-100 hover:text-white' : 'text-zinc-900 hover:text-black'
          }`}
        >
          {name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-1 transition-colors whitespace-nowrap ${
                isDark
                  ? 'text-zinc-400 hover:text-zinc-100'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 rounded-lg transition-colors border ${
              isDark
                ? 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200 hover:text-black'
            }`}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenCustomize}
            aria-label="Customize profile details"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors border ${
              isDark
                ? 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200 hover:text-black'
            }`}
            title="Edit profile & data"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Edit Profile</span>
          </button>

          <button
            type="button"
            onClick={onOpenResume}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors shadow-sm ${
              isDark
                ? 'bg-zinc-100 text-zinc-950 hover:bg-white'
                : 'bg-zinc-900 text-white hover:bg-black'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Resume</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`md:hidden p-2 rounded-lg border ${
              isDark
                ? 'bg-zinc-900 text-zinc-300 border-zinc-800'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-4 border-b transition-colors ${
            isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-zinc-700 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-800/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomize();
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border ${
                  isDark
                    ? 'bg-zinc-900 text-zinc-300 border-zinc-800'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
