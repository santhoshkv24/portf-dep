import { useEffect, useRef } from 'react';

export interface KeyboardNavOptions {
  onNextSection?: () => void;
  onPrevSection?: () => void;
  onToggleResume?: () => void;
  onCloseDrawer?: () => void;
  sections?: string[];
  enabled?: boolean;
}

const DEFAULT_SECTIONS = ['hero', 'work', 'experience', 'systems', 'contact'];

/**
 * Listens for global keybindings:
 * - [J]: Navigate to next section
 * - [K]: Navigate to previous section
 * - [R]: Toggle resume drawer
 * - [Escape]: Close resume drawer
 *
 * Automatically suppresses shortcuts when user is focused inside text inputs,
 * textareas, or contentEditable elements, and when modifier keys are held.
 */
export function useKeyboardNav(options: KeyboardNavOptions = {}): void {
  const {
    onNextSection,
    onPrevSection,
    onToggleResume,
    onCloseDrawer,
    sections = DEFAULT_SECTIONS,
    enabled = true,
  } = options;

  // Store options in refs so event listener doesn't rebind on every render
  const optionsRef = useRef({
    onNextSection,
    onPrevSection,
    onToggleResume,
    onCloseDrawer,
    sections,
    enabled,
  });

  useEffect(() => {
    optionsRef.current = {
      onNextSection,
      onPrevSection,
      onToggleResume,
      onCloseDrawer,
      sections,
      enabled,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!optionsRef.current.enabled) {
        return;
      }

      // Ignore when typing in editable elements
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Never intercept browser combinations (Cmd+R, Ctrl+R, Alt+Tab, etc.)
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key;

      if (key === 'j' || key === 'J') {
        event.preventDefault?.();
        if (optionsRef.current.onNextSection) {
          optionsRef.current.onNextSection();
        } else {
          scrollToAdjacentSection('next', optionsRef.current.sections);
        }
      } else if (key === 'k' || key === 'K') {
        event.preventDefault?.();
        if (optionsRef.current.onPrevSection) {
          optionsRef.current.onPrevSection();
        } else {
          scrollToAdjacentSection('prev', optionsRef.current.sections);
        }
      } else if (key === 'r' || key === 'R') {
        event.preventDefault?.();
        optionsRef.current.onToggleResume?.();
      } else if (key === 'Escape') {
        optionsRef.current.onCloseDrawer?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

function scrollToAdjacentSection(direction: 'next' | 'prev', sectionIds: string[]): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const elements = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (elements.length === 0) {
    return;
  }

  let currentIndex = 0;

  for (let i = 0; i < elements.length; i++) {
    const rect = elements[i].getBoundingClientRect();
    if (rect.top <= 120) {
      currentIndex = i;
    }
  }

  if (direction === 'next') {
    const nextIndex = Math.min(currentIndex + 1, elements.length - 1);
    elements[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
  } else {
    const prevIndex = Math.max(currentIndex - 1, 0);
    elements[prevIndex]?.scrollIntoView({ behavior: 'smooth' });
  }
}
