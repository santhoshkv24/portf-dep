import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  Copy,
  Download,
  Check,
  FileText,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useOptionalCursor } from '../context/CursorContext';

export interface ResumeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDrawer: React.FC<ResumeDrawerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const cursor = useOptionalCursor();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    try {
      const res = await fetch('/resume.md');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="resume-drawer-backdrop"
      className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-sm flex justify-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Resume Drawer"
    >
      <div
        data-testid="resume-drawer"
        className="w-full max-w-3xl bg-surface border-l border-border-hairline h-full flex flex-col text-chalk shadow-2xl overflow-hidden"
      >
        {/* Top Control Bar (Hidden on Print) */}
        <div className="p-4 md:p-5 border-b border-border-hairline bg-surface-elevated flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cadmium" aria-hidden="true" />
            <span className="text-xs md:text-sm font-mono font-bold tracking-wider uppercase text-chalk">
              Curriculum Vitae // Quick View
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Print Action */}
            <button
              type="button"
              onClick={handlePrint}
              onMouseEnter={() => cursor?.setCursor('hover', 'PRINT PDF')}
              onMouseLeave={() => cursor?.resetCursor()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 text-chalk border border-border-hairline transition-colors"
              aria-label="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {/* Copy Markdown */}
            <button
              type="button"
              onClick={handleCopyMarkdown}
              onMouseEnter={() => cursor?.setCursor('hover', 'COPY RAW')}
              onMouseLeave={() => cursor?.resetCursor()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 text-chalk border border-border-hairline transition-colors"
              aria-label="Copy Markdown to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            {/* Download .md */}
            <a
              href="/resume.md"
              download="Santhosh_KV_Resume.md"
              onMouseEnter={() => cursor?.setCursor('hover', 'DOWNLOAD')}
              onMouseLeave={() => cursor?.resetCursor()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 text-chalk border border-border-hairline transition-colors"
              aria-label="Download resume markdown file"
            >
              <Download className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
              <span className="hidden sm:inline">.MD</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => cursor?.setCursor('hover', 'CLOSE')}
              onMouseLeave={() => cursor?.resetCursor()}
              className="p-1.5 border border-border-hairline hover:border-white/30 text-mist hover:text-chalk transition-colors ml-1"
              aria-label="Close resume drawer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume View */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 print:p-0 print:overflow-visible text-chalk font-sans selection:bg-cadmium selection:text-obsidian">
          {/* Header */}
          <div className="border-b border-border-hairline pb-6">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-chalk uppercase tracking-tight">
              {resumeData.name}
            </h1>
            <p className="text-sm font-mono text-cadmium mt-1 font-semibold">
              {resumeData.title}
            </p>
            <div className="text-xs font-mono text-mist flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                <span>{resumeData.location}</span>
              </span>
              <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1 hover:text-chalk">
                <Mail className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                <span>{resumeData.email}</span>
              </a>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                <span>{resumeData.phone}</span>
              </span>
              <a
                href={resumeData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-chalk"
              >
                <Linkedin className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                <span>{resumeData.linkedin}</span>
              </a>
              <a
                href={resumeData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-chalk"
              >
                <Github className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                <span>{resumeData.github}</span>
              </a>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cadmium font-bold">
              // PROFILE
            </h2>
            <p className="text-xs md:text-sm font-sans text-mist leading-relaxed">
              {resumeData.profileSummary}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cadmium font-bold">
              // EXPERIENCE
            </h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-display font-bold text-chalk">
                    {exp.role} — <span className="text-cadmium">{exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-mist">{exp.period}</span>
                </div>
                <div className="text-xs font-mono text-mist/80">{exp.location}</div>
                <ul className="space-y-1.5 text-xs font-sans text-mist pl-4 list-disc marker:text-cadmium leading-relaxed">
                  {exp.highlights.map((hl, hIdx) => (
                    <li key={hIdx}>{hl}</li>
                  ))}
                </ul>
                <div className="text-[11px] font-mono text-mist mt-2">
                  <strong className="text-chalk">Technologies:</strong> {exp.technologies.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cadmium font-bold">
              // EDUCATION
            </h2>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-display font-bold text-chalk">
                    {edu.institution}
                  </h3>
                  <span className="text-xs font-mono text-mist">{edu.period}</span>
                </div>
                <div className="text-xs font-mono text-mist">
                  {edu.degree} {edu.field && `(${edu.field})`} — {edu.location}
                </div>
                <div className="text-xs font-mono text-cadmium font-semibold">
                  {edu.cgpa && `CGPA: ${edu.cgpa}`}
                  {(edu.score || edu.percentage) && `Score: ${edu.score || edu.percentage}`}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cadmium font-bold">
              // TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {resumeData.skills.map((skillGroup, idx) => (
                <div key={idx} className="p-2.5 bg-obsidian border border-border-hairline">
                  <span className="text-cadmium font-semibold block mb-1">
                    {skillGroup.category}:
                  </span>
                  <span className="text-mist">{skillGroup.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cadmium font-bold">
              // CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="text-xs font-mono flex items-center justify-between p-2 bg-obsidian border border-border-hairline">
                  <div>
                    <span className="text-chalk font-semibold">{cert.title}</span>
                    <span className="text-mist ml-2">({cert.issuer})</span>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cadmium hover:underline flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumeDrawer;
