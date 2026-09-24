import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
  ArrowUp
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useOptionalCursor } from '../context/CursorContext';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const cursor = useOptionalCursor();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resumeData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      data-testid="footer-section"
      className="bg-obsidian text-chalk pt-24 pb-12 border-t border-border-hairline relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Hero Area */}
        <div className="pb-20 border-b border-border-hairline">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cadmium" aria-hidden="true" />
            <span className="text-xs font-mono tracking-widest text-cadmium uppercase font-semibold">
              05 // CONTACT & INITIATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-chalk leading-none">
                LET'S BUILD <br />
                <span className="text-mist">RESILIENT SYSTEMS.</span>
              </h2>
              <p className="max-w-xl text-sm sm:text-base text-mist font-sans mt-6 leading-relaxed">
                Open to software engineering roles, distributed backend systems, autonomous AI agent architecture, and technical challenges that demand rigorous system design.
              </p>
            </div>

            {/* Email Action Widget */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Direct Communication Channel:
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={() => cursor?.setCursor('hover', 'COPY EMAIL')}
                onMouseLeave={() => cursor?.resetCursor()}
                className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-5 py-3.5 bg-cadmium hover:bg-cadmium-hover text-obsidian font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all rounded shadow-sm"
                aria-label="Copy email address"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>{resumeData.email}</span>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-obsidian" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4 text-obsidian/80" aria-hidden="true" />
                )}
              </button>

              {copied && (
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  ✓ Address copied to clipboard
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Links & Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-border-hairline text-xs font-mono">
          {/* Geolocation & Telemetry */}
          <div className="space-y-2">
            <div className="text-mist uppercase tracking-wider">Base Station // Coordinates</div>
            <div className="text-chalk font-semibold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
              <span>{resumeData.location} (13.0827° N, 80.2707° E)</span>
            </div>
            <div className="text-mist/80">Timezone: UTC+05:30 (India Standard Time)</div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-2">
            <div className="text-mist uppercase tracking-wider">Verified External Identifiers</div>
            <div className="flex items-center gap-4">
              <a
                href={resumeData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => cursor?.setCursor('hover', 'GITHUB')}
                onMouseLeave={() => cursor?.resetCursor()}
                className="inline-flex items-center gap-1.5 text-chalk hover:text-cadmium transition-colors"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-mist" aria-hidden="true" />
              </a>

              <a
                href={resumeData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => cursor?.setCursor('hover', 'LINKEDIN')}
                onMouseLeave={() => cursor?.resetCursor()}
                className="inline-flex items-center gap-1.5 text-chalk hover:text-cadmium transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-mist" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Jump */}
          <div className="space-y-2 md:text-right">
            <div className="text-mist uppercase tracking-wider">Quick Navigation</div>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => cursor?.setCursor('hover', 'SCROLL TOP')}
              onMouseLeave={() => cursor?.resetCursor()}
              className="inline-flex items-center gap-1 text-mist hover:text-chalk transition-colors border border-border-hairline px-3 py-1.5 bg-surface"
            >
              <span>Back to Viewport Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Colophon & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mist">
          <div>
            © {new Date().getFullYear()} K V SANTHOSH
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cadmium" aria-hidden="true" />
            <span>Built with Vite, React 19, TypeScript, Motion & Lenis</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
