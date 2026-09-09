import React from 'react';
import {
  ArrowUpRight,
  Github,
  Layers,
  Sparkles,
  ShieldCheck,
  Workflow,
  CheckCircle2
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { useOptionalCursor } from '../context/CursorContext';
import BnySimulator from './widgets/BnySimulator';
import UrbanResolveLifecycle from './widgets/UrbanResolveLifecycle';
import HireMatrixKanban from './widgets/HireMatrixKanban';
import OrganicaRbacMatrix from './widgets/OrganicaRbacMatrix';

export const SelectedWork: React.FC = () => {
  const cursor = useOptionalCursor();

  // Map each project ID to its respective bespoke interactive simulator widget
  const renderInteractiveWidget = (projectId: string) => {
    switch (projectId) {
      case 'bny-eliza':
        return <BnySimulator />;
      case 'urban-resolve':
        return <UrbanResolveLifecycle />;
      case 'hire-matrix':
        return <HireMatrixKanban />;
      case 'organica-ops':
        return <OrganicaRbacMatrix />;
      default:
        return null;
    }
  };

  return (
    <section
      id="work"
      data-testid="selected-work-section"
      className="py-24 md:py-32 border-b border-border-hairline relative bg-obsidian text-chalk overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cadmium" aria-hidden="true" />
            <span className="text-xs font-mono tracking-widest text-cadmium uppercase font-semibold">
              02 // SELECTED WORK
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-chalk uppercase">
                FLAGSHIP ENGINEERING <br />
                <span className="text-mist">& APPLIED SYSTEMS</span>
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-mist font-sans leading-relaxed">
              Four substantive case studies demonstrating distributed backend architectures, autonomous AI agents, and enterprise-grade security protocols.
            </p>
          </div>
        </div>

        {/* Project Case Studies List */}
        <div className="space-y-32">
          {projectsData.map((project, index) => {
            const indexStr = `0${index + 1}`;

            return (
              <article
                key={project.id}
                id={project.id}
                data-testid={`project-${project.id}`}
                className="scroll-mt-24 border-t border-border-hairline pt-12"
              >
                {/* Project Header & Telemetry */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                  {/* Left Column: Index & Role */}
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-display text-5xl md:text-6xl font-extrabold text-cadmium/30 tracking-tighter">
                        {indexStr}
                      </span>
                      <span className="text-xs font-mono tracking-wider uppercase text-mist px-2.5 py-0.5 border border-border-hairline bg-surface">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-chalk uppercase tracking-tight mt-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono text-cadmium mt-1 font-semibold">
                      {project.subtitle}
                    </p>

                    {/* Role & Timeline Badge */}
                    {project.role && (
                      <div className="mt-3 text-xs font-mono text-mist">
                        <span className="text-chalk font-semibold">{project.role}</span>
                        {project.period && <span> • {project.period}</span>}
                      </div>
                    )}

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-mono bg-surface border border-border-hairline text-mist hover:text-chalk transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* External Links */}
                    <div className="flex items-center gap-3 mt-6">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => cursor?.setCursor('hover', 'SOURCE')}
                          onMouseLeave={() => cursor?.resetCursor()}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-mist hover:text-chalk transition-colors border border-border-hairline hover:border-white/40 px-3 py-1.5 bg-surface-elevated/40"
                        >
                          <Github className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                          <span>View Code</span>
                          <ArrowUpRight className="w-3 h-3 text-mist" aria-hidden="true" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => cursor?.setCursor('hover', 'EXTERNAL')}
                          onMouseLeave={() => cursor?.resetCursor()}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-obsidian bg-cadmium hover:bg-cadmium-hover font-bold px-3 py-1.5 transition-colors"
                        >
                          <span>Live System</span>
                          <ArrowUpRight className="w-3 h-3 text-obsidian" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Deep Narrative Breakdown */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface/30 p-6 md:p-8 border border-border-hairline/80">
                    {/* The Challenge */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-cadmium uppercase font-semibold">
                        <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>The Architectural Problem</span>
                      </div>
                      <p className="text-xs md:text-sm font-sans text-mist leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* The Architecture */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-cadmium uppercase font-semibold">
                        <Workflow className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Technical Innovation</span>
                      </div>
                      <p className="text-xs md:text-sm font-sans text-mist leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    {/* Key Contributions & Highlights */}
                    <div className="space-y-2 md:col-span-2 border-t border-border-hairline/60 pt-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-cadmium uppercase font-semibold mb-2">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Core Engineering Contributions</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-mist">
                        {project.highlights.slice(0, 4).map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cadmium font-mono text-xs">›</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics if available */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="space-y-2 md:col-span-2 border-t border-border-hairline/60 pt-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-cadmium uppercase font-semibold mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Verified Impact & Architecture Metrics</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {project.metrics.map((m, idx) => (
                            <div key={idx} className="p-2.5 bg-obsidian border border-border-hairline">
                              <div className="text-[10px] font-mono text-mist uppercase">{m.label}</div>
                              <div className="text-xs font-mono font-bold text-chalk mt-0.5">{m.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Embedded Bespoke Interactive Simulator */}
                <div className="mt-8">
                  <div className="mb-2 text-[11px] font-mono uppercase tracking-wider text-mist flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                    <span>Interactive System Artifact // Inspect Technical Operation</span>
                  </div>
                  {renderInteractiveWidget(project.id)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default SelectedWork;
