import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Eye,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Cpu,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { useOptionalCursor } from '../../context/CursorContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface LifecycleState {
  id: string;
  step: number;
  label: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  statusBadge: string;
  description: string;
  payload: {
    title: string;
    fields: { key: string; value: string }[];
    telemetry?: string;
  };
}

export const LIFECYCLE_STATES: LifecycleState[] = [
  {
    id: 'reported',
    step: 1,
    label: 'Citizen Report & Geolocation Capture',
    shortName: 'Reported',
    icon: MapPin,
    statusBadge: 'STATE 1 • INGESTION',
    description: 'Civic issue captured via mobile web client with automatic GPS coordinate binding and AES-encrypted citizen identity.',
    payload: {
      title: 'Ingestion Telemetry',
      fields: [
        { key: 'GPS Geolocation', value: '13.0827° N, 80.2707° E (Chennai Zone 5)' },
        { key: 'Image Ingestion', value: 'Cloudinary CDN: /uploads/civic/crater_radial_089.webp' },
        { key: 'PII Protection', value: 'AES-256 GCM encrypted at REST' },
        { key: 'Timestamp', value: '2026-09-09 14:12:05 UTC+05:30' }
      ],
      telemetry: 'Payload sealed with HMAC-SHA256 signature; pushed to Spring Boot queue.'
    }
  },
  {
    id: 'vision-triage',
    step: 2,
    label: 'Google Cloud Vision AI Automated Triage',
    shortName: 'AI Triage',
    icon: Eye,
    statusBadge: 'STATE 2 • VISION CLASSIFICATION',
    description: 'Cloud Vision API performs multi-label feature extraction, eliminating manual triage delays and routing directly by hazard probability.',
    payload: {
      title: 'Vision AI Inference Result',
      fields: [
        { key: 'Detected Hazard', value: 'Asphalt Crater / Severe Road Surface Rupture' },
        { key: 'Model Confidence', value: '98.4% certainty' },
        { key: 'Classified Category', value: 'INFRASTRUCTURE_ROADS_PRIMARY' },
        { key: 'Severity Index', value: 'HIGH (Safety Impact Level 4/5)' }
      ],
      telemetry: 'Automated triage bypassed 4-hour manual dispatch bottleneck in <420ms.'
    }
  },
  {
    id: 'department-assigned',
    step: 3,
    label: 'Department Routing & SLA Dispatch',
    shortName: 'Assigned',
    icon: Building2,
    statusBadge: 'STATE 3 • ROUTED',
    description: 'Spring Boot routing engine automatically dispatches ticket to the zonal engineering division and initializes the 48-hour resolution SLA.',
    payload: {
      title: 'Department Routing Matrix',
      fields: [
        { key: 'Assigned Body', value: 'Greater Chennai Corporation • Road Maintenance Div' },
        { key: 'Target Sub-Ward', value: 'Ward 114, Sector C' },
        { key: 'Target SLA', value: '48 Hours (High Severity Window)' },
        { key: 'Assigned Team Lead', value: 'Divisional Engineer (RBAC Level 3)' }
      ],
      telemetry: 'Departmental notification emitted via Spring event bus and SMTP trigger.'
    }
  },
  {
    id: 'in-progress',
    step: 4,
    label: 'Field Crew Work Dispatch & Material Staging',
    shortName: 'In Progress',
    icon: Clock,
    statusBadge: 'STATE 4 • EXECUTION',
    description: 'Field repair team acknowledges ticket on the enterprise portal. Asphalt patch crew and compaction machinery staged for execution.',
    payload: {
      title: 'Field Operation Telemetry',
      fields: [
        { key: 'Work Order ID', value: 'WO-2026-UR-8419' },
        { key: 'Work Crew Status', value: 'On-site machinery deployed' },
        { key: 'Active Elapsed Time', value: '18h 32m of 48h SLA' },
        { key: 'Inspection Log', value: 'Excavation completed, base layer primed' }
      ],
      telemetry: 'Real-time state broadcast to citizen dashboard via WebSockets.'
    }
  },
  {
    id: 'escalation-monitor',
    step: 5,
    label: 'SLA Escalation Engine & Governance',
    shortName: 'SLA Monitor',
    icon: AlertTriangle,
    statusBadge: 'STATE 5 • GOVERNANCE',
    description: 'Automated cron monitor checks resolution progress. If ticket nears SLA threshold without proof upload, automated tier-2 escalation notifies Zonal Executive.',
    payload: {
      title: 'SLA Governance Threshold',
      fields: [
        { key: 'SLA Status', value: 'WITHIN BOUNDS (Warning buffer active at 36h)' },
        { key: 'Executive Escalation', value: 'Zonal Commissioner Dashboard alert armed' },
        { key: 'Compliance Rating', value: '99.2% on-time resolution across Ward' },
        { key: 'Escalation Penalty', value: 'Auto-flagged on weekly executive audit' }
      ],
      telemetry: 'Spring Data JPA automated query runs every 5 minutes across unclosed tickets.'
    }
  },
  {
    id: 'resolved',
    step: 6,
    label: 'Resolution Proof Upload & Ticket Closure',
    shortName: 'Resolved',
    icon: CheckCircle2,
    statusBadge: 'STATE 6 • RESOLVED & CLOSED',
    description: 'Field crew uploads photographic proof of completed asphalt patch. System verifies GPS match against ingestion point and seals the ticket.',
    payload: {
      title: 'Proof-of-Resolution Record',
      fields: [
        { key: 'Resolution Proof', value: 'Cloudinary CDN: /proof/patch_completed_089.webp' },
        { key: 'GPS Geofence Match', value: 'Verified within 4.2m radius of report' },
        { key: 'Total Resolution Time', value: '31h 14m (16h ahead of 48h SLA)' },
        { key: 'Citizen Verification', value: 'SMS/In-app verification prompt dispatched' }
      ],
      telemetry: 'Ticket sealed permanently. Audit trail logged to immutable PostgreSQL ledger.'
    }
  }
];

export const UrbanResolveLifecycle: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(1); // 0-based: 1 = AI Vision Triage initially
  const [simulateSlaBreach, setSimulateSlaBreach] = useState(false);

  const cursor = useOptionalCursor();
  const prefersReducedMotion = useReducedMotion();

  const currentState = LIFECYCLE_STATES[activeStepIndex];

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev < LIFECYCLE_STATES.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div
      data-testid="urbanresolve-lifecycle"
      className="w-full bg-surface border border-border-hairline rounded-sm p-4 md:p-6 lg:p-8 text-chalk shadow-2xl relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cadmium animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest text-cadmium uppercase font-semibold">
              Spring Boot Core • 6-State Lifecycle Engine
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display tracking-tight text-chalk">
            UrbanResolve Civic Ticket State Machine
          </h3>
          <p className="text-xs md:text-sm text-mist font-sans mt-0.5">
            Interactive state inspector tracking GPS intake, Cloud Vision AI routing, SLA escalation, and proof verification.
          </p>
        </div>

        {/* SLA Breach Simulation Toggle */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <label className="flex items-center gap-2 text-xs font-mono cursor-pointer select-none">
            <input
              type="checkbox"
              checked={simulateSlaBreach}
              onChange={(e) => setSimulateSlaBreach(e.target.checked)}
              className="accent-cadmium rounded"
            />
            <span className={simulateSlaBreach ? 'text-cadmium font-bold' : 'text-mist'}>
              Simulate SLA Breach
            </span>
          </label>
          <button
            type="button"
            onClick={() => {
              setActiveStepIndex(0);
              setSimulateSlaBreach(false);
            }}
            onMouseEnter={() => cursor?.setCursor('hover', 'RESET')}
            onMouseLeave={() => cursor?.resetCursor()}
            className="p-1.5 border border-border-hairline hover:border-white/30 text-mist hover:text-chalk transition-colors"
            aria-label="Reset lifecycle inspector"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 6-State Stepper Track */}
      <div className="my-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {LIFECYCLE_STATES.map((state, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;
            const Icon = state.icon;

            return (
              <button
                key={state.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                onMouseEnter={() => cursor?.setCursor('hover', `STEP 0${idx + 1}`)}
                onMouseLeave={() => cursor?.resetCursor()}
                className={`p-3 border text-left transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'border-cadmium bg-cadmium/10 shadow-[0_0_15px_rgba(255,77,0,0.15)]'
                    : isCompleted
                    ? 'border-white/20 bg-surface-elevated/80 text-chalk'
                    : 'border-border-hairline/40 bg-surface-elevated/20 text-mist/60 hover:border-border-hairline hover:text-mist'
                }`}
              >
                {/* State Index */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-mist font-semibold">
                    0{state.step}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-cadmium" aria-hidden="true" />
                  )}
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cadmium animate-ping" aria-hidden="true" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isCurrent ? 'text-cadmium' : isCompleted ? 'text-chalk' : 'text-mist/60'
                    }`}
                  />
                  <span className="text-xs font-mono font-semibold truncate text-chalk">
                    {state.shortName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* State Detail Inspection Panel */}
      <div className="p-4 md:p-6 bg-surface-elevated border border-border-hairline rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cadmium font-semibold uppercase">
                {currentState.statusBadge}
              </span>
              {simulateSlaBreach && activeStepIndex >= 4 && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 uppercase font-bold">
                  SLA CRITICAL • ESCALATED TO COMMISSIONER
                </span>
              )}
            </div>
            <h4 className="text-lg md:text-xl font-display text-chalk mt-1">
              {currentState.label}
            </h4>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono border border-border-hairline hover:border-white/30 text-mist hover:text-chalk transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Prior State</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeStepIndex === LIFECYCLE_STATES.length - 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono bg-cadmium hover:bg-cadmium-hover text-obsidian font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>Advance State</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-mist font-sans my-4 leading-relaxed">
          {currentState.description}
        </p>

        {/* Payload Section Title */}
        <div className="text-xs font-mono text-cadmium uppercase tracking-wider mb-2 font-semibold">
          {currentState.payload.title}
        </div>

        {/* Payload Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {currentState.payload.fields.map((field, idx) => (
            <div key={idx} className="p-3 bg-obsidian border border-border-hairline/80">
              <div className="text-[10px] font-mono text-mist uppercase tracking-wider">{field.key}</div>
              <div className="text-xs md:text-sm font-mono text-chalk font-semibold mt-1 break-words">
                {simulateSlaBreach && field.key === 'SLA Status'
                  ? 'BREACH IMMINENT (Elapsed 44h of 48h SLA)'
                  : field.value}
              </div>
            </div>
          ))}
        </div>

        {/* Spring Boot Architectural Note */}
        {currentState.payload.telemetry && (
          <div className="p-3 bg-cadmium/[0.04] border border-cadmium/20 flex items-start gap-2.5 rounded-sm">
            <Cpu className="w-4 h-4 text-cadmium shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs font-mono text-mist">
              <span className="text-cadmium font-semibold uppercase mr-1">Spring Boot Engine:</span>
              {currentState.payload.telemetry}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UrbanResolveLifecycle;
