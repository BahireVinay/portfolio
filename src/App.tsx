import React, { useState, useEffect } from 'react';
import {
  initialProfileData,
  initialProjects,
  initialAchievements,
  initialSkillCategories,
} from './data/portfolioData';
import { ProfileData, Project } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { TerminalModal } from './components/TerminalModal';
import { SpotlightCursor } from './components/SpotlightCursor';
import { PageLoader } from './components/PageLoader';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Theme state: dark default for sleek high-tech minimalism
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Profile data state with local storage persistence and version check
  const [profile, setProfile] = useState<ProfileData>(() => {
    const version = localStorage.getItem('portfolio_version');
    if (version !== '2.2') {
      // Refresh to latest updated data (Minimal intro, TCS limited to intro only)
      localStorage.setItem('portfolio_version', '2.2');
      localStorage.setItem('portfolio_profile', JSON.stringify(initialProfileData));
      return initialProfileData;
    }
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProfileData;
      }
    }
    return initialProfileData;
  });

  const [projects] = useState<Project[]>(initialProjects);
  const [achievements] = useState(initialAchievements);
  const [skills] = useState(initialSkillCategories);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Sync theme changes to document & localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem('portfolio_profile', JSON.stringify(updated));
  };

  const handleResetProfile = () => {
    setProfile(initialProfileData);
    localStorage.setItem('portfolio_profile', JSON.stringify(initialProfileData));
  };

  return (
    <>
      {/* 3-Second Smooth Aesthetic Page Loader */}
      {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}

      {/* Screen Scroll Progress Indicator */}
      <ScrollProgressBar />

      <div
        className={`min-h-screen transition-colors duration-300 relative selection:bg-sky-500/30 selection:text-sky-200 ${
          isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fafaf9] text-zinc-900'
        }`}
      >
        {/* Ambient Spotlight Follower (compositor-only, zero lag) */}
        <SpotlightCursor isDark={isDark} />

        {/* Top Bar Navigation (Strict 3-Zone Contract) */}
        <Navbar
          name={profile.name}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        {/* Main Content Sections with Smooth Transitions */}
        <main className="relative z-10 transition-opacity duration-700">
          <HeroSection
            profile={profile}
            isDark={isDark}
            onOpenContact={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenTerminalView={() => setIsTerminalOpen(true)}
          />

          <AboutSection
            profile={profile}
            isDark={isDark}
          />

          <ProjectsSection
            projects={projects}
            isDark={isDark}
            onSelectProject={(project) => setSelectedProject(project)}
          />

          <AchievementsSection achievements={achievements} isDark={isDark} />

          <SkillsSection categories={skills} isDark={isDark} />

          <ContactSection profile={profile} isDark={isDark} />
        </main>

        {/* Footer */}
        <Footer profile={profile} isDark={isDark} />

        {/* Interactive Modals & Drawers */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
        />

        <ResumeModal
          profile={profile}
          projects={projects}
          achievements={achievements}
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          isDark={isDark}
        />

        <EditProfileModal
          profile={profile}
          isOpen={isCustomizeOpen}
          onClose={() => setIsCustomizeOpen(false)}
          onSave={handleSaveProfile}
          onReset={handleResetProfile}
          isDark={isDark}
        />

        <TerminalModal
          profile={profile}
          projects={projects}
          achievements={achievements}
          skills={skills}
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          isDark={isDark}
        />
      </div>
    </>
  );
}
