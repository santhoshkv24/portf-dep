import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useReducedMotion } from '../src/hooks/useReducedMotion';
import { useKeyboardNav } from '../src/hooks/useKeyboardNav';
import { useLenis } from '../src/hooks/useLenis';
import { CursorProvider, useCursor } from '../src/context/CursorContext';
import { CustomCursor } from '../src/components/CustomCursor';

describe('useReducedMotion', () => {
  let listeners: ((e: MediaQueryListEvent) => void)[] = [];
  let matchesValue = false;

  beforeEach(() => {
    listeners = [];
    matchesValue = false;

    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => {
      const isReducedMotion = query.includes('prefers-reduced-motion');
      return {
        matches: isReducedMotion ? matchesValue : false,
        media: query,
        onchange: null,
        addListener: (cb: (e: MediaQueryListEvent) => void) => listeners.push(cb),
        removeListener: (cb: (e: MediaQueryListEvent) => void) => {
          listeners = listeners.filter((l) => l !== cb);
        },
        addEventListener: (event: string, cb: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.push(cb);
        },
        removeEventListener: (event: string, cb: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners = listeners.filter((l) => l !== cb);
        },
        dispatchEvent: () => false,
      } as unknown as MediaQueryList;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false by default when reduced motion is not preferred', () => {
    matchesValue = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion matches', () => {
    matchesValue = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates dynamically when media query changes', () => {
    matchesValue = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((listener) =>
        listener({ matches: true, media: '(prefers-reduced-motion: reduce)' } as MediaQueryListEvent)
      );
    });

    expect(result.current).toBe(true);

    act(() => {
      listeners.forEach((listener) =>
        listener({ matches: false, media: '(prefers-reduced-motion: reduce)' } as MediaQueryListEvent)
      );
    });

    expect(result.current).toBe(false);
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useReducedMotion());
    expect(listeners.length).toBeGreaterThan(0);

    unmount();
    expect(listeners.length).toBe(0);
  });

  it('supports legacy addListener and removeListener fallback', () => {
    let legacyListeners: ((e: MediaQueryListEvent) => void)[] = [];
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: (cb: (e: MediaQueryListEvent) => void) => legacyListeners.push(cb),
        removeListener: (cb: (e: MediaQueryListEvent) => void) => {
          legacyListeners = legacyListeners.filter((l) => l !== cb);
        },
      } as unknown as MediaQueryList;
    });

    const { unmount } = renderHook(() => useReducedMotion());
    expect(legacyListeners.length).toBe(1);

    unmount();
    expect(legacyListeners.length).toBe(0);
  });
});

describe('useKeyboardNav', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('triggers onNextSection when [J] or [j] is pressed', () => {
    const onNext = vi.fn();
    renderHook(() => useKeyboardNav({ onNextSection: onNext }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
    expect(onNext).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'J', bubbles: true }));
    expect(onNext).toHaveBeenCalledTimes(2);
  });

  it('triggers onPrevSection when [K] or [k] is pressed', () => {
    const onPrev = vi.fn();
    renderHook(() => useKeyboardNav({ onPrevSection: onPrev }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }));
    expect(onPrev).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'K', bubbles: true }));
    expect(onPrev).toHaveBeenCalledTimes(2);
  });

  it('triggers onToggleResume when [R] or [r] is pressed', () => {
    const onToggle = vi.fn();
    renderHook(() => useKeyboardNav({ onToggleResume: onToggle }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }));
    expect(onToggle).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'R', bubbles: true }));
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it('triggers onCloseDrawer when [Escape] is pressed', () => {
    const onClose = vi.fn();
    renderHook(() => useKeyboardNav({ onCloseDrawer: onClose }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ignores hotkeys when typing in input, textarea, or contentEditable element', () => {
    const onNext = vi.fn();
    const onToggle = vi.fn();
    renderHook(() => useKeyboardNav({ onNextSection: onNext, onToggleResume: onToggle }));

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }));

    expect(onNext).not.toHaveBeenCalled();
    expect(onToggle).not.toHaveBeenCalled();

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();

    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }));
    expect(onNext).not.toHaveBeenCalled();
  });

  it('ignores hotkeys when modifier keys (meta, ctrl, alt) are held', () => {
    const onToggle = vi.fn();
    const onNext = vi.fn();
    renderHook(() => useKeyboardNav({ onToggleResume: onToggle, onNextSection: onNext }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', metaKey: true, bubbles: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', ctrlKey: true, bubbles: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', altKey: true, bubbles: true }));

    expect(onToggle).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });

  it('falls back to section scroll when callbacks are not provided', () => {
    const sec1 = document.createElement('section');
    sec1.id = 'hero';
    sec1.scrollIntoView = vi.fn();
    document.body.appendChild(sec1);

    const sec2 = document.createElement('section');
    sec2.id = 'work';
    sec2.scrollIntoView = vi.fn();
    document.body.appendChild(sec2);

    renderHook(() => useKeyboardNav({ sections: ['hero', 'work'] }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
    expect(sec2.scrollIntoView).toHaveBeenCalled();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }));
    expect(sec1.scrollIntoView).toHaveBeenCalled();
  });

  it('cleans up event listener on unmount', () => {
    const onNext = vi.fn();
    const { unmount } = renderHook(() => useKeyboardNav({ onNextSection: onNext }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
    expect(onNext).toHaveBeenCalledTimes(1);

    unmount();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('respects enabled: false flag', () => {
    const onNext = vi.fn();
    const onToggle = vi.fn();
    renderHook(() => useKeyboardNav({ onNextSection: onNext, onToggleResume: onToggle, enabled: false }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }));

    expect(onNext).not.toHaveBeenCalled();
    expect(onToggle).not.toHaveBeenCalled();
  });
});

describe('CursorContext & useCursor', () => {
  it('throws error when useCursor is called outside of CursorProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCursor())).toThrowError('useCursor must be used within a CursorProvider');
    spy.mockRestore();
  });

  it('provides default cursorState and cursorText', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
      React.createElement(CursorProvider, null, children);
    const { result } = renderHook(() => useCursor(), { wrapper });

    expect(result.current.cursorState).toBe('default');
    expect(result.current.cursorText).toBe('');
  });

  it('updates cursorState, cursorText, and handles setCursor & resetCursor', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
      React.createElement(CursorProvider, null, children);
    const { result } = renderHook(() => useCursor(), { wrapper });

    act(() => {
      result.current.setCursorState('hover');
      result.current.setCursorText('VIEW');
    });

    expect(result.current.cursorState).toBe('hover');
    expect(result.current.cursorText).toBe('VIEW');

    act(() => {
      result.current.setCursor('inspect', '[INSPECT]');
    });

    expect(result.current.cursorState).toBe('inspect');
    expect(result.current.cursorText).toBe('[INSPECT]');

    act(() => {
      result.current.resetCursor();
    });

    expect(result.current.cursorState).toBe('default');
    expect(result.current.cursorText).toBe('');
  });
});

describe('useLenis', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes Lenis on desktop and sets up RAF loop', async () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 123);
    const cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList));

    const { result, unmount } = renderHook(() => useLenis());

    expect(result.current).not.toBeNull();
    expect(rafSpy).toHaveBeenCalled();

    unmount();
    expect(cafSpy).toHaveBeenCalled();
  });

  it('does not initialize Lenis on touch devices', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList));

    const { result } = renderHook(() => useLenis());
    expect(result.current).toBeNull();
  });

  it('does not initialize Lenis when prefers-reduced-motion matches', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList));

    const { result } = renderHook(() => useLenis());
    expect(result.current).toBeNull();
  });
});

describe('CustomCursor Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList));
  });

  it('renders dot and ring with default styles on desktop', () => {
    render(
      React.createElement(
        CursorProvider,
        null,
        React.createElement(CustomCursor)
      )
    );

    const cursorContainer = screen.getByTestId('custom-cursor');
    expect(cursorContainer).toBeInTheDocument();

    const dot = screen.getByTestId('cursor-dot');
    const ring = screen.getByTestId('cursor-ring');

    expect(dot).toBeInTheDocument();
    expect(ring).toBeInTheDocument();
  });

  it('renders cursor context label when cursorText is set', () => {
    const TestConsumer = () => {
      const { setCursor } = useCursor();
      React.useEffect(() => {
        setCursor('inspect', '[INSPECT]');
      }, [setCursor]);

      return React.createElement(CustomCursor);
    };

    render(
      React.createElement(
        CursorProvider,
        null,
        React.createElement(TestConsumer)
      )
    );

    const label = screen.getByTestId('cursor-text');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('[INSPECT]');
  });

  it('does not render when prefers-reduced-motion is true', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList));

    render(
      React.createElement(
        CursorProvider,
        null,
        React.createElement(CustomCursor)
      )
    );

    expect(screen.queryByTestId('custom-cursor')).toBeNull();
  });

  it('does not render when pointer: coarse is true (touchscreen)', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList));

    render(
      React.createElement(
        CursorProvider,
        null,
        React.createElement(CustomCursor)
      )
    );

    expect(screen.queryByTestId('custom-cursor')).toBeNull();
  });

  it('tracks mousemove and mouseenter/mouseleave visibility', () => {
    render(
      React.createElement(
        CursorProvider,
        null,
        React.createElement(CustomCursor)
      )
    );

    const container = screen.getByTestId('custom-cursor');

    fireEvent.mouseMove(window, { clientX: 200, clientY: 300 });
    expect(container.className).toContain('opacity-100');

    fireEvent(document, new Event('mouseleave'));
    expect(container.className).toContain('opacity-0');

    fireEvent(document, new Event('mouseenter'));
    expect(container.className).toContain('opacity-100');
  });

  it('adapts ring classes when cursorState changes to hover, inspect, and drag', () => {
    let setCursorFn: (state: any, text?: string) => void = () => {};

    const TestStateConsumer = () => {
      const { setCursor } = useCursor();
      setCursorFn = setCursor;
      return React.createElement(CustomCursor);
    };

    render(
      React.createElement(
        CursorProvider,
        null,
        React.createElement(TestStateConsumer)
      )
    );

    const ring = screen.getByTestId('cursor-ring');

    // Default ring
    expect(ring.className).toContain('border-[#ff4d00]/40');

    // Hover state
    act(() => {
      setCursorFn('hover');
    });
    expect(ring.className).toContain('bg-[#ff4d00]/10');

    // Inspect state
    act(() => {
      setCursorFn('inspect', '[INSPECT]');
    });
    expect(ring.className).toContain('bg-[#ff4d00]/15');
    expect(screen.getByTestId('cursor-text')).toHaveTextContent('[INSPECT]');

    // Drag state
    act(() => {
      setCursorFn('drag');
    });
    expect(ring.className).toContain('bg-[#ff4d00]/20');
  });
});
