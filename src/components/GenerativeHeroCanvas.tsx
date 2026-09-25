import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RefreshCw, Layers } from 'lucide-react';

type VisualMode = 'waves' | 'constellation' | 'wireframe';

interface GenerativeHeroCanvasProps {
  accentColor?: string;
  isDark?: boolean;
}

export const GenerativeHeroCanvas: React.FC<GenerativeHeroCanvasProps> = ({
  accentColor = '#38bdf8',
  isDark = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<VisualMode>('waves');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const timeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles for constellation
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 400),
      y: Math.random() * (height || 400),
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      if (isPlaying) {
        timeRef.current += 0.015;
      }

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const baseStroke = isDark ? 'rgba(255, 255, 255,' : 'rgba(15, 23, 42,';

      if (mode === 'waves') {
        // Multi-layered parametric sine wave ribbon
        const lines = 7;
        const segments = 60;
        const stepX = width / segments;

        for (let i = 0; i < lines; i++) {
          const progress = i / lines;
          const alpha = 0.12 + progress * 0.45;
          const offsetY = height * 0.3 + (progress * height * 0.4);

          ctx.beginPath();
          ctx.strokeStyle = i === lines - 1 
            ? accentColor 
            : `${baseStroke} ${alpha})`;
          ctx.lineWidth = i === lines - 1 ? 2 : 1;

          for (let s = 0; s <= segments; s++) {
            const x = s * stepX;
            const distFromMouse = Math.hypot(x - mouseRef.current.x, offsetY - mouseRef.current.y);
            const mouseInfluence = Math.max(0, 1 - distFromMouse / 180) * 45;

            const wave1 = Math.sin(s * 0.12 + timeRef.current + i * 0.4) * 22;
            const wave2 = Math.cos(s * 0.06 - timeRef.current * 0.8 + i * 0.2) * 16;
            const y = offsetY + wave1 + wave2 - mouseInfluence;

            if (s === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

        // Draw ambient glow dot at focal crest
        const focusX = width * 0.5 + Math.sin(timeRef.current * 0.5) * (width * 0.25);
        const focusY = height * 0.5 + Math.cos(timeRef.current * 0.7) * 40;
        ctx.beginPath();
        ctx.arc(focusX, focusY, 4, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(focusX, focusY, 12, 0, Math.PI * 2);
        ctx.fillStyle = `${accentColor}22`;
        ctx.fill();

      } else if (mode === 'constellation') {
        // Connected particle network
        const maxDist = 95;

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          if (isPlaying) {
            p1.x += p1.vx;
            p1.y += p1.vy;

            // Bounce on boundaries
            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;
          }

          // Mouse attraction
          const dx = mouseRef.current.x - p1.x;
          const dy = mouseRef.current.y - p1.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 1) {
            p1.x += (dx / dist) * 0.6;
            p1.y += (dy / dist) * 0.6;
          }

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (d < maxDist) {
              const alpha = (1 - d / maxDist) * 0.45;
              ctx.beginPath();
              ctx.strokeStyle = `${baseStroke} ${alpha})`;
              ctx.lineWidth = 1;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fillStyle = i % 4 === 0 ? accentColor : `${baseStroke} 0.75)`;
          ctx.fill();
        }

      } else if (mode === 'wireframe') {
        // Isometric rotating 3D wireframe mesh
        const gridSize = 9;
        const spacing = Math.min(width, height) / (gridSize + 2);
        const centerX = width / 2;
        const centerY = height / 2;
        const angle = timeRef.current * 0.4;

        ctx.strokeStyle = `${baseStroke} 0.25)`;
        ctx.lineWidth = 1;

        for (let ix = -gridSize / 2; ix <= gridSize / 2; ix++) {
          ctx.beginPath();
          for (let iy = -gridSize / 2; iy <= gridSize / 2; iy++) {
            // Isometric projection with height modulation
            const rotX = ix * Math.cos(angle) - iy * Math.sin(angle);
            const rotY = ix * Math.sin(angle) + iy * Math.cos(angle);

            const elevation = Math.sin(Math.hypot(ix, iy) * 1.2 - timeRef.current * 2) * 22;
            const px = centerX + (rotX - rotY) * (spacing * 0.85);
            const py = centerY + (rotX + rotY) * (spacing * 0.45) - elevation;

            if (iy === -gridSize / 2) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }

        for (let iy = -gridSize / 2; iy <= gridSize / 2; iy++) {
          ctx.beginPath();
          for (let ix = -gridSize / 2; ix <= gridSize / 2; ix++) {
            const rotX = ix * Math.cos(angle) - iy * Math.sin(angle);
            const rotY = ix * Math.sin(angle) + iy * Math.cos(angle);

            const elevation = Math.sin(Math.hypot(ix, iy) * 1.2 - timeRef.current * 2) * 22;
            const px = centerX + (rotX - rotY) * (spacing * 0.85);
            const py = centerY + (rotX + rotY) * (spacing * 0.45) - elevation;

            if (ix === -gridSize / 2) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mode, isPlaying, accentColor, isDark]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
  };

  const cycleMode = () => {
    const modes: VisualMode[] = ['waves', 'constellation', 'wireframe'];
    const nextIdx = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIdx]);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border transition-colors ${
        isDark
          ? 'bg-zinc-950/80 border-zinc-800/80'
          : 'bg-white/80 border-zinc-200/90 shadow-sm'
      }`}
    >
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Interactive canvas element */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full cursor-crosshair" />

      {/* Floating minimal interactive controls */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1 rounded-lg backdrop-blur-md border transition-colors bg-zinc-900/60 border-zinc-700/50 text-zinc-300">
        <button
          type="button"
          onClick={cycleMode}
          aria-label="Switch generative visual mode"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded hover:bg-zinc-800 hover:text-white transition-colors"
          title={`Mode: ${mode}`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="capitalize">{mode}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause animation' : 'Resume animation'}
          className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Bottom informational caption */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          <span>Interactive Generative Canvas · Mouse Responsive</span>
        </div>
        <span className="hidden sm:inline opacity-70">60 FPS · Pure HTML5 Canvas</span>
      </div>
    </div>
  );
};
