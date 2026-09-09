import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectedWork } from '../src/components/SelectedWork';
import { projectsData } from '../src/data/projectsData';
import { CursorProvider } from '../src/context/CursorContext';

describe('SelectedWork Section', () => {
  it('renders section header and all 4 marquee projects in correct sequence', () => {
    render(
      <CursorProvider>
        <SelectedWork />
      </CursorProvider>
    );

    expect(screen.getByTestId('selected-work-section')).toBeInTheDocument();
    expect(screen.getByText(/FLAGSHIP ENGINEERING/i)).toBeInTheDocument();

    // Verify all 4 projects rendered
    projectsData.forEach((project) => {
      expect(screen.getByTestId(`project-${project.id}`)).toBeInTheDocument();
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });

    // Check first project is BNY
    expect(projectsData[0].id).toBe('bny-eliza');
    expect(screen.getByTestId('project-bny-eliza')).toHaveTextContent('01');
  });

  it('renders interactive simulators inside each project container', () => {
    render(
      <CursorProvider>
        <SelectedWork />
      </CursorProvider>
    );

    expect(screen.getByTestId('bny-simulator')).toBeInTheDocument();
    expect(screen.getByTestId('urbanresolve-lifecycle')).toBeInTheDocument();
    expect(screen.getByTestId('hirematrix-kanban')).toBeInTheDocument();
    expect(screen.getByTestId('organica-rbac-matrix')).toBeInTheDocument();
  });

  it('renders problem, architecture, and engineering contributions for case studies', () => {
    render(
      <CursorProvider>
        <SelectedWork />
      </CursorProvider>
    );

    expect(screen.getAllByText(/The Architectural Problem/i)).toHaveLength(4);
    expect(screen.getAllByText(/Technical Innovation/i)).toHaveLength(4);
    expect(screen.getAllByText(/Core Engineering Contributions/i)).toHaveLength(4);
  });
});
