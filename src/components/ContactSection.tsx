import React, { useState, useEffect } from 'react';
import { ProfileData } from '../types/portfolio';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, Clock, Briefcase, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileData;
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, isDark }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in Asia/Kolkata (Indian Standard Time)
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setCurrentTimeIST(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    // Simulate brief send delay
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 700);
  };

  // Spring transition class for icons and badges
  const springHoverClass =
    'transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:-translate-y-1 active:scale-95';

  return (
    <section id="contact" className={`py-24 border-t ${isDark ? 'border-zinc-800/80 bg-zinc-950/60' : 'border-zinc-200 bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates, TCS Badge & Spring Social Icons */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 block">
                Direct Inquiries &amp; Coordinates
              </span>
              <h2
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-4 ${
                  isDark ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                Let&apos;s connect &amp; build.
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Have an inquiry, collaborative project, or want to discuss database systems and analytics? Feel free to reach out directly via message or connect across platforms.
              </p>
            </div>

            {/* Email Direct Box */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-mono text-zinc-500 block">Direct Email</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className={`text-sm font-mono font-medium truncate block hover:underline ${
                      isDark ? 'text-zinc-200 hover:text-white' : 'text-zinc-800 hover:text-black'
                    }`}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors shrink-0 ${
                  isDark
                    ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:text-white'
                    : 'border-zinc-200 hover:border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-black'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Live Pune (IST) Timezone Box */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                isDark ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Pune, India (IST)</span>
              </div>
              <span className={`font-semibold tabular-nums ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                {currentTimeIST || 'Indian Standard Time'}
              </span>
            </div>

            {/* Social Media Section with Spring Transitions and Color Changes on Hover */}
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3 font-semibold">
                Connect on Social Networks
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* LinkedIn with Spring Transition */}
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2.5 p-3 rounded-xl border ${springHoverClass} ${
                    isDark
                      ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-[#0a66c2] hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-[#0a66c2] hover:bg-[#0a66c2]/5 hover:text-[#0a66c2]'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <div className="p-2 rounded-lg bg-zinc-800/60 group-hover:bg-[#0a66c2] group-hover:text-white transition-colors duration-200">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">LinkedIn</span>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-[#0a66c2] transition-colors">
                      vinay-bahire
                    </span>
                  </div>
                </a>

                {/* GitHub with Spring Transition */}
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2.5 p-3 rounded-xl border ${springHoverClass} ${
                    isDark
                      ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <div className="p-2 rounded-lg bg-zinc-800/60 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">GitHub</span>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-purple-400 transition-colors">
                      BahireVinay
                    </span>
                  </div>
                </a>

                {/* Email Direct with Spring Transition */}
                <a
                  href={`mailto:${profile.email}`}
                  className={`group flex items-center gap-2.5 p-3 rounded-xl border ${springHoverClass} ${
                    isDark
                      ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  aria-label="Email Vinay"
                >
                  <div className="p-2 rounded-lg bg-zinc-800/60 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">Email</span>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      Direct
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Dispatch Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-7 sm:p-9 rounded-2xl border ${
                isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}
            >
              <h3
                className={`text-xl font-bold font-display tracking-tight mb-6 ${
                  isDark ? 'text-zinc-100' : 'text-zinc-900'
                }`}
              >
                Send a Message
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-400 font-display">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    Thank you for reaching out. I will respond to your email as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-1.5 text-xs font-mono text-zinc-300 hover:text-white underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Vance"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:border-sky-500 ${
                          isDark
                            ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@organization.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:border-sky-500 ${
                          isDark
                            ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Collaboration, Systems inquiry or Analytics"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:border-sky-500 ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your note or question here..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:border-sky-500 resize-none ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold rounded-lg transition-all duration-150 ${
                      isSending
                        ? 'opacity-70 cursor-wait'
                        : isDark
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
