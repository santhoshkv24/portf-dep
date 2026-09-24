import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from '../src/components/Footer';
import { resumeData } from '../src/data/resumeData';
import { CursorProvider } from '../src/context/CursorContext';

describe('Footer Component', () => {
  it('renders contact heading, email, location, and social links', () => {
    render(
      <CursorProvider>
        <Footer />
      </CursorProvider>
    );

    expect(screen.getByTestId('footer-section')).toBeInTheDocument();
    expect(screen.getByText(/LET'S BUILD/i)).toBeInTheDocument();
    expect(screen.getByText(resumeData.email)).toBeInTheDocument();
    expect(screen.getByText(/13.0827° N, 80.2707° E/i)).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('copies email to clipboard on button click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    render(
      <CursorProvider>
        <Footer />
      </CursorProvider>
    );

    const emailBtn = screen.getByLabelText(/Copy email address/i);
    fireEvent.click(emailBtn);

    expect(writeTextMock).toHaveBeenCalledWith(resumeData.email);
    expect(await screen.findByText(/Address copied to clipboard/i)).toBeInTheDocument();
  });

  it('scrolls to top when Back to Viewport Top button is clicked', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(
      <CursorProvider>
        <Footer />
      </CursorProvider>
    );

    const topBtn = screen.getByRole('button', { name: /Back to Viewport Top/i });
    fireEvent.click(topBtn);

    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollSpy.mockRestore();
  });
});
