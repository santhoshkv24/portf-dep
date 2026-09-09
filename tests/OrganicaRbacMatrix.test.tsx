import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrganicaRbacMatrix, RBAC_ROLES } from '../src/components/widgets/OrganicaRbacMatrix';
import { CursorProvider } from '../src/context/CursorContext';

describe('OrganicaRbacMatrix Widget', () => {
  it('renders all 5 roles in the switcher tabs', () => {
    render(
      <CursorProvider>
        <OrganicaRbacMatrix />
      </CursorProvider>
    );

    expect(screen.getByTestId('organica-rbac-matrix')).toBeInTheDocument();
    expect(screen.getByText(/5-Role RBAC Authorization & Security Architecture/i)).toBeInTheDocument();

    RBAC_ROLES.forEach((role) => {
      expect(screen.getByText(role.roleName)).toBeInTheDocument();
    });
  });

  it('updates route guard level and permissions when switching to Customer role', () => {
    render(
      <CursorProvider>
        <OrganicaRbacMatrix />
      </CursorProvider>
    );

    const customerBtn = screen.getByText('Enterprise Client / Customer');
    fireEvent.click(customerBtn);

    expect(screen.getByText(/RBAC LEVEL 1 • ISOLATED CLIENT SCOPE/i)).toBeInTheDocument();
    expect(screen.getByText(/ALLOW \/api\/client\/portal\/\* STRICT TENANT FILTER/i)).toBeInTheDocument();
  });

  it('switches between Permission Matrix and Security Headers tabs', () => {
    render(
      <CursorProvider>
        <OrganicaRbacMatrix />
      </CursorProvider>
    );

    const securityTab = screen.getByRole('button', { name: /Security Headers/i });
    fireEvent.click(securityTab);

    expect(screen.getByText(/Helmet.js Security Headers/i)).toBeInTheDocument();
    expect(screen.getByText(/Bcrypt Password Hashing/i)).toBeInTheDocument();

    const matrixTab = screen.getByRole('button', { name: /Permission Matrix/i });
    fireEvent.click(matrixTab);

    expect(screen.getByText(/Dual-Track Task Engine/i)).toBeInTheDocument();
  });
});
