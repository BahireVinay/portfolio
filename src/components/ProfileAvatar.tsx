import React, { useState } from 'react';

interface ProfileAvatarProps {
  avatarUrl?: string;
  name: string;
  isDark: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl = 'https://avatars.githubusercontent.com/BahireVinay',
  name,
  isDark,
  size = 'lg',
  className = '',
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(
    avatarUrl || 'https://avatars.githubusercontent.com/BahireVinay'
  );

  const dimensionClasses =
    size === 'xl'
      ? 'w-36 h-36 sm:w-44 sm:h-44'
      : size === 'lg'
      ? 'w-28 h-28 sm:w-36 sm:h-36'
      : size === 'md'
      ? 'w-24 h-24 sm:w-28 sm:h-28'
      : 'w-16 h-16';

  const handleImageError = () => {
    // If first source fails, try direct github.com/BahireVinay.png fallback
    if (currentSrc !== 'https://github.com/BahireVinay.png') {
      setCurrentSrc('https://github.com/BahireVinay.png');
    } else {
      setImageError(true);
    }
  };

  return (
    <div
      className={`relative ${dimensionClasses} rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl ${
        isDark
          ? 'bg-zinc-900 border-zinc-700/80 shadow-black/40 ring-1 ring-white/10'
          : 'bg-zinc-100 border-zinc-300 shadow-zinc-200 ring-1 ring-black/5'
      } ${className}`}
    >
      {!imageError ? (
        <img
          src={currentSrc}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-white">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-display font-bold text-sky-400 text-lg">
            VB
          </div>
          <span className="text-[11px] font-mono text-zinc-400 mt-2 font-medium">
            {name}
          </span>
        </div>
      )}
    </div>
  );
};
