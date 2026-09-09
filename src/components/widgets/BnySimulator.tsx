import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Database,
  Layers,
  BarChart3,
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';
import { useOptionalCursor } from '../../context/CursorContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface BnyPromptPreset {
  id: string;
  label: string;
  query: string;
  intent: string;
  entities: string[];
  graphqlQuery: string;
  datasets: { name: string; latencyMs: number; status: 'retrieved' | 'cached' }[];
  dashboard: {
    title: string;
    metrics: { label: string; value: string; delta?: string; trend?: 'up' | 'down' | 'stable' }[];
    chartData: { label: string; value: number }[];
    insights: string[];
  };
}

export const BNY_PRESETS: BnyPromptPreset[] = [
  {
    id: 'liquidity-risk',
    label: 'APAC & EMEA Liquidity vs Risk',
    query: 'Query liquidity vs risk exposure across APAC & EMEA datasets for current cycle',
    intent: 'INTENT_MULTI_DATASET_RISK_AGGREGATION',
    entities: ['REGION: APAC', 'REGION: EMEA', 'DIMENSION: LIQUIDITY', 'DIMENSION: RISK_EXPOSURE'],
    graphqlQuery: `query GetCrossRegionalTelemetry {
  liquidityPool(regions: [APAC, EMEA]) {
    netLiquidityUSD
    stressBufferRatio
  }
  riskLedger(depth: COMPREHENSIVE) {
    varExposurePercent
    complianceStatus
  }
}`,
    datasets: [
      { name: 'APAC Liquidity Lake (Singapore SG1)', latencyMs: 38, status: 'retrieved' },
      { name: 'EMEA Risk Vault (London LD4)', latencyMs: 44, status: 'retrieved' },
      { name: 'Global Treasury Ledger (New York NY2)', latencyMs: 29, status: 'cached' }
    ],
    dashboard: {
      title: 'Cross-Regional Liquidity & Risk Vector',
      metrics: [
        { label: 'Net Available Liquidity', value: '$4.82B', delta: '+4.2%', trend: 'up' },
        { label: 'VaR 99% Stress Ratio', value: '1.42%', delta: '-0.18%', trend: 'down' },
        { label: 'Total Capital Adequacy', value: '18.6%', delta: 'Optimal', trend: 'stable' }
      ],
      chartData: [
        { label: 'APAC Tier 1', value: 84 },
        { label: 'EMEA Tier 1', value: 92 },
        { label: 'Overnight Buffer', value: 68 },
        { label: 'FX Reserve', value: 76 }
      ],
      insights: [
        'APAC liquidity buffer stands at 134% of minimum regulatory threshold.',
        'Zero cross-currency deficit detected in EMEA intraday clearing queue.'
      ]
    }
  },
  {
    id: 'trade-latency',
    label: 'Q2 Trade Latency Spikes',
    query: 'Summarize trade execution latency spikes for Q2 and locate root microservice',
    intent: 'INTENT_EXECUTION_LATENCY_ROOT_CAUSE',
    entities: ['WINDOW: Q2_2026', 'METRIC: P99_LATENCY', 'FILTER: ANOMALY_SPIKES'],
    graphqlQuery: `query QueryExecutionSpikes {
  orderRouter(window: "2026-Q2", percentile: P99) {
    timestamp
    latencyMs
    originService
    retryCount
  }
}`,
    datasets: [
      { name: 'Matching Engine Telemetry (Equinix NY4)', latencyMs: 22, status: 'retrieved' },
      { name: 'FIX Gateway Audit Logs', latencyMs: 31, status: 'retrieved' }
    ],
    dashboard: {
      title: 'Order Router P99 Latency Profile (Q2)',
      metrics: [
        { label: 'P99 Latency Mean', value: '4.8ms', delta: '-1.2ms', trend: 'down' },
        { label: 'Peak Anomaly Spike', value: '18.4ms', delta: 'Transient', trend: 'up' },
        { label: 'Downstream SLA', value: '99.98%', delta: '+0.03%', trend: 'up' }
      ],
      chartData: [
        { label: 'Routing Stage', value: 24 },
        { label: 'Validation Stage', value: 36 },
        { label: 'Core Matching', value: 92 },
        { label: 'Settlement Push', value: 45 }
      ],
      insights: [
        'Anomaly isolated to upstream FIX batch bursts during NY market open (9:30-9:35 AM).',
        'Eliza agent dynamic dashboard replaces static SQL script with instantaneous SLA drill-down.'
      ]
    }
  },
  {
    id: 'portfolio-breakdown',
    label: 'Multi-Dataset Visual Synthesis',
    query: 'Generate multi-dataset visual breakdown for institutional portfolio risk distribution',
    intent: 'INTENT_DYNAMIC_DASHBOARD_SYNTHESIS',
    entities: ['ASSET_CLASS: FIXED_INCOME', 'ASSET_CLASS: DERIVATIVES', 'MODE: DYNAMIC_VIZ'],
    graphqlQuery: `query GenerateDynamicVisualMatrix {
  portfolioSlices(type: INSTITUTIONAL) {
    category
    exposureUSD
    hedgingRatio
  }
}`,
    datasets: [
      { name: 'Core Custody Engine', latencyMs: 26, status: 'retrieved' },
      { name: 'Collateral Management Pipeline', latencyMs: 34, status: 'retrieved' }
    ],
    dashboard: {
      title: 'Institutional Risk & Collateral Coverage',
      metrics: [
        { label: 'Managed Assets', value: '$12.4B', delta: '+7.1%', trend: 'up' },
        { label: 'Hedge Ratio', value: '98.4%', delta: '+0.8%', trend: 'up' },
        { label: 'Active Counterparties', value: '412', delta: 'Normal', trend: 'stable' }
      ],
      chartData: [
        { label: 'Sovereign Debt', value: 88 },
        { label: 'Commercial Paper', value: 64 },
        { label: 'Interest Rate Swaps', value: 78 },
        { label: 'Repo Collateral', value: 95 }
      ],
      insights: [
        'Automated intent resolution bypassed manual 30-minute static spreadsheet compilation.',
        'Synthesized real-time dashboard assembled on demand in 184ms.'
      ]
    }
  }
];

export const BnySimulator: React.FC = () => {
  const [activePreset, setActivePreset] = useState<BnyPromptPreset>(BNY_PRESETS[0]);
  const [customQuery, setCustomQuery] = useState(BNY_PRESETS[0].query);
  const [currentStage, setCurrentStage] = useState<number>(4); // 1 to 4
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'graphql' | 'pipeline'>('dashboard');

  const cursor = useOptionalCursor();
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const runSimulation = (preset: BnyPromptPreset = activePreset) => {
    clearTimers();
    setIsSimulating(true);
    setCurrentStage(1);

    if (prefersReducedMotion) {
      setCurrentStage(4);
      setIsSimulating(false);
      return;
    }

    const t1 = setTimeout(() => setCurrentStage(2), 500);
    const t2 = setTimeout(() => setCurrentStage(3), 1100);
    const t3 = setTimeout(() => {
      setCurrentStage(4);
      setIsSimulating(false);
    }, 1800);

    timerRef.current = [t1, t2, t3];
  };

  const handleSelectPreset = (preset: BnyPromptPreset) => {
    setActivePreset(preset);
    setCustomQuery(preset.query);
    runSimulation(preset);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    runSimulation(activePreset);
  };

  return (
    <div
      data-testid="bny-simulator"
      className="w-full bg-surface border border-border-hairline rounded-sm p-4 md:p-6 lg:p-8 text-chalk shadow-2xl relative overflow-hidden"
    >
      {/* Simulation Header / Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cadmium animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest text-cadmium uppercase font-semibold">
              Eliza Platform • Live Simulation
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display tracking-tight text-chalk">
            Conversational Agent & GraphQL Synthesis Engine
          </h3>
          <p className="text-xs md:text-sm text-mist font-sans mt-0.5">
            Demonstrating natural-language data retrieval and dynamic dashboard generation across BNY enterprise datasets.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => runSimulation(activePreset)}
            disabled={isSimulating}
            onMouseEnter={() => cursor?.setCursor('hover', 'RUN AGENT')}
            onMouseLeave={() => cursor?.resetCursor()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cadmium hover:bg-cadmium-hover text-obsidian text-xs font-mono font-bold tracking-wider uppercase transition-colors disabled:opacity-50"
            aria-label="Re-run simulation"
          >
            <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            <span>{isSimulating ? 'Executing...' : 'Re-Run'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              clearTimers();
              setIsSimulating(false);
              setCurrentStage(1);
            }}
            onMouseEnter={() => cursor?.setCursor('hover', 'RESET')}
            onMouseLeave={() => cursor?.resetCursor()}
            className="p-1.5 border border-border-hairline hover:border-white/30 text-mist hover:text-chalk transition-colors"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="py-4 border-b border-border-hairline">
        <label className="text-[11px] font-mono text-mist uppercase tracking-wider block mb-2">
          Select Natural-Language Enterprise Prompt:
        </label>
        <div className="flex flex-wrap gap-2">
          {BNY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              onMouseEnter={() => cursor?.setCursor('hover', 'SELECT')}
              onMouseLeave={() => cursor?.resetCursor()}
              className={`px-3 py-1.5 text-xs font-mono border transition-all text-left ${
                activePreset.id === preset.id
                  ? 'bg-cadmium/10 border-cadmium text-chalk shadow-[0_0_15px_rgba(255,77,0,0.15)]'
                  : 'bg-surface-elevated/40 border-border-hairline text-mist hover:border-white/30 hover:text-chalk'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input Form */}
      <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Terminal className="w-4 h-4 text-cadmium absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask conversational query across financial datasets..."
            className="w-full bg-surface-elevated/80 border border-border-hairline focus:border-cadmium text-chalk font-mono text-xs md:text-sm pl-9 pr-3 py-2 outline-none transition-colors"
            aria-label="Enter plain English query"
          />
        </div>
        <button
          type="submit"
          disabled={isSimulating}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-chalk text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          Execute
        </button>
      </form>

      {/* 4-Stage Pipeline Progress Indicator */}
      <div className="my-5 p-3 bg-surface-elevated/30 border border-border-hairline rounded-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { step: 1, title: 'Intent Classification', icon: Sparkles },
            { step: 2, title: 'GraphQL Synthesis', icon: Code2 },
            { step: 3, title: 'Dataset Retrieval', icon: Database },
            { step: 4, title: 'Dynamic Dashboard', icon: BarChart3 }
          ].map(({ step, title, icon: Icon }) => {
            const isCompleted = currentStage >= step;
            const isCurrent = currentStage === step && isSimulating;
            return (
              <div
                key={step}
                className={`p-2 border transition-all text-xs font-mono flex items-center gap-2 ${
                  isCurrent
                    ? 'border-cadmium bg-cadmium/10 text-chalk'
                    : isCompleted
                    ? 'border-white/20 bg-surface-elevated text-chalk'
                    : 'border-border-hairline/40 text-mist/60'
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cadmium shrink-0" aria-hidden="true" />
                ) : (
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-cadmium animate-spin' : 'text-mist'}`}
                    aria-hidden="true"
                  />
                )}
                <div className="truncate">
                  <div className="text-[10px] text-mist">0{step} STAGE</div>
                  <div className="truncate font-semibold">{title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Display Tabs */}
      <div className="flex border-b border-border-hairline gap-4 text-xs font-mono uppercase tracking-wider mb-4">
        {[
          { id: 'dashboard', label: 'Visual Dashboard', icon: BarChart3 },
          { id: 'graphql', label: 'Generated GraphQL', icon: Code2 },
          { id: 'pipeline', label: 'Telemetry & Datasets', icon: Layers }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-cadmium text-cadmium font-bold'
                : 'border-transparent text-mist hover:text-chalk'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[260px]">
        {/* Tab 1: Visual Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="font-display text-lg text-chalk flex items-center gap-2">
                <span>{activePreset.dashboard.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cadmium/15 text-cadmium border border-cadmium/30">
                  REAL-TIME ASSEMBLY
                </span>
              </h4>
              <span className="text-[11px] font-mono text-mist">
                Rendered on demand • Latency: 184ms
              </span>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activePreset.dashboard.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-surface-elevated border border-border-hairline">
                  <div className="text-[10px] font-mono text-mist uppercase">{m.label}</div>
                  <div className="text-xl md:text-2xl font-mono font-bold text-chalk mt-1">{m.value}</div>
                  {m.delta && (
                    <div
                      className={`text-[11px] font-mono mt-0.5 ${
                        m.trend === 'up'
                          ? 'text-emerald-400'
                          : m.trend === 'down'
                          ? 'text-amber-400'
                          : 'text-mist'
                      }`}
                    >
                      {m.delta} vs prior cycle
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Simulated Bar Telemetry Chart */}
            <div className="p-4 bg-surface-elevated/60 border border-border-hairline">
              <div className="text-xs font-mono text-mist uppercase mb-3 flex justify-between">
                <span>Component Telemetry Vector</span>
                <span>Relative Allocation Index (%)</span>
              </div>
              <div className="space-y-2.5">
                {activePreset.dashboard.chartData.map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-chalk">{bar.label}</span>
                      <span className="text-cadmium font-semibold">{bar.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-obsidian border border-border-hairline/60 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cadmium to-cadmium-hover transition-all duration-700 ease-out"
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Insights */}
            <div className="p-3 bg-cadmium/[0.04] border border-cadmium/20 rounded-sm">
              <div className="text-[11px] font-mono text-cadmium uppercase font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Agent Synthesized Insights</span>
              </div>
              <ul className="text-xs font-sans text-mist space-y-1 pl-4 list-disc marker:text-cadmium">
                {activePreset.dashboard.insights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Generated GraphQL Query */}
        {activeTab === 'graphql' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-mist">
              <span>Schema Target: Eliza Core Federation Gateway v2.4</span>
              <span className="text-emerald-400">● Schema Validated</span>
            </div>
            <pre className="p-4 bg-obsidian border border-border-hairline font-mono text-xs text-cadmium leading-relaxed overflow-x-auto selection:bg-cadmium selection:text-obsidian">
              <code>{activePreset.graphqlQuery}</code>
            </pre>
            <div className="text-xs font-sans text-mist flex items-start gap-2 bg-surface-elevated p-3 border border-border-hairline">
              <Code2 className="w-4 h-4 text-cadmium shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Architectural Impact:</strong> Instead of manual analysts crafting multi-table SQL queries across regional databases, the conversational agent parses natural language intent and synthesizes schema-validated GraphQL queries dynamically.
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Pipeline & Datasets */}
        {activeTab === 'pipeline' && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-mist">
              Target Datasets Traversed by Agent Execution Engine:
            </div>
            <div className="space-y-2">
              {activePreset.datasets.map((ds, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-surface-elevated border border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cadmium" aria-hidden="true" />
                    <span className="text-xs font-mono text-chalk font-semibold">{ds.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-mist">{ds.latencyMs}ms roundtrip</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                        ds.status === 'cached'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {ds.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-surface-elevated/40 border border-border-hairline text-xs font-mono space-y-1">
              <div className="text-mist text-[10px] uppercase tracking-wider">Extracted Entities & Intent:</div>
              <div className="text-cadmium font-semibold">{activePreset.intent}</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {activePreset.entities.map((ent, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] bg-white/5 border border-border-hairline text-chalk"
                  >
                    {ent}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BnySimulator;
