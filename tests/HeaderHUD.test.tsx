import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HeaderHUD, formatISTTime } from '../src/components/HeaderHUD';
import { CursorProvider, useCursor } from '../src/context/CursorContext';
import { resumeData } from '../src/data/resumeData';

describe('HeaderHUD Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('formatISTTime helper', () => {
    it('formats a date to HH:mm:ss IST in Asia/Kolkata timezone', () => {
      // 2026-06-15T12:00:00Z is 17:30:00 in IST (UTC+5:30)
      const testDate = new Date('2026-06-15T12:00:00Z');
      const formatted = formatISTTime(testDate);
      expect(formatted).toBe('17:30:00 IST');
    });

    it('always produces HH:mm:ss IST pattern', () => {
      const formatted = formatISTTime(new Date());
      expect(formatted).toMatch(/^\d{2}:\d{2}:\d{2} IST$/);
    });
  });

  describe('Core Header and Telemetry', () => {
    it('renders the verified developer name from resumeData', () => {
      render(<HeaderHUD />);
      const nameElements = screen.getAllByText(resumeData.name);
      expect(nameElements.length).toBeGreaterThan(0);
      expect(nameElements[0]).toBeInTheDocument();
      expect(nameElements[0]).toHaveClass('font-display');
    });

    it('renders the status pulse dot with cadmium accent styling', () => {
      render(<HeaderHUD />);
      const pulseDot = document.querySelector('.bg-\\[\\#ff4d00\\], .bg-cadmium');
      expect(pulseDot).toBeInTheDocument();
    });

    it('renders Chennai IST clock and updates every second', () => {
      const baseDate = new Date('2026-06-15T12:00:00Z'); // 17:30:00 IST
      vi.setSystemTime(baseDate);

      render(<HeaderHUD />);

      const clock = screen.getByTestId('ist-clock');
      expect(clock.textContent).toBe('17:30:00 IST');

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(clock.textContent).toBe('17:30:01 IST');

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(clock.textContent).toBe('17:30:06 IST');
    });

    it('cleans up clock timer on unmount', () => {
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
      const { unmount } = render(<HeaderHUD />);
      unmount();
      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });

  describe('Navigation Links', () => {
    it('renders all required editorial navigation links with correct hrefs', () => {
      render(<HeaderHUD />);

      const requiredSections = [
        { label: 'Work', href: '#work' },
        { label: 'Experience', href: '#experience' },
        { label: 'Systems', href: '#systems' },
        { label: 'Contact', href: '#contact' },
      ];

      for (const { label, href } of requiredSections) {
        const links = screen.getAllByRole('link', { name: new RegExp(label, 'i') });
        expect(links.length).toBeGreaterThan(0);
        const matchingLink = links.find((l) => l.getAttribute('href') === href);
        expect(matchingLink).toBeDefined();
      }
    });

    it('smooth scrolls to target element when a nav link is clicked', () => {
      const targetDiv = document.createElement('div');
      targetDiv.id = 'work';
      const scrollIntoViewMock = vi.fn();
      targetDiv.scrollIntoView = scrollIntoViewMock;
      document.body.appendChild(targetDiv);

      render(<HeaderHUD />);

      const workLinks = screen.getAllByRole('link', { name: /Work/i });
      fireEvent.click(workLinks[0]);

      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(targetDiv);
    });

    it('renders the [J/K] section keyboard navigation shortcut hint', () => {
      render(<HeaderHUD />);
      expect(screen.getByText(/\[J\/K\]/i)).toBeInTheDocument();
    });
  });

  describe('Resume Trigger Actions', () => {
    it('calls onOpenResume when Resume button is clicked', () => {
      const onOpenResume = vi.fn();
      render(<HeaderHUD onOpenResume={onOpenResume} />);

      const resumeButton = screen.getByRole('button', { name: /Resume/i });
      fireEvent.click(resumeButton);

      expect(onOpenResume).toHaveBeenCalledTimes(1);
    });

    it('supports onResumeOpen alias prop when clicked', () => {
      const onResumeOpen = vi.fn();
      render(<HeaderHUD onResumeOpen={onResumeOpen} />);

      const resumeButton = screen.getByRole('button', { name: /Resume/i });
      fireEvent.click(resumeButton);

      expect(onResumeOpen).toHaveBeenCalledTimes(1);
    });

    it('calls onOpenResume when [R] key is pressed via useKeyboardNav', () => {
      const onOpenResume = vi.fn();
      render(<HeaderHUD onOpenResume={onOpenResume} />);

      fireEvent.keyDown(window, { key: 'r' });
      expect(onOpenResume).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(window, { key: 'R' });
      expect(onOpenResume).toHaveBeenCalledTimes(2);
    });

    it('does not trigger onOpenResume when typing inside an input element', () => {
      const onOpenResume = vi.fn();
      render(
        <div>
          <HeaderHUD onOpenResume={onOpenResume} />
          <input data-testid="test-input" />
        </div>
      );

      const input = screen.getByTestId('test-input');
      input.focus();

      fireEvent.keyDown(input, { key: 'r' });
      expect(onOpenResume).not.toHaveBeenCalled();
    });
  });

  describe('Cursor Hover Integration', () => {
    function CursorInspector() {
      const { cursorState } = useCursor();
      return <div data-testid="cursor-state">{cursorState}</div>;
    }

    it('updates cursor state to hover on nav link and button mouse enter and resets on mouse leave', () => {
      render(
        <CursorProvider>
          <CursorInspector />
          <HeaderHUD />
        </CursorProvider>
      );

      const stateDisplay = screen.getByTestId('cursor-state');
      expect(stateDisplay.textContent).toBe('default');

      const workLinks = screen.getAllByRole('link', { name: /Work/i });
      fireEvent.mouseEnter(workLinks[0]);
      expect(stateDisplay.textContent).toBe('hover');

      fireEvent.mouseLeave(workLinks[0]);
      expect(stateDisplay.textContent).toBe('default');

      const resumeButton = screen.getByRole('button', { name: /Resume/i });
      fireEvent.mouseEnter(resumeButton);
      expect(stateDisplay.textContent).toBe('hover');

      fireEvent.mouseLeave(resumeButton);
      expect(stateDisplay.textContent).toBe('default');
    });

    it('safely renders without throwing when outside CursorProvider', () => {
      expect(() => {
        render(<HeaderHUD />);
      }).not.toThrow();
    });
  });

  describe('Mobile Responsiveness & Mobile Drawer Menu', () => {
    it('renders a mobile menu toggle button with aria controls', () => {
      render(<HeaderHUD />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).not.toHaveAttribute('aria-controls');
    });

    it('opens and closes the mobile menu drawer upon clicking toggle button', () => {
      render(<HeaderHUD />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).not.toHaveAttribute('aria-controls');

      // Click to open
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-nav-drawer');
      expect(screen.getByTestId('mobile-menu-drawer')).toBeInTheDocument();

      // Click to close
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).not.toHaveAttribute('aria-controls');
      expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
    });

    it('closes mobile menu when clicking a mobile navigation link', () => {
      render(<HeaderHUD />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(toggleButton);

      const mobileDrawer = screen.getByTestId('mobile-menu-drawer');
      const mobileWorkLink = withinElement(mobileDrawer, /Work/i);
      expect(mobileWorkLink).toBeDefined();

      fireEvent.click(mobileWorkLink!);

      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
    });

    it('closes mobile menu and invokes resume handler when clicking mobile resume button', () => {
      const onOpenResume = vi.fn();
      render(<HeaderHUD onOpenResume={onOpenResume} />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(toggleButton);

      const mobileDrawer = screen.getByTestId('mobile-menu-drawer');
      const mobileResumeBtn = withinElement(mobileDrawer, /Resume/i);
      expect(mobileResumeBtn).toBeDefined();

      fireEvent.click(mobileResumeBtn!);

      expect(onOpenResume).toHaveBeenCalledTimes(1);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes mobile menu when pressing Escape key', () => {
      render(<HeaderHUD />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(toggleButton);
      expect(screen.getByTestId('mobile-menu-drawer')).toBeInTheDocument();

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
    });
  });
});

function withinElement(container: HTMLElement, pattern: RegExp): HTMLElement | undefined {
  const elements = container.querySelectorAll('a, button');
  for (const el of Array.from(elements)) {
    if (pattern.test(el.textContent || '')) {
      return el as HTMLElement;
    }
  }
  return undefined;
}
