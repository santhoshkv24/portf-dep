import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechnicalMatrix } from '../src/components/TechnicalMatrix';
import { resumeData } from '../src/data/resumeData';
import { CursorProvider } from '../src/context/CursorContext';

describe('TechnicalMatrix Section', () => {
  it('renders section header, all skill categories, and technologies', () => {
    render(
      <CursorProvider>
        <TechnicalMatrix />
      </CursorProvider>
    );

    expect(screen.getByTestId('technical-matrix-section')).toBeInTheDocument();
    expect(screen.getByText(/ENGINEERING MATRIX/i)).toBeInTheDocument();

    resumeData.skills.forEach((group, idx) => {
      expect(screen.getByTestId(`skill-group-${idx}`)).toBeInTheDocument();
      expect(screen.getByText(group.category)).toBeInTheDocument();
    });
  });

  it('renders all 3 official certifications', () => {
    render(
      <CursorProvider>
        <TechnicalMatrix />
      </CursorProvider>
    );

    resumeData.certifications.forEach((cert, idx) => {
      expect(screen.getByTestId(`cert-item-${idx}`)).toBeInTheDocument();
      expect(screen.getByText(cert.title)).toBeInTheDocument();
    });
  });

  it('renders academic qualifications and CGPA 9.29/10', () => {
    render(
      <CursorProvider>
        <TechnicalMatrix />
      </CursorProvider>
    );

    expect(screen.getByText(/SRM University AP/i)).toBeInTheDocument();
    expect(screen.getByText(/CGPA: 9.29\/10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Kendriya Vidyalaya HVF/i)).toHaveLength(2);
  });
});
