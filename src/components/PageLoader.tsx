import React, { useEffect, useState, useRef } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing Workspace...');
  const [isFading, setIsFading] = useState<boolean>(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const TOTAL_DURATION = 3000; // 3 seconds smooth span
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const elapsed = currentTime - startTimeRef.current;
      const rawProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

      // Smooth cubic easing for high-end luxury feel
      const easedProgress = Math.floor(rawProgress);
      setProgress(easedProgress);

      if (easedProgress < 30) {
        setStatusMessage('Connecting Workspace Environment...');
      } else if (easedProgress < 65) {
        setStatusMessage('Loading Analytics & Project Schemas...');
      } else if (easedProgress < 90) {
        setStatusMessage('Finalizing Workspace Interface...');
      } else {
        setStatusMessage('System Ready · Welcome');
      }

      if (elapsed < TOTAL_DURATION) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setStatusMessage('System Ready · Welcome');
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.07) 0%, transparent 60%)',
      }}
    >
      <div className="w-full max-w-sm px-8 flex flex-col items-center">
        {/* Minimal luxury monogram with gentle double-ring pulse */}
        <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border border-sky-400/20 animate-pulse duration-1000" />
          <div className="absolute -inset-1.5 rounded-2xl border border-sky-500/10 animate-ping duration-1000 opacity-20" />
          <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/90 flex items-center justify-center font-mono font-bold text-sky-400 text-base shadow-2xl shadow-sky-500/10">
            <span className="font-display font-extrabold tracking-tight">VB</span>
          </div>
        </div>

        {/* Wordmark & Title without TCS emphasis */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-display tracking-tight text-zinc-100">
            Vinay Bahire
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1.5 tracking-wider uppercase">
            Data Analytics · Engineering Portfolio
          </p>
        </div>

        {/* 3-Second Silky Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800/80 rounded-full overflow-hidden mb-4 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 rounded-full transition-all duration-75 ease-out shadow-sm shadow-sky-400/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress readout & status step */}
        <div className="flex items-center justify-between w-full text-xs font-mono text-zinc-400">
          <span className="truncate pr-2 text-zinc-400">{statusMessage}</span>
          <span className="text-sky-400 font-semibold tabular-nums shrink-0">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
