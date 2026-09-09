import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HireMatrixKanban, INITIAL_CANDIDATES, KANBAN_COLUMNS } from '../src/components/widgets/HireMatrixKanban';
import { CursorProvider } from '../src/context/CursorContext';

describe('HireMatrixKanban Widget', () => {
  it('renders all 5 Kanban stages and candidates', () => {
    render(
      <CursorProvider>
        <HireMatrixKanban />
      </CursorProvider>
    );

    expect(screen.getByTestId('hirematrix-kanban')).toBeInTheDocument();
    expect(screen.getByText(/HireMatrix Talent Pipeline & AI Scoring/i)).toBeInTheDocument();

    KANBAN_COLUMNS.forEach((col) => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });

    INITIAL_CANDIDATES.forEach((cand) => {
      expect(screen.getByText(cand.name)).toBeInTheDocument();
    });
  });

  it('switches to Gemini AI inspector when candidate card is clicked', () => {
    render(
      <CursorProvider>
        <HireMatrixKanban />
      </CursorProvider>
    );

    const candCard = screen.getByText('Vikram Menon');
    fireEvent.click(candCard);

    expect(screen.getByText(/AI VERIFIED CANDIDATE PROFILE/i)).toBeInTheDocument();
    expect(screen.getByText(/Gemini Match Index/i)).toBeInTheDocument();
    expect(screen.getByText(/System Design & Architecture/i)).toBeInTheDocument();
  });

  it('allows advancing a candidate to the next pipeline stage', () => {
    render(
      <CursorProvider>
        <HireMatrixKanban />
      </CursorProvider>
    );

    // Open inspector for Vikram Menon (initially screened)
    fireEvent.click(screen.getByText('Vikram Menon'));

    const advanceBtn = screen.getByRole('button', { name: /Advance Pipeline Stage/i });
    fireEvent.click(advanceBtn);

    // Should advance from 'screened' to 'interview'
    expect(screen.getByText(/Stage: interview/i)).toBeInTheDocument();
  });

  it('switches between Kanban Board and Gemini AI Inspector view tabs', () => {
    render(
      <CursorProvider>
        <HireMatrixKanban />
      </CursorProvider>
    );

    const inspectorTab = screen.getByRole('button', { name: /Gemini AI Inspector/i });
    fireEvent.click(inspectorTab);
    expect(screen.getByText(/Gemini Match Index/i)).toBeInTheDocument();

    const kanbanTab = screen.getByRole('button', { name: /Kanban Board/i });
    fireEvent.click(kanbanTab);
    expect(screen.getByText(/Applied/i)).toBeInTheDocument();
  });
});
