import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  KeyRound,
  Lock,
  FileCode2,
  Check,
  X,
  Database,
  Users,
  Eye,
  Server,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { useOptionalCursor } from '../../context/CursorContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface RolePermission {
  roleId: 'admin' | 'manager' | 'team_lead' | 'employee' | 'customer';
  roleName: string;
  roleBadge: string;
  scopeDescription: string;
  routeGuardLevel: string;
  modulePermissions: {
    module: string;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    storedProc: boolean;
  }[];
  securityProfile: {
    jwtScope: string;
    sessionTtl: string;
    rateLimitTier: string;
    auditLevel: string;
  };
}

export const RBAC_ROLES: RolePermission[] = [
  {
    roleId: 'admin',
    roleName: 'System Administrator',
    roleBadge: 'RBAC LEVEL 5 • FULL SYSTEM SCOPE',
    scopeDescription: 'Unrestricted governance across all 8+ backend modules, stored procedures execution, RBAC assignment, and audit log inspection.',
    routeGuardLevel: 'ALLOW */* WITH AUDIT LOGGING',
    modulePermissions: [
      { module: 'Project Lifecycle Management', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'Dual-Track Task Engine', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'Sprint & Milestone Tracking', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'Meeting & Calendar Dispatcher', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'Multer Secure File Storage', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'MySQL Stored Procedures', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'Security Audit & Auth Logs', read: true, create: true, update: true, delete: true, storedProc: true }
    ],
    securityProfile: {
      jwtScope: 'organica:admin:write_all',
      sessionTtl: '15m access / 7d refresh token',
      rateLimitTier: 'Tier 1 (500 req/min)',
      auditLevel: 'Comprehensive Structured Logging'
    }
  },
  {
    roleId: 'manager',
    roleName: 'Operations Manager',
    roleBadge: 'RBAC LEVEL 4 • OPERATIONS GOVERNANCE',
    scopeDescription: 'Cross-project oversight, sprint deliverables approval, meeting scheduling, and client milestone delivery sign-off.',
    routeGuardLevel: 'ALLOW /api/projects/*, /api/tasks/*, /api/meetings/*',
    modulePermissions: [
      { module: 'Project Lifecycle Management', read: true, create: true, update: true, delete: false, storedProc: true },
      { module: 'Dual-Track Task Engine', read: true, create: true, update: true, delete: false, storedProc: true },
      { module: 'Sprint & Milestone Tracking', read: true, create: true, update: true, delete: false, storedProc: true },
      { module: 'Meeting & Calendar Dispatcher', read: true, create: true, update: true, delete: true, storedProc: false },
      { module: 'Multer Secure File Storage', read: true, create: true, update: true, delete: false, storedProc: false },
      { module: 'MySQL Stored Procedures', read: true, create: false, update: false, delete: false, storedProc: true },
      { module: 'Security Audit & Auth Logs', read: true, create: false, update: false, delete: false, storedProc: false }
    ],
    securityProfile: {
      jwtScope: 'organica:manager:ops',
      sessionTtl: '30m access / 7d refresh token',
      rateLimitTier: 'Tier 2 (250 req/min)',
      auditLevel: 'Milestone & Sign-off Auditing'
    }
  },
  {
    roleId: 'team_lead',
    roleName: 'Technical Team Lead',
    roleBadge: 'RBAC LEVEL 3 • TEAM & SPRINT ORCHESTRATION',
    scopeDescription: 'Task allocation across internal engineering tracks, sprint planning, developer velocity monitoring, and meeting invitations.',
    routeGuardLevel: 'ALLOW /api/tasks/*, /api/sprints/*, /api/meetings/*',
    modulePermissions: [
      { module: 'Project Lifecycle Management', read: true, create: false, update: true, delete: false, storedProc: false },
      { module: 'Dual-Track Task Engine', read: true, create: true, update: true, delete: true, storedProc: true },
      { module: 'Sprint & Milestone Tracking', read: true, create: true, update: true, delete: false, storedProc: true },
      { module: 'Meeting & Calendar Dispatcher', read: true, create: true, update: true, delete: false, storedProc: false },
      { module: 'Multer Secure File Storage', read: true, create: true, update: true, delete: false, storedProc: false },
      { module: 'MySQL Stored Procedures', read: true, create: false, update: false, delete: false, storedProc: true },
      { module: 'Security Audit & Auth Logs', read: false, create: false, update: false, delete: false, storedProc: false }
    ],
    securityProfile: {
      jwtScope: 'organica:team_lead:sprints',
      sessionTtl: '1h access / 7d refresh token',
      rateLimitTier: 'Tier 3 (150 req/min)',
      auditLevel: 'Task State Transition Logs'
    }
  },
  {
    roleId: 'employee',
    roleName: 'Staff Developer / Employee',
    roleBadge: 'RBAC LEVEL 2 • TASK EXECUTION',
    scopeDescription: 'Daily engineering task logging, code deliverables upload, personal timesheets, and internal meeting attendance.',
    routeGuardLevel: 'ALLOW /api/tasks/assigned, /api/files/upload',
    modulePermissions: [
      { module: 'Project Lifecycle Management', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'Dual-Track Task Engine', read: true, create: false, update: true, delete: false, storedProc: false },
      { module: 'Sprint & Milestone Tracking', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'Meeting & Calendar Dispatcher', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'Multer Secure File Storage', read: true, create: true, update: false, delete: false, storedProc: false },
      { module: 'MySQL Stored Procedures', read: false, create: false, update: false, delete: false, storedProc: false },
      { module: 'Security Audit & Auth Logs', read: false, create: false, update: false, delete: false, storedProc: false }
    ],
    securityProfile: {
      jwtScope: 'organica:employee:execute',
      sessionTtl: '2h access / 7d refresh token',
      rateLimitTier: 'Tier 3 (100 req/min)',
      auditLevel: 'Standard Endpoint Metrics'
    }
  },
  {
    roleId: 'customer',
    roleName: 'Enterprise Client / Customer',
    roleBadge: 'RBAC LEVEL 1 • ISOLATED CLIENT SCOPE',
    scopeDescription: 'Strictly segregated read-only visibility into client-facing task tracks, deliverable approvals, and scheduled client reviews.',
    routeGuardLevel: 'ALLOW /api/client/portal/* STRICT TENANT FILTER',
    modulePermissions: [
      { module: 'Project Lifecycle Management', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'Dual-Track Task Engine (Client Only)', read: true, create: false, update: true, delete: false, storedProc: false },
      { module: 'Sprint & Milestone Tracking', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'Meeting & Calendar Dispatcher', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'Multer Secure File Storage', read: true, create: false, update: false, delete: false, storedProc: false },
      { module: 'MySQL Stored Procedures', read: false, create: false, update: false, delete: false, storedProc: false },
      { module: 'Security Audit & Auth Logs', read: false, create: false, update: false, delete: false, storedProc: false }
    ],
    securityProfile: {
      jwtScope: 'organica:client:tenant_isolated',
      sessionTtl: '1h access / 24h refresh token',
      rateLimitTier: 'Tier 4 (60 req/min)',
      auditLevel: 'Tenant Boundary Enforcement'
    }
  }
];

export const OrganicaRbacMatrix: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0); // Admin initially
  const [activeTab, setActiveTab] = useState<'matrix' | 'security'>('matrix');

  const cursor = useOptionalCursor();
  const prefersReducedMotion = useReducedMotion();

  const currentRole = RBAC_ROLES[selectedRoleIndex];

  return (
    <div
      data-testid="organica-rbac-matrix"
      className="w-full bg-surface border border-border-hairline rounded-sm p-4 md:p-6 lg:p-8 text-chalk shadow-2xl relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cadmium animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest text-cadmium uppercase font-semibold">
              C2C Advanced Systems • Organica Ops Security Core
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display tracking-tight text-chalk">
            5-Role RBAC Authorization & Security Architecture
          </h3>
          <p className="text-xs md:text-sm text-mist font-sans mt-0.5">
            Interactive matrix inspecting role boundaries, route-level authorization guards, and MySQL stored procedure access.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              activeTab === 'matrix'
                ? 'bg-cadmium text-obsidian font-bold border-cadmium'
                : 'border-border-hairline text-mist hover:text-chalk'
            }`}
          >
            Permission Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
              activeTab === 'security'
                ? 'bg-cadmium text-obsidian font-bold border-cadmium'
                : 'border-border-hairline text-mist hover:text-chalk'
            }`}
          >
            Security Headers
          </button>
        </div>
      </div>

      {/* 5-Role Switcher Tabs */}
      <div className="my-5">
        <label className="text-[11px] font-mono text-mist uppercase tracking-wider block mb-2">
          Select Active Role to Inspect Authorization Boundary:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {RBAC_ROLES.map((role, idx) => {
            const isCurrent = idx === selectedRoleIndex;
            return (
              <button
                key={role.roleId}
                type="button"
                onClick={() => setSelectedRoleIndex(idx)}
                onMouseEnter={() => cursor?.setCursor('hover', role.roleName)}
                onMouseLeave={() => cursor?.resetCursor()}
                className={`p-2.5 text-left border transition-all ${
                  isCurrent
                    ? 'border-cadmium bg-cadmium/10 shadow-[0_0_12px_rgba(255,77,0,0.15)]'
                    : 'border-border-hairline bg-surface-elevated/40 text-mist hover:border-white/30 hover:text-chalk'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-mist">
                    LEVEL 0{5 - idx}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cadmium" aria-hidden="true" />
                  )}
                </div>
                <div className="text-xs font-mono font-bold text-chalk truncate">
                  {role.roleName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Summary Banner */}
      <div className="p-3.5 bg-surface-elevated border border-border-hairline mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono px-2 py-0.5 bg-cadmium/15 text-cadmium border border-cadmium/30 uppercase font-semibold">
              {currentRole.roleBadge}
            </span>
          </div>
          <p className="text-xs md:text-sm font-sans text-mist mt-1 leading-relaxed">
            {currentRole.scopeDescription}
          </p>
        </div>

        <div className="p-2 bg-obsidian border border-border-hairline font-mono text-xs text-chalk shrink-0">
          <div className="text-[9px] text-mist uppercase">API Route Guard Filter:</div>
          <div className="text-cadmium font-semibold text-[11px] truncate mt-0.5">
            {currentRole.routeGuardLevel}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      {activeTab === 'matrix' ? (
        /* Module Permission Table */
        <div className="overflow-x-auto border border-border-hairline bg-surface-elevated/40">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border-hairline bg-surface-elevated text-mist">
                <th className="py-2.5 px-4 uppercase tracking-wider text-[11px]">Backend Module</th>
                <th className="py-2.5 px-3 text-center uppercase tracking-wider text-[11px]">Read</th>
                <th className="py-2.5 px-3 text-center uppercase tracking-wider text-[11px]">Create</th>
                <th className="py-2.5 px-3 text-center uppercase tracking-wider text-[11px]">Update</th>
                <th className="py-2.5 px-3 text-center uppercase tracking-wider text-[11px]">Delete</th>
                <th className="py-2.5 px-3 text-center uppercase tracking-wider text-[11px]">Stored Proc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline/60">
              {currentRole.modulePermissions.map((mod, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-chalk flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-cadmium shrink-0" aria-hidden="true" />
                    <span>{mod.module}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {mod.read ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" aria-label="Permitted" />
                    ) : (
                      <X className="w-4 h-4 text-mist/30 mx-auto" aria-label="Denied" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {mod.create ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" aria-label="Permitted" />
                    ) : (
                      <X className="w-4 h-4 text-mist/30 mx-auto" aria-label="Denied" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {mod.update ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" aria-label="Permitted" />
                    ) : (
                      <X className="w-4 h-4 text-mist/30 mx-auto" aria-label="Denied" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {mod.delete ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" aria-label="Permitted" />
                    ) : (
                      <X className="w-4 h-4 text-mist/30 mx-auto" aria-label="Denied" />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {mod.storedProc ? (
                      <span className="px-1.5 py-0.5 text-[10px] bg-cadmium/15 text-cadmium border border-cadmium/30 font-bold">
                        EXEC
                      </span>
                    ) : (
                      <span className="text-mist/30">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Security Profile & Hardening */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-elevated border border-border-hairline space-y-3">
            <div className="text-xs font-mono text-cadmium uppercase font-semibold flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" aria-hidden="true" />
              <span>Tokenized Authentication Architecture</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-obsidian border border-border-hairline">
                <span className="text-mist block text-[10px] uppercase">JWT Scope:</span>
                <span className="text-chalk font-semibold">{currentRole.securityProfile.jwtScope}</span>
              </div>
              <div className="p-2.5 bg-obsidian border border-border-hairline">
                <span className="text-mist block text-[10px] uppercase">Session Duration:</span>
                <span className="text-chalk font-semibold">{currentRole.securityProfile.sessionTtl}</span>
              </div>
              <div className="p-2.5 bg-obsidian border border-border-hairline">
                <span className="text-mist block text-[10px] uppercase">Rate Limiting Filter:</span>
                <span className="text-chalk font-semibold">{currentRole.securityProfile.rateLimitTier}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-surface-elevated border border-border-hairline space-y-3">
            <div className="text-xs font-mono text-cadmium uppercase font-semibold flex items-center gap-1.5">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Enterprise HTTP & Data Hardening</span>
            </div>
            <div className="space-y-2 text-xs font-mono text-mist">
              <div className="p-2.5 bg-obsidian border border-border-hairline">
                <span className="text-chalk font-semibold block mb-0.5">Helmet.js Security Headers</span>
                <span>HSTS max-age=31536000, Content-Security-Policy restricted, X-Frame-Options: DENY.</span>
              </div>
              <div className="p-2.5 bg-obsidian border border-border-hairline">
                <span className="text-chalk font-semibold block mb-0.5">Bcrypt Password Hashing</span>
                <span>Salt rounds: 12. Password digests never persisted in plaintext or readable in memory.</span>
              </div>
              <div className="p-2.5 bg-obsidian border border-border-hairline">
                <span className="text-chalk font-semibold block mb-0.5">Multer File Sanitization</span>
                <span>MIME-type whitelist verification and randomized UUID storage on disk.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrganicaRbacMatrix;
