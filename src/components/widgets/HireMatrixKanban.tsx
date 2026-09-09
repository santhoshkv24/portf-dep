import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Video,
  ArrowRight
} from 'lucide-react';
import { useOptionalCursor } from '../../context/CursorContext';

export interface Candidate {
  id: string;
  name: string;
  targetRole: string;
  stage: 'applied' | 'screened' | 'interview' | 'decision' | 'hired';
  geminiScore: number;
  experienceYears: number;
  skills: string[];
  geminiBreakdown: {
    systemDesign: number;
    backendConcurrency: number;
    apiSecurity: number;
  };
  aiAnalysis: string;
  interviewStatus?: string;
}

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Vikram Menon',
    targetRole: 'Senior Backend Engineer (Distributed Systems)',
    stage: 'screened',
    geminiScore: 94,
    experienceYears: 4,
    skills: ['Java 17', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'],
    geminiBreakdown: {
      systemDesign: 95,
      backendConcurrency: 93,
      apiSecurity: 94
    },
    aiAnalysis: 'Gemini evaluated candidate resume against Staff SDE requirements. Strong production evidence of event-driven Kafka architecture and multi-tenant DB sharding. Zero hallucinated qualifications detected.',
    interviewStatus: 'Google Meet auto-scheduled • Panel 2'
  },
  {
    id: 'cand-2',
    name: 'Ananya Deshmukh',
    targetRole: 'Full-Stack Platform Engineer',
    stage: 'interview',
    geminiScore: 91,
    experienceYears: 3,
    skills: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Redis'],
    geminiBreakdown: {
      systemDesign: 88,
      backendConcurrency: 92,
      apiSecurity: 93
    },
    aiAnalysis: 'High proficiency in reactive state architectures and Node microservices. Verified portfolio code contains clean RBAC guards and automated integration test pipelines.',
    interviewStatus: 'Interview confirmed: Today at 16:30 IST'
  },
  {
    id: 'cand-3',
    name: 'Rohan Gupta',
    targetRole: 'AI Systems Engineer',
    stage: 'decision',
    geminiScore: 96,
    experienceYears: 5,
    skills: ['Python', 'LLMs', 'GraphQL', 'PyTorch', 'GCP'],
    geminiBreakdown: {
      systemDesign: 97,
      backendConcurrency: 95,
      apiSecurity: 96
    },
    aiAnalysis: 'Exemplary alignment with enterprise LLM orchestration. Previous contributions include semantic retrieval caches and low-latency vector index deployments.',
    interviewStatus: 'Unanimous 4-interviewer approval'
  },
  {
    id: 'cand-4',
    name: 'Kavita Sundaram',
    targetRole: 'Cloud Infrastructure Specialist',
    stage: 'applied',
    geminiScore: 87,
    experienceYears: 2,
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Linux', 'Go'],
    geminiBreakdown: {
      systemDesign: 85,
      backendConcurrency: 88,
      apiSecurity: 88
    },
    aiAnalysis: 'Resume matched core IAC and container orchestration criteria. Automated screening recommends advancing to technical phone screen.',
    interviewStatus: 'Pending recruiter review'
  },
  {
    id: 'cand-5',
    name: 'Deepak Nair',
    targetRole: 'Backend Security Engineer',
    stage: 'hired',
    geminiScore: 98,
    experienceYears: 6,
    skills: ['Spring Security', 'OAuth2', 'JWT', 'MySQL', 'Audit Ledgers'],
    geminiBreakdown: {
      systemDesign: 98,
      backendConcurrency: 97,
      apiSecurity: 99
    },
    aiAnalysis: 'Flawless compliance background in banking infrastructure and tokenized auth protocols. Offer accepted.',
    interviewStatus: 'Offer Signed • Onboarding Q3'
  }
];

export const KANBAN_COLUMNS = [
  { id: 'applied', label: 'Applied', short: '01' },
  { id: 'screened', label: 'AI Screened', short: '02' },
  { id: 'interview', label: 'Interview', short: '03' },
  { id: 'decision', label: 'Decision', short: '04' },
  { id: 'hired', label: 'Hired', short: '05' }
] as const;

export const HireMatrixKanban: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(INITIAL_CANDIDATES[0]);
  const [activeTab, setActiveTab] = useState<'kanban' | 'gemini'>('kanban');

  const cursor = useOptionalCursor();

  const handleSelectCandidate = (cand: Candidate) => {
    setSelectedCandidate(cand);
    setActiveTab('gemini');
  };

  const advanceCandidate = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const stages: Candidate['stage'][] = ['applied', 'screened', 'interview', 'decision', 'hired'];
        const currentIdx = stages.indexOf(c.stage);
        const nextStage = currentIdx < stages.length - 1 ? stages[currentIdx + 1] : stages[currentIdx];
        const updated = { ...c, stage: nextStage };
        if (selectedCandidate.id === id) {
          setSelectedCandidate(updated);
        }
        return updated;
      })
    );
  };

  return (
    <div
      data-testid="hirematrix-kanban"
      className="w-full bg-surface border border-border-hairline rounded-sm p-4 md:p-6 lg:p-8 text-chalk shadow-2xl relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cadmium animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest text-cadmium uppercase font-semibold">
              Google Gemini AI • Recruitment Pipeline
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display tracking-tight text-chalk">
            HireMatrix Talent Pipeline & AI Scoring
          </h3>
          <p className="text-xs md:text-sm text-mist font-sans mt-0.5">
            Demonstrating 5-stage Kanban lifecycle, automated Google Gemini resume evaluation, and Calendar integration.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              activeTab === 'kanban'
                ? 'bg-cadmium text-obsidian font-bold border-cadmium'
                : 'border-border-hairline text-mist hover:text-chalk'
            }`}
          >
            Kanban Board
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gemini')}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              activeTab === 'gemini'
                ? 'bg-cadmium text-obsidian font-bold border-cadmium'
                : 'border-border-hairline text-mist hover:text-chalk'
            }`}
          >
            Gemini AI Inspector
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-6">
        {activeTab === 'kanban' ? (
          /* Kanban Board View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {KANBAN_COLUMNS.map((col) => {
              const colCandidates = candidates.filter((c) => c.stage === col.id);

              return (
                <div
                  key={col.id}
                  className="bg-surface-elevated/40 border border-border-hairline p-3 flex flex-col min-h-[300px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-hairline">
                    <span className="text-xs font-mono text-chalk font-semibold uppercase">
                      {col.label}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white/10 text-mist">
                      {colCandidates.length}
                    </span>
                  </div>

                  {/* Candidate Cards */}
                  <div className="space-y-2.5 flex-1">
                    {colCandidates.map((cand) => (
                      <div
                        key={cand.id}
                        onClick={() => handleSelectCandidate(cand)}
                        onMouseEnter={() => cursor?.setCursor('hover', 'INSPECT')}
                        onMouseLeave={() => cursor?.resetCursor()}
                        className={`p-3 border text-left cursor-pointer transition-all bg-obsidian hover:border-cadmium group ${
                          selectedCandidate.id === cand.id
                            ? 'border-cadmium shadow-[0_0_12px_rgba(255,77,0,0.15)]'
                            : 'border-border-hairline'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h5 className="text-xs font-display text-chalk group-hover:text-cadmium transition-colors truncate">
                            {cand.name}
                          </h5>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                            {cand.geminiScore}%
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-mist truncate mb-2">
                          {cand.targetRole}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {cand.skills.slice(0, 2).map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono px-1 py-0.2 bg-surface-elevated border border-border-hairline text-mist"
                            >
                              {s}
                            </span>
                          ))}
                          {cand.skills.length > 2 && (
                            <span className="text-[9px] font-mono text-mist/60">
                              +{cand.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    {colCandidates.length === 0 && (
                      <div className="h-24 border border-dashed border-border-hairline/60 flex items-center justify-center text-[11px] font-mono text-mist/40">
                        Empty Stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Gemini AI Scoring Inspector View */
          <div className="p-4 md:p-6 bg-surface-elevated border border-border-hairline rounded-sm space-y-6">
            {/* Candidate Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-hairline">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-cadmium/15 text-cadmium border border-cadmium/30 uppercase font-semibold">
                    AI VERIFIED CANDIDATE PROFILE
                  </span>
                  <span className="text-xs font-mono text-mist capitalize">
                    Stage: {selectedCandidate.stage}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-display text-chalk">
                  {selectedCandidate.name}
                </h4>
                <p className="text-xs md:text-sm font-mono text-cadmium">
                  {selectedCandidate.targetRole} • {selectedCandidate.experienceYears} Years Production Experience
                </p>
              </div>

              {/* Advance Candidate Action */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => advanceCandidate(selectedCandidate.id)}
                  disabled={selectedCandidate.stage === 'hired'}
                  className="px-3 py-1.5 bg-cadmium hover:bg-cadmium-hover text-obsidian text-xs font-mono font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <span>Advance Pipeline Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Gemini Match Score & Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Overall Score Dial */}
              <div className="p-4 bg-obsidian border border-border-hairline flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-mist uppercase tracking-wider">
                    Gemini Match Index
                  </div>
                  <div className="text-4xl font-mono font-bold text-chalk mt-2 flex items-baseline gap-1">
                    <span>{selectedCandidate.geminiScore}</span>
                    <span className="text-sm font-normal text-mist">/100</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-3 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>High Alignment Threshold</span>
                </div>
              </div>

              {/* Category Scores */}
              <div className="p-4 bg-obsidian border border-border-hairline md:col-span-2 space-y-3">
                <div className="text-[10px] font-mono text-mist uppercase tracking-wider">
                  Weighted Competency Analysis
                </div>
                {[
                  { label: 'System Design & Architecture', val: selectedCandidate.geminiBreakdown.systemDesign },
                  { label: 'Backend Concurrency & Threading', val: selectedCandidate.geminiBreakdown.backendConcurrency },
                  { label: 'API Security & Auth Patterns', val: selectedCandidate.geminiBreakdown.apiSecurity }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-chalk">{item.label}</span>
                      <span className="text-cadmium font-semibold">{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-elevated overflow-hidden">
                      <div
                        className="h-full bg-cadmium transition-all duration-500"
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Synthesized Reasoning */}
            <div className="p-4 bg-cadmium/[0.04] border border-cadmium/20 rounded-sm">
              <div className="text-xs font-mono text-cadmium font-semibold uppercase mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Gemini Scoring Synthesis & Reasoning</span>
              </div>
              <p className="text-xs md:text-sm font-sans text-mist leading-relaxed">
                {selectedCandidate.aiAnalysis}
              </p>
            </div>

            {/* Google Calendar & Meet Integration Strip */}
            <div className="p-3.5 bg-obsidian border border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-cadmium shrink-0" aria-hidden="true" />
                <div className="text-xs font-mono">
                  <span className="text-mist mr-2">Integrated Interview Telemetry:</span>
                  <span className="text-chalk font-semibold">{selectedCandidate.interviewStatus}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Simulated Google Meet link generated for ${selectedCandidate.name}: https://meet.google.com/hmt-2026-santhosh`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-elevated hover:bg-white/10 text-chalk text-xs font-mono border border-border-hairline transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                  <span>1-Click Google Meet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HireMatrixKanban;
