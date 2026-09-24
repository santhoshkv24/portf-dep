import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from '../src/components/Experience';
import { resumeData } from '../src/data/resumeData';
import { CursorProvider } from '../src/context/CursorContext';

describe('Experience Section', () => {
  it('renders section header and all production roles', () => {
    render(
      <CursorProvider>
        <Experience />
      </CursorProvider>
    );

    expect(screen.getByTestId('experience-section')).toBeInTheDocument();
    expect(screen.getByText(/PRODUCTION EXPERIENCE/i)).toBeInTheDocument();

    resumeData.experience.forEach((exp, idx) => {
      expect(screen.getByTestId(`experience-item-${idx}`)).toBeInTheDocument();
      expect(screen.getByText(exp.role)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
    });
  });

  it('renders verified bullet points for BNY Mellon and C2C Advanced Systems', () => {
    render(
      <CursorProvider>
        <Experience />
      </CursorProvider>
    );

    expect(screen.getByText(/Eliza platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Organica Ops/i)).toBeInTheDocument();
    expect(screen.getByText(/5-role RBAC system/i)).toBeInTheDocument();
  });
});
