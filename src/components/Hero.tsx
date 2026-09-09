import React, { useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'motion/react';
import { ArrowDown, FileText, Terminal, ShieldCheck } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useOptionalCursor } from '../context/CursorContext';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

export interface HeroProps {
  onOpenResume?: () => void;
  onResumeOpen?: () => void;
  enableKeyboardNav?: boolean;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onResumeOpen,
  enableKeyboardNav = true,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cursor = useOptionalCursor();

  // Detect coarse pointer (touch devices) where 3D tilt should be bypassed
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      window.matchMedia?.('(pointer: coarse)').matches ||
      (!window.matchMedia && typeof navigator !== 'undefined' && (navigator.maxTouchPoints ?? 0) > 0)
    );
  });

  const triggerResume = useCallback(() => {
    const handler = onOpenResume || onResumeOpen;
    handler?.();
  }, [onOpenResume, onResumeOpen]);

  // Hook global [R] keyboard shortcut to open credentials
  useKeyboardNav({
    enabled: enableKeyboardNav,
    onToggleResume: triggerResume,
  });

  // Motion values for desktop pointer parallax tilt
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24 };
  const rotateXSpring = useSpring(
    useTransform(mouseNormY, [-0.5, 0.5], [6, -6]),
    springConfig
  );
  const rotateYSpring = useSpring(
    useTransform(mouseNormX, [-0.5, 0.5], [-6, 6]),
    springConfig
  );
  const translateXSpring = useSpring(
    useTransform(mouseNormX, [-0.5, 0.5], [-12, 12]),
    springConfig
  );
  const translateYSpring = useSpring(
    useTransform(mouseNormY, [-0.5, 0.5], [-12, 12]),
    springConfig
  );

  const handlePortraitMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || isTouchDevice) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      mouseNormX.set(normX);
      mouseNormY.set(normY);
    },
    [isTouchDevice, mouseNormX, mouseNormY, prefersReducedMotion]
  );

  const handlePortraitMouseEnter = useCallback(() => {
    cursor?.setCursor('inspect', 'PORTRAIT');
  }, [cursor]);

  const handlePortraitMouseLeave = useCallback(() => {
    mouseNormX.set(0);
    mouseNormY.set(0);
    cursor?.resetCursor();
  }, [cursor, mouseNormX, mouseNormY]);

  const handleCursorEnter = useCallback(() => {
    cursor?.setCursor('hover');
  }, [cursor]);

  const handleCursorLeave = useCallback(() => {
    cursor?.resetCursor();
  }, [cursor]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState(null, '', '#work');
      }
    } else if (typeof window !== 'undefined') {
      window.location.hash = '#work';
    }
  };

  // Kinetic typography staggered reveal animation variants
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: prefersReducedMotion ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.08,
          delayChildren: prefersReducedMotion ? 0 : 0.1,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    }),
    [prefersReducedMotion]
  );

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className={cn(
        'relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24 flex items-center justify-center overflow-hidden',
        'bg-obsidian text-chalk',
        className
      )}
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column (7 cols): Editorial Monolith Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            {/* Systems Telemetry Kicker */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest mb-4"
            >
              <div className="flex items-center gap-2 border border-border-hairline px-2.5 py-1 rounded-sm bg-surface/80 backdrop-blur-sm">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cadmium opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cadmium" />
                </span>
                <span className="text-chalk font-semibold">STATUS // AVAILABLE</span>
              </div>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-400 hidden sm:inline tracking-wider">
                13.0827° N, 80.2707° E // CHENNAI
              </span>
            </motion.div>

            {/* Editorial Headline Block */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <h1 className="font-display font-black tracking-tight text-chalk uppercase leading-[0.92] select-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="block text-chalk drop-shadow-sm">{resumeData.name}</span>
              </h1>
            </motion.div>

            {/* Role Monolith Kicker */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-white/[0.03] border border-border-hairline">
                <Terminal className="w-3.5 h-3.5 text-cadmium shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-zinc-200 uppercase">
                  SOFTWARE ENGINEER / SYSTEMS &amp; APPLIED AI
                </span>
              </div>
            </motion.div>

            {/* Editorial Narrative Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8"
            >
              Building high-throughput backend architectures, autonomous AI agents, and enterprise full-stack systems with relentless attention to software architecture.
            </motion.p>

            {/* Verified Credentials Quick Metrics Strip */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-border-hairline py-4 mb-8 font-mono text-xs"
            >
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[10px] tracking-wider uppercase">ACADEMICS</span>
                <span className="text-chalk font-semibold mt-0.5">SRM AP • CGPA 9.29</span>
              </div>
              <div className="flex flex-col border-l border-border-hairline pl-3">
                <span className="text-zinc-500 text-[10px] tracking-wider uppercase">EXPERIENCE</span>
                <span className="text-chalk font-semibold mt-0.5">BNY SDE INTERN</span>
              </div>
              <div className="flex flex-col border-l border-border-hairline pl-3 col-span-2 sm:col-span-1">
                <span className="text-zinc-500 text-[10px] tracking-wider uppercase">CERTIFICATION</span>
                <span className="text-chalk font-semibold mt-0.5">ORACLE JAVA SE 17</span>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              {/* Primary Anchor CTA to Selected Work */}
              <a
                href="#work"
                onClick={handleExploreClick}
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
                className={cn(
                  'group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5',
                  'bg-chalk text-obsidian font-mono text-xs font-bold uppercase tracking-wider',
                  'rounded-sm transition-all duration-200 shadow-md',
                  'hover:bg-white hover:shadow-lg hover:shadow-chalk/10',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cadmium'
                )}
              >
                <span>Explore Selected Work ↓</span>
                <ArrowDown
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Secondary CTA: Credentials / Resume Drawer Trigger */}
              <button
                type="button"
                onClick={triggerResume}
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
                aria-label="View Credentials [R]"
                className={cn(
                  'group inline-flex items-center justify-center gap-2 px-5 py-3.5',
                  'border border-border-subtle bg-surface text-zinc-300 font-mono text-xs font-semibold uppercase tracking-wider',
                  'rounded-sm transition-all duration-200',
                  'hover:text-chalk hover:border-zinc-500 hover:bg-surface-elevated',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cadmium'
                )}
              >
                <FileText className="w-4 h-4 text-zinc-400 group-hover:text-cadmium transition-colors" />
                <span>View Credentials</span>
                <span className="text-cadmium font-mono text-[11px] font-bold">[R]</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Integrated Editorial Studio Portrait */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none"
              style={{ perspective: 1000 }}
            >
              {/* Interactive 3D Tilt Parallax Container */}
              <motion.div
                data-testid="hero-portrait-container"
                onMouseMove={handlePortraitMouseMove}
                onMouseEnter={handlePortraitMouseEnter}
                onMouseLeave={handlePortraitMouseLeave}
                style={
                  prefersReducedMotion || isTouchDevice
                    ? {}
                    : {
                        rotateX: rotateXSpring,
                        rotateY: rotateYSpring,
                        x: translateXSpring,
                        y: translateYSpring,
                        transformStyle: 'preserve-3d',
                      }
                }
                className={cn(
                  'group relative aspect-[4/5] w-full rounded-sm overflow-hidden select-none',
                  'bg-surface border border-border-hairline shadow-2xl transition-colors duration-300',
                  'hover:border-border-subtle'
                )}
              >
                {/* Crosshair Architectural Blueprint Accents (Corner Ticks) */}
                <div
                  className="pointer-events-none absolute top-2 left-2 z-20 font-mono text-[10px] text-zinc-500 leading-none"
                  aria-hidden="true"
                >
                  +
                </div>
                <div
                  className="pointer-events-none absolute top-2 right-2 z-20 font-mono text-[10px] text-zinc-500 leading-none"
                  aria-hidden="true"
                >
                  +
                </div>
                <div
                  className="pointer-events-none absolute bottom-2 left-2 z-20 font-mono text-[10px] text-zinc-500 leading-none"
                  aria-hidden="true"
                >
                  +
                </div>
                <div
                  className="pointer-events-none absolute bottom-2 right-2 z-20 font-mono text-[10px] text-zinc-500 leading-none"
                  aria-hidden="true"
                >
                  +
                </div>

                {/* Studio Portrait Image */}
                <img
                  data-testid="hero-portrait-img"
                  src="/Santhosh_Portrait.jpg"
                  alt="K V Santhosh - Software Engineer / Systems & Applied AI"
                  width="600"
                  height="750"
                  loading="eager"
                  className={cn(
                    'w-full h-full object-cover object-center',
                    'filter grayscale-[12%] contrast-[1.04] brightness-[0.98]',
                    'transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0'
                  )}
                />

                {/* Editorial Vignette & Hairline Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-obsidian/30 z-10"
                  aria-hidden="true"
                />

                {/* Telemetry Badge 1: Education (Top Left Overlay) */}
                <div
                  data-testid="hero-badge-education"
                  className={cn(
                    'absolute top-4 left-4 z-20',
                    'flex items-center gap-2 px-3 py-1.5 rounded-sm',
                    'bg-obsidian/85 backdrop-blur-md border border-border-hairline',
                    'font-mono text-[10px] sm:text-[11px] text-zinc-200 tracking-wider shadow-lg'
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                  <span className="font-semibold">SRM UNIVERSITY AP • CGPA 9.29</span>
                </div>

                {/* Telemetry Badge 2: Experience (Bottom Right Overlay) */}
                <div
                  data-testid="hero-badge-experience"
                  className={cn(
                    'absolute bottom-4 right-4 z-20',
                    'flex items-center gap-2 px-3 py-1.5 rounded-sm',
                    'bg-obsidian/85 backdrop-blur-md border border-border-hairline',
                    'font-mono text-[10px] sm:text-[11px] text-zinc-200 tracking-wider shadow-lg'
                  )}
                >
                  <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cadmium opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cadmium" />
                  </span>
                  <span className="font-semibold text-chalk">BNY SDE INTERN</span>
                </div>

                {/* Bottom Left Coordinate Stamp */}
                <div
                  className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-zinc-500 tracking-widest hidden sm:block"
                  aria-hidden="true"
                >
                  ID: KV-SYSTEMS // 2026
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
