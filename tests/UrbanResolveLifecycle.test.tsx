import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UrbanResolveLifecycle, LIFECYCLE_STATES } from '../src/components/widgets/UrbanResolveLifecycle';
import { CursorProvider } from '../src/context/CursorContext';

describe('UrbanResolveLifecycle Widget', () => {
  it('renders all 6 lifecycle states in the stepper', () => {
    render(
      <CursorProvider>
        <UrbanResolveLifecycle />
      </CursorProvider>
    );

    expect(screen.getByTestId('urbanresolve-lifecycle')).toBeInTheDocument();
    expect(screen.getByText(/UrbanResolve Civic Ticket State Machine/i)).toBeInTheDocument();

    LIFECYCLE_STATES.forEach((state) => {
      expect(screen.getByText(state.shortName)).toBeInTheDocument();
    });
  });

  it('allows clicking different states to inspect payload details', () => {
    render(
      <CursorProvider>
        <UrbanResolveLifecycle />
      </CursorProvider>
    );

    // Click Resolved state
    const resolvedBtn = screen.getByText('Resolved');
    fireEvent.click(resolvedBtn);

    expect(screen.getByText(/Resolution Proof Upload & Ticket Closure/i)).toBeInTheDocument();
    expect(screen.getByText(/Proof-of-Resolution Record/i)).toBeInTheDocument();
    expect(screen.getByText(/GPS Geofence Match/i)).toBeInTheDocument();
  });

  it('steps forward and backward through states using navigation buttons', () => {
    render(
      <CursorProvider>
        <UrbanResolveLifecycle />
      </CursorProvider>
    );

    const advanceBtn = screen.getByRole('button', { name: /Advance State/i });
    fireEvent.click(advanceBtn);

    expect(screen.getByText(/Department Routing & SLA Dispatch/i)).toBeInTheDocument();

    const priorBtn = screen.getByRole('button', { name: /Prior State/i });
    fireEvent.click(priorBtn);

    expect(screen.getByText(/Google Cloud Vision AI Automated Triage/i)).toBeInTheDocument();
  });

  it('toggles SLA breach simulation and reflects critical status', () => {
    render(
      <CursorProvider>
        <UrbanResolveLifecycle />
      </CursorProvider>
    );

    const slaCheckbox = screen.getByRole('checkbox');
    fireEvent.click(slaCheckbox);
    expect(slaCheckbox).toBeChecked();

    // Move to SLA Monitor state
    fireEvent.click(screen.getByText('SLA Monitor'));
    expect(screen.getByText(/SLA CRITICAL • ESCALATED TO COMMISSIONER/i)).toBeInTheDocument();
  });
});
