import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../src/App';

describe('Full Application Integration', () => {
  it('renders all core sections: HUD, Hero, Work, Experience, Systems, and Footer', () => {
    render(<App />);

    expect(screen.getByTestId('header-hud')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('selected-work-section')).toBeInTheDocument();
    expect(screen.getByTestId('experience-section')).toBeInTheDocument();
    expect(screen.getByTestId('technical-matrix-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer-section')).toBeInTheDocument();
  });

  it('toggles resume drawer via HUD button', () => {
    render(<App />);

    expect(screen.queryByTestId('resume-drawer')).not.toBeInTheDocument();

    const resumeBtn = screen.getByRole('button', { name: /Open Resume \[R\]/i });
    fireEvent.click(resumeBtn);

    expect(screen.getByTestId('resume-drawer')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/Close resume drawer/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('resume-drawer')).not.toBeInTheDocument();
  });

  it('toggles resume drawer via keyboard shortcut [R]', () => {
    render(<App />);

    expect(screen.queryByTestId('resume-drawer')).not.toBeInTheDocument();

    // Press 'r'
    fireEvent.keyDown(window, { key: 'r' });
    expect(screen.getByTestId('resume-drawer')).toBeInTheDocument();

    // Press 'Escape'
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('resume-drawer')).not.toBeInTheDocument();
  });
});
