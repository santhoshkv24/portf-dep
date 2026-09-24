import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResumeDrawer } from '../src/components/ResumeDrawer';
import { CursorProvider } from '../src/context/CursorContext';

describe('ResumeDrawer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <CursorProvider>
        <ResumeDrawer isOpen={false} onClose={vi.fn()} />
      </CursorProvider>
    );

    expect(screen.queryByTestId('resume-drawer')).not.toBeInTheDocument();
  });

  it('renders full resume content when isOpen is true', () => {
    render(
      <CursorProvider>
        <ResumeDrawer isOpen={true} onClose={vi.fn()} />
      </CursorProvider>
    );

    expect(screen.getByTestId('resume-drawer')).toBeInTheDocument();
    expect(screen.getByText('K V SANTHOSH')).toBeInTheDocument();
    expect(screen.getByText(/Bank of New York Mellon/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SRM University AP/i).length).toBeGreaterThanOrEqual(1);
  });

  it('calls onClose when close button or backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(
      <CursorProvider>
        <ResumeDrawer isOpen={true} onClose={handleClose} />
      </CursorProvider>
    );

    const closeBtn = screen.getByLabelText(/Close resume drawer/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    const backdrop = screen.getByTestId('resume-drawer-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('renders single download link pointing to /resume.pdf', () => {
    render(
      <CursorProvider>
        <ResumeDrawer isOpen={true} onClose={vi.fn()} />
      </CursorProvider>
    );

    const downloadLink = screen.getByRole('link', { name: /Download resume PDF/i });
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute('href', '/resume.pdf');
    expect(downloadLink).toHaveAttribute('download', 'K_V_Santhosh_Resume.pdf');
  });

  it('closes on Escape keypress', () => {
    const handleClose = vi.fn();
    render(
      <CursorProvider>
        <ResumeDrawer isOpen={true} onClose={handleClose} />
      </CursorProvider>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
