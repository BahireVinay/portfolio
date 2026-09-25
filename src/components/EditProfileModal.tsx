import React, { useState } from 'react';
import { ProfileData } from '../types/portfolio';
import { X, Save, RotateCcw } from 'lucide-react';

interface EditProfileModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
  isDark: boolean;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave,
  onReset,
  isDark,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/75 animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 shrink-0">
          <div>
            <h2 className="text-lg font-bold font-display">Customize Profile Details</h2>
            <p className="text-xs font-mono text-zinc-400">
              Personalize your text information and coordinates
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form (No photo upload controls) */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Handle / Username</label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.socials.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub Profile</label>
              <input
                type="url"
                value={formData.socials.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, github: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Availability / Current Status</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Bio Headline</label>
            <input
              type="text"
              value={formData.bioHeadline}
              onChange={(e) => setFormData({ ...formData, bioHeadline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Primary Narrative (About)</label>
            <textarea
              rows={3}
              value={formData.bioNarrative[0] || ''}
              onChange={(e) => {
                const nextNarrative = [...formData.bioNarrative];
                nextNarrative[0] = e.target.value;
                setFormData({ ...formData, bioNarrative: nextNarrative });
              }}
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-white outline-none focus:border-sky-500 resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
