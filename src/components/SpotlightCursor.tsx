import React, { useEffect, useState } from 'react';

interface SpotlightCursorProps {
  isDark: boolean;
}

export const SpotlightCursor: React.FC<SpotlightCursorProps> = ({ isDark }) => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop mouse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: isDark
          ? `radial-gradient(650px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.04), transparent 80%)`
          : `radial-gradient(650px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.05), transparent 80%)`,
      }}
    />
  );
};
