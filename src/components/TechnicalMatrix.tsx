import React from 'react';
import {
  Award,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Terminal
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useOptionalCursor } from '../context/CursorContext';

export const TechnicalMatrix: React.FC = () => {
  const cursor = useOptionalCursor();

  return (
    <section
      id="systems"
      data-testid="technical-matrix-section"
      className="py-24 md:py-32 border-b border-border-hairline relative bg-obsidian text-chalk overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cadmium" aria-hidden="true" />
            <span className="text-xs font-mono tracking-widest text-cadmium uppercase font-semibold">
              04 // SYSTEMS & CAPABILITIES
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-chalk uppercase">
                ENGINEERING MATRIX <br />
                <span className="text-mist">& VERIFIED CREDENTIALS</span>
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-mist font-sans leading-relaxed">
              Technical capability taxonomy grouped by engineering domains, verifiable industry developer certifications, and academic trajectory.
            </p>
          </div>
        </div>

        {/* 4 Technical Skill Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resumeData.skills.map((skillGroup, idx) => (
            <div
              key={idx}
              data-testid={`skill-group-${idx}`}
              className="bg-surface/40 border border-border-hairline p-6 rounded-lg flex flex-col justify-between hover:border-white/20 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-hairline">
                  <span className="text-xs font-mono text-cadmium font-semibold uppercase">
                    0{idx + 1} DOMAIN
                  </span>
                  <Terminal className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-bold text-chalk mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-surface-elevated/80 border border-border-hairline text-zinc-300 rounded hover:border-cadmium hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border-hairline text-[10px] font-mono text-zinc-500">
                Verified against production deployments
              </div>
            </div>
          ))}
        </div>

        {/* Two Columns: Verified Certifications & Academic Foundations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Verified Certifications (7 cols) */}
          <div className="lg:col-span-7 bg-surface/40 border border-border-hairline p-6 md:p-8 rounded-lg">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-hairline">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cadmium" aria-hidden="true" />
                <h3 className="text-xl font-display font-bold text-chalk uppercase tracking-tight">
                  Verified Industry Certifications
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">3 Official Accreditations</span>
            </div>

            <div className="space-y-4">
              {resumeData.certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  data-testid={`cert-item-${cIdx}`}
                  onMouseEnter={() => cursor?.setCursor('hover', 'VERIFY')}
                  onMouseLeave={() => cursor?.resetCursor()}
                  className="p-4 bg-obsidian/80 border border-border-hairline rounded-md hover:border-cadmium/70 transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-[10px] font-mono text-cadmium font-semibold uppercase">
                      {cert.issuer}
                    </div>
                    <div className="text-base font-display font-bold text-chalk group-hover:text-cadmium transition-colors mt-0.5">
                      {cert.title}
                    </div>
                    {cert.date && (
                      <div className="text-xs font-mono text-zinc-400 mt-1">Issued: {cert.date}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Certified</span>
                    </span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 border border-border-hairline rounded hover:border-white/30 text-zinc-400 hover:text-chalk transition-colors"
                        aria-label={`View ${cert.title} certification link`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Academic Trajectory (5 cols) */}
          <div className="lg:col-span-5 bg-surface/40 border border-border-hairline p-6 md:p-8 rounded-lg">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-hairline">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cadmium" aria-hidden="true" />
                <h3 className="text-xl font-display font-bold text-chalk uppercase tracking-tight">
                  Academic Foundations
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              {resumeData.education.map((edu, eIdx) => (
                <div
                  key={eIdx}
                  data-testid={`edu-item-${eIdx}`}
                  className="pb-5 border-b border-border-hairline last:border-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-base md:text-lg font-display font-bold text-chalk">
                      {edu.institution}
                    </h4>
                    {edu.cgpa && (
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-cadmium/15 text-cadmium border border-cadmium/30 rounded">
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                    {(edu.score || edu.percentage) && (
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-white/10 text-chalk border border-border-hairline rounded">
                        {edu.score || edu.percentage}
                      </span>
                    )}
                  </div>

                  <div className="text-xs md:text-sm font-mono text-zinc-400 mt-1">
                    {edu.degree}
                    {edu.field && <span> ({edu.field})</span>}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mt-2">
                    <span>{edu.location}</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TechnicalMatrix;
