import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useOptionalCursor } from '../context/CursorContext';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { cn } from '../utils/cn';

export interface HeaderHUDProps {
  onOpenResume?: () => void;
  onResumeOpen?: () => void;
  enableKeyboardNav?: boolean;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Systems', href: '#systems' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Module-scoped formatter for standard 24-hour Indian Standard Time (IST)
 * representation: "HH:mm:ss IST" using the Asia/Kolkata timezone.
 */
const istFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/**
 * Formats a Date instance into standard 24-hour Indian Standard Time (IST)
 * representation: "HH:mm:ss IST" using the Asia/Kolkata timezone.
 */
export function formatISTTime(date: Date = new Date()): string {
  return `${istFormatter.format(date)} IST`;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  onOpenResume,
  onResumeOpen,
  enableKeyboardNav = true,
  className,
}) => {
  const [time, setTime] = useState<string>(() => formatISTTime());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Safely acquire optional cursor context without throwing outside provider
  const cursor = useOptionalCursor();

  const handleCursorEnter = useCallback(() => {
    cursor?.setCursor('hover');
  }, [cursor]);

  const handleCursorLeave = useCallback(() => {
    cursor?.resetCursor();
  }, [cursor]);

  const triggerResume = useCallback(() => {
    const handler = onOpenResume || onResumeOpen;
    handler?.();
  }, [onOpenResume, onResumeOpen]);

  // Live ticking IST clock with cleanup
  useEffect(() => {
    const tick = () => {
      setTime(formatISTTime());
    };

    tick();
    const timer = setInterval(tick, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Global hotkeys support [R] to open resume drawer and [Escape] to close mobile menu
  useKeyboardNav({
    enabled: enableKeyboardNav,
    onToggleResume: triggerResume,
    onCloseDrawer: () => {
      setIsMobileMenuOpen(false);
    },
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/^#/, '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState(null, '', href);
      }
    } else if (typeof window !== 'undefined') {
      window.location.hash = href;
    }

    setIsMobileMenuOpen(false);
  };

  const handleMobileResumeClick = () => {
    triggerResume();
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="header-hud"
      className={cn(
        'fixed top-0 left-0 right-0 z-40 w-full',
        'bg-obsidian/85 backdrop-blur-md',
        'border-b border-border-hairline',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Telemetry: Identity + Location & IST Clock */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
            className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-cadmium"
          >
            <span className="font-display font-bold tracking-tight text-chalk text-sm sm:text-base group-hover:text-white transition-colors truncate">
              {resumeData.name}
            </span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:block">
              SYSTEMS ARCHITECTURE / APPLIED AI
            </span>
          </a>

          {/* Telemetry pulse and Chennai IST timestamp */}
          <div className="flex items-center gap-2 border-l border-border-hairline pl-4 sm:pl-6 text-xs font-mono">
            <span
              className="relative flex h-2 w-2 items-center justify-center shrink-0"
              aria-label="Systems active telemetry pulse"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cadmium opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cadmium" />
            </span>
            <span className="text-zinc-500 text-[11px] hidden lg:inline">CHENNAI</span>
            <span
              data-testid="ist-clock"
              className="text-zinc-300 tabular-nums text-xs sm:text-[13px] tracking-tight"
            >
              {time}
            </span>
          </div>
        </div>

        {/* Center Editorial Navigation (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-widest"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={handleCursorEnter}
              onMouseLeave={handleCursorLeave}
              className="relative text-zinc-400 hover:text-chalk py-1 transition-colors duration-150 group focus:outline-none focus-visible:text-cadmium"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cadmium transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Shortcut hint, Resume trigger & Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Section nav shortcut hint [J/K] */}
          <div
            className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 border border-border-hairline px-2.5 py-1 rounded bg-white/[0.02]"
            title="Use J and K keys to smoothly navigate between sections"
          >
            <span className="text-zinc-400">NAV</span>
            <kbd className="text-cadmium font-semibold tracking-wider">[J/K]</kbd>
          </div>

          {/* Quick Action Resume (R) Button */}
          <button
            type="button"
            onClick={triggerResume}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
            aria-label="Open Resume [R]"
            className={cn(
              'hidden sm:flex items-center gap-2 px-3 py-1.5 rounded',
              'text-xs font-mono text-chalk border border-white/[0.12]',
              'bg-white/[0.03] hover:bg-cadmium/10 hover:border-cadmium/50 hover:text-white',
              'transition-all duration-200 group focus:outline-none focus-visible:ring-1 focus-visible:ring-cadmium'
            )}
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cadmium transition-colors" />
            <span>Resume</span>
            <kbd className="text-[10px] text-cadmium bg-white/[0.05] px-1 py-0.5 rounded border border-border-hairline font-bold">
              [R]
            </kbd>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? 'mobile-nav-drawer' : undefined}
            className={cn(
              'md:hidden p-2 rounded text-zinc-400 hover:text-chalk border border-border-hairline',
              'bg-white/[0.02] hover:bg-white/[0.06] transition-colors',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-cadmium'
            )}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-chalk" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-zinc-300" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          data-testid="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden border-b border-border-hairline bg-obsidian/98 backdrop-blur-xl px-4 py-5 flex flex-col gap-4 transition-all duration-200 ease-out"
        >
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-mono text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-zinc-600 text-xs tracking-wider font-mono">
                  {item.href}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile Actions & Telemetry Footer */}
          <div className="pt-3 border-t border-border-hairline flex flex-col gap-3">
            <button
              type="button"
              onClick={handleMobileResumeClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded text-xs font-mono text-white bg-cadmium hover:bg-cadmium-hover transition-colors font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>Open Resume [R]</span>
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 px-1 pt-1">
              <span>IST CLOCK: {time}</span>
              <span className="text-cadmium font-medium">[J/K] SECTION NAV</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
