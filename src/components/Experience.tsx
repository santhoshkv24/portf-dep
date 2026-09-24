import React from 'react';
import {
  Calendar,
  MapPin,
  Building2
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export const Experience: React.FC = () => {

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="py-24 md:py-32 border-b border-border-hairline relative bg-obsidian text-chalk overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cadmium" aria-hidden="true" />
            <span className="text-xs font-mono tracking-widest text-cadmium uppercase font-semibold">
              03 // PRODUCTION TRAJECTORY
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-chalk uppercase">
                PRODUCTION EXPERIENCE <br />
                <span className="text-mist">& ENTERPRISE IMPACT</span>
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-mist font-sans leading-relaxed">
              Verifiable engineering experience building autonomous agentic tools and enterprise platforms across global financial institutions and specialized software companies.
            </p>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-border-hairline ml-3 sm:ml-4 lg:ml-6 space-y-16 pl-6 sm:pl-8 lg:pl-12">
          {resumeData.experience.map((exp, index) => {
            const isBNY = exp.company.includes('Bank of New York Mellon');

            return (
              <div
                key={index}
                data-testid={`experience-item-${index}`}
                className="relative group"
              >
                {/* Timeline Anchor Node */}
                <span
                  className="absolute -left-[31px] sm:-left-[39px] lg:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-obsidian border-2 border-cadmium group-hover:scale-125 transition-transform"
                  aria-hidden="true"
                />

                {/* Experience Card */}
                <div className="bg-surface/40 border border-border-hairline p-6 md:p-8 rounded-lg hover:border-white/20 transition-all duration-300">
                  {/* Top Bar: Role & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border-hairline">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 bg-cadmium/15 text-cadmium border border-cadmium/30 uppercase font-semibold rounded">
                          {isBNY ? 'GLOBAL BANKING // SDE INTERNSHIP' : 'ENTERPRISE PLATFORM // WEB DEV INTERNSHIP'}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-chalk tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-base md:text-lg font-mono text-cadmium mt-1 font-semibold flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-cadmium" aria-hidden="true" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-zinc-400 space-y-1.5 sm:text-right">
                      <div className="flex items-center sm:justify-end gap-1.5 text-zinc-200 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="my-6 space-y-3">
                    <div className="text-xs font-mono text-cadmium uppercase font-semibold tracking-wider">
                      Key Engineering Responsibilities &amp; Impact:
                    </div>
                    <ul className="space-y-3 text-xs md:text-sm font-sans text-zinc-300">
                      {exp.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-3 leading-relaxed">
                          <span className="text-cadmium font-mono font-bold text-sm select-none">
                            ›
                          </span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Strip */}
                  <div className="pt-4 border-t border-border-hairline flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase mr-2 font-semibold">
                      Technologies:
                    </span>
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono bg-obsidian/80 border border-border-hairline text-zinc-300 rounded hover:border-cadmium hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Experience;
