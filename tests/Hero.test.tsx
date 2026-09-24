import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '../src/components/Hero';
import { CursorProvider, useCursor } from '../src/context/CursorContext';
import { resumeData } from '../src/data/resumeData';

describe('Hero Component ("The Editorial Monolith")', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Headline & Editorial Typography', () => {
    it('renders the verified headline name from resumeData with display typography and allows text selection', () => {
      render(<Hero />);
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toBeInTheDocument();
      expect(headline).toHaveTextContent(resumeData.name);
      expect(screen.getByText(resumeData.name)).toBeInTheDocument();
      // Ensure select-none is not present so visitors can copy the name
      expect(headline.className).not.toMatch(/select-none/);
    });

    it('renders the verified role "SOFTWARE ENGINEER / SYSTEMS & APPLIED AI"', () => {
      render(<Hero />);
      expect(screen.getByText(/SOFTWARE ENGINEER \/ SYSTEMS & APPLIED AI/i)).toBeInTheDocument();
    });

    it('renders the editorial monolith statement regarding backend architectures and autonomous agents', () => {
      render(<Hero />);
      const statement = screen.getByText(
        /Building high-throughput backend architectures, autonomous AI agents, and enterprise full-stack systems with relentless attention to software architecture\./i
      );
      expect(statement).toBeInTheDocument();
    });

    it('uses a semantic section element with id="hero"', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section#hero');
      expect(section).toBeInTheDocument();
    });

    it('renders asymmetric 12-column editorial grid structure', () => {
      const { container } = render(<Hero />);
      const grid = container.querySelector('.lg\\:grid-cols-12');
      expect(grid).toBeInTheDocument();

      const leftCol = container.querySelector('.lg\\:col-span-7');
      const rightCol = container.querySelector('.lg\\:col-span-5');
      expect(leftCol).toBeInTheDocument();
      expect(rightCol).toBeInTheDocument();
    });
  });

  describe('Portrait Integration & Framing', () => {
    it('renders the studio portrait image with proper src, alt text, and explicit dimensions', () => {
      render(<Hero />);
      const img = screen.getByRole('img', { name: /K V Santhosh/i });
      expect(img).toBeInTheDocument();
      expect(img.getAttribute('src')).toMatch(/Santhosh_Portrait\.jpg$/);
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).toMatch(/K V Santhosh/i);
      expect(img).toHaveAttribute('width', '600');
      expect(img).toHaveAttribute('height', '750');
    });

    it('renders portrait inside an editorial frame with hairline border', () => {
      const { container } = render(<Hero />);
      const portraitContainer = container.querySelector('[data-testid="hero-portrait-container"]');
      expect(portraitContainer).toBeInTheDocument();
      expect(portraitContainer?.className).toMatch(/border/);
    });

    it('renders context telemetry badge for SRM University AP and CGPA 9.29', () => {
      render(<Hero />);
      const badge = screen.getByTestId('hero-badge-education');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent(/SRM UNIVERSITY AP • CGPA 9.29/i);
    });

    it('renders context telemetry badge for BNY SDE Intern', () => {
      render(<Hero />);
      const badge = screen.getByTestId('hero-badge-experience');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent(/BNY SDE INTERN/i);
    });
  });

  describe('Action CTAs & Anchor Links', () => {
    it('renders "Explore Selected Work ↓" anchor link pointing to #work', () => {
      render(<Hero />);
      const workLink = screen.getByRole('link', { name: /Explore Selected Work/i });
      expect(workLink).toBeInTheDocument();
      expect(workLink).toHaveAttribute('href', '#work');
    });

    it('smoothly scrolls to #work section when "Explore Selected Work" is clicked', () => {
      const scrollIntoViewMock = vi.fn();
      const targetDiv = document.createElement('div');
      targetDiv.id = 'work';
      targetDiv.scrollIntoView = scrollIntoViewMock;
      document.body.appendChild(targetDiv);

      render(<Hero />);
      const workLink = screen.getByRole('link', { name: /Explore Selected Work/i });
      fireEvent.click(workLink);

      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(targetDiv);
    });

    it('falls back gracefully to location hash when target section does not exist in DOM', () => {
      render(<Hero />);
      const workLink = screen.getByRole('link', { name: /Explore Selected Work/i });

      // Ensure no #work element in DOM
      const existing = document.getElementById('work');
      if (existing) document.body.removeChild(existing);

      expect(() => {
        fireEvent.click(workLink);
      }).not.toThrow();
    });

    it('renders "View Credentials" button and invokes onOpenResume when clicked', () => {
      const onOpenResume = vi.fn();
      render(<Hero onOpenResume={onOpenResume} />);

      const credentialsButton = screen.getByRole('button', { name: /View Credentials/i });
      expect(credentialsButton).toBeInTheDocument();

      // Check aria-hidden on icon
      const icon = credentialsButton.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');

      fireEvent.click(credentialsButton);
      expect(onOpenResume).toHaveBeenCalledTimes(1);
    });

    it('supports onResumeOpen alias prop when clicked', () => {
      const onResumeOpen = vi.fn();
      render(<Hero onResumeOpen={onResumeOpen} />);

      const credentialsButton = screen.getByRole('button', { name: /View Credentials/i });
      fireEvent.click(credentialsButton);

      expect(onResumeOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard Navigation', () => {
    it('defaults enableKeyboardNav to false to avoid duplicate listeners alongside HeaderHUD', () => {
      const onOpenResume = vi.fn();
      render(<Hero onOpenResume={onOpenResume} />);

      fireEvent.keyDown(window, { key: 'r' });
      expect(onOpenResume).not.toHaveBeenCalled();
    });

    it('invokes onOpenResume when [R] key is pressed and enableKeyboardNav is true', () => {
      const onOpenResume = vi.fn();
      render(<Hero onOpenResume={onOpenResume} enableKeyboardNav={true} />);

      fireEvent.keyDown(window, { key: 'r' });
      expect(onOpenResume).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(window, { key: 'R' });
      expect(onOpenResume).toHaveBeenCalledTimes(2);
    });

    it('does not trigger onOpenResume when typing inside an input element even if enableKeyboardNav is true', () => {
      const onOpenResume = vi.fn();
      render(
        <div>
          <Hero onOpenResume={onOpenResume} enableKeyboardNav={true} />
          <input data-testid="input-box" />
        </div>
      );

      const input = screen.getByTestId('input-box');
      input.focus();

      fireEvent.keyDown(input, { key: 'r' });
      expect(onOpenResume).not.toHaveBeenCalled();
    });

    it('does not trigger onOpenResume when enableKeyboardNav is explicitly false', () => {
      const onOpenResume = vi.fn();
      render(<Hero onOpenResume={onOpenResume} enableKeyboardNav={false} />);

      fireEvent.keyDown(window, { key: 'r' });
      expect(onOpenResume).not.toHaveBeenCalled();
    });
  });

  describe('Cursor Integration', () => {
    function CursorInspector() {
      const { cursorState, cursorText } = useCursor();
      return (
        <div>
          <span data-testid="cursor-state">{cursorState}</span>
          <span data-testid="cursor-text">{cursorText}</span>
        </div>
      );
    }

    it('updates cursor state on CTA mouse enter and resets on mouse leave', () => {
      render(
        <CursorProvider>
          <CursorInspector />
          <Hero />
        </CursorProvider>
      );

      const stateDisplay = screen.getByTestId('cursor-state');
      expect(stateDisplay.textContent).toBe('default');

      const workLink = screen.getByRole('link', { name: /Explore Selected Work/i });
      fireEvent.mouseEnter(workLink);
      expect(stateDisplay.textContent).toBe('hover');

      fireEvent.mouseLeave(workLink);
      expect(stateDisplay.textContent).toBe('default');

      const credentialsButton = screen.getByRole('button', { name: /View Credentials/i });
      fireEvent.mouseEnter(credentialsButton);
      expect(stateDisplay.textContent).toBe('hover');

      fireEvent.mouseLeave(credentialsButton);
      expect(stateDisplay.textContent).toBe('default');
    });

    it('updates cursor state to "inspect" with text "PORTRAIT" on portrait container mouse enter and resets on leave', () => {
      render(
        <CursorProvider>
          <CursorInspector />
          <Hero />
        </CursorProvider>
      );

      const portraitContainer = screen.getByTestId('hero-portrait-container');
      fireEvent.mouseEnter(portraitContainer);

      const stateDisplay = screen.getByTestId('cursor-state');
      const textDisplay = screen.getByTestId('cursor-text');
      expect(stateDisplay.textContent).toBe('inspect');
      expect(textDisplay.textContent).toBe('PORTRAIT');

      fireEvent.mouseLeave(portraitContainer);
      expect(stateDisplay.textContent).toBe('default');
      expect(textDisplay.textContent).toBe('');
    });

    it('safely renders without throwing when outside CursorProvider', () => {
      expect(() => {
        render(<Hero />);
      }).not.toThrow();
    });
  });

  describe('Parallax Tilt & Reduced Motion Safety', () => {
    it('handles mousemove on portrait container to compute tilt parallax without errors', () => {
      render(<Hero />);
      const portraitContainer = screen.getByTestId('hero-portrait-container');

      // Mock getBoundingClientRect
      vi.spyOn(portraitContainer, 'getBoundingClientRect').mockReturnValue({
        left: 100,
        top: 100,
        width: 400,
        height: 500,
        right: 500,
        bottom: 600,
        x: 100,
        y: 100,
        toJSON: () => {},
      });

      expect(() => {
        fireEvent.mouseMove(portraitContainer, { clientX: 300, clientY: 350 });
      }).not.toThrow();

      expect(() => {
        fireEvent.mouseLeave(portraitContainer);
      }).not.toThrow();
    });

    it('respects prefers-reduced-motion without throwing errors', () => {
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

      expect(() => {
        render(<Hero />);
      }).not.toThrow();

      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toBeInTheDocument();
    });

    it('handles touch devices without errors', () => {
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

      expect(() => {
        render(<Hero />);
      }).not.toThrow();
    });
  });
});
