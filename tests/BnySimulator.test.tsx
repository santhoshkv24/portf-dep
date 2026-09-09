import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BnySimulator, BNY_PRESETS } from '../src/components/widgets/BnySimulator';
import { CursorProvider } from '../src/context/CursorContext';

describe('BnySimulator Widget', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders simulator header, title, and initial preset prompt', () => {
    render(
      <CursorProvider>
        <BnySimulator />
      </CursorProvider>
    );

    expect(screen.getByTestId('bny-simulator')).toBeInTheDocument();
    expect(screen.getByText(/Conversational Agent & GraphQL Synthesis Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/APAC & EMEA Liquidity vs Risk/i)).toBeInTheDocument();
  });

  it('renders all 3 sample preset prompt chips', () => {
    render(
      <CursorProvider>
        <BnySimulator />
      </CursorProvider>
    );

    BNY_PRESETS.forEach((preset) => {
      expect(screen.getByText(preset.label)).toBeInTheDocument();
    });
  });

  it('switches active preset when clicking preset chip and re-runs execution', () => {
    render(
      <CursorProvider>
        <BnySimulator />
      </CursorProvider>
    );

    const secondPresetBtn = screen.getByText(BNY_PRESETS[1].label);
    fireEvent.click(secondPresetBtn);

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(BNY_PRESETS[1].dashboard.title)).toBeInTheDocument();
  });

  it('switches between Visual Dashboard, Generated GraphQL, and Telemetry tabs', () => {
    render(
      <CursorProvider>
        <BnySimulator />
      </CursorProvider>
    );

    // Click Generated GraphQL tab
    const graphqlTab = screen.getByText(/Generated GraphQL/i);
    fireEvent.click(graphqlTab);
    expect(screen.getByText(/Schema Target: Eliza Core Federation Gateway/i)).toBeInTheDocument();
    expect(screen.getByText(/query GetCrossRegionalTelemetry/i)).toBeInTheDocument();

    // Click Telemetry & Datasets tab
    const telemetryTab = screen.getByText(/Telemetry & Datasets/i);
    fireEvent.click(telemetryTab);
    expect(screen.getByText(/APAC Liquidity Lake/i)).toBeInTheDocument();
  });

  it('allows entering and submitting custom plain English query', () => {
    render(
      <CursorProvider>
        <BnySimulator />
      </CursorProvider>
    );

    const input = screen.getByLabelText(/Enter plain English query/i);
    fireEvent.change(input, { target: { value: 'Analyze intraday liquidity buffer' } });
    expect(input).toHaveValue('Analyze intraday liquidity buffer');

    const executeBtn = screen.getByRole('button', { name: /Execute/i });
    fireEvent.click(executeBtn);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId('bny-simulator')).toBeInTheDocument();
  });
});
