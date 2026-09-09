import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursor } from '../context/CursorContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Renders a spring-animated custom cursor composed of an immediate cadmium dot
 * and a physics-damped outer magnetic ring.
 *
 * Automatically suppresses rendering on touchscreens, coarse pointer devices,
 * and when prefers-reduced-motion is requested.
 */
export const CustomCursor: React.FC = () => {
  const { cursorState, cursorText } = useCursor();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Direct mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Calibrated spring physics for fluid magnetic ring following
  const springConfig = { stiffness: 280, damping: 28 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Detect touch / coarse pointer devices
    const checkTouch = () => {
      const isCoarse = Boolean(
        window.matchMedia?.('(pointer: coarse)').matches ||
        (!window.matchMedia && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
      );
      setIsTouchDevice(isCoarse);
    };

    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Completely omit from DOM when reduced motion is preferred or device is touch-based
  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  // Context-aware sizing and styling
  let ringSize = 24;
  let ringClasses = 'border-[#ff4d00]/40 bg-transparent';

  switch (cursorState) {
    case 'hover':
      ringSize = 48;
      ringClasses = 'border-[#ff4d00] bg-[#ff4d00]/10';
      break;
    case 'inspect':
      ringSize = 56;
      ringClasses = 'border-[#ff4d00] bg-[#ff4d00]/15';
      break;
    case 'drag':
      ringSize = 44;
      ringClasses = 'border-[#ff4d00] bg-[#ff4d00]/20';
      break;
    default:
      ringSize = 24;
      ringClasses = 'border-[#ff4d00]/40 bg-transparent';
      break;
  }

  return (
    <div
      data-testid="custom-cursor"
      className={`custom-cursor-container pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Spring-lagged Outer Ring */}
      <motion.div
        data-testid="cursor-ring"
        className={`absolute rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center ${ringClasses}`}
        style={{
          x: smoothX,
          y: smoothY,
          width: ringSize,
          height: ringSize,
          translateX: -ringSize / 2,
          translateY: -ringSize / 2,
        }}
      >
        {cursorText && (
          <span
            data-testid="cursor-text"
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[#ff4d00] select-none pointer-events-none"
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Immediate Solid Cadmium Dot */}
      <motion.div
        data-testid="cursor-dot"
        className="absolute w-2 h-2 rounded-full bg-[#ff4d00] -translate-x-1 -translate-y-1"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </div>
  );
};
