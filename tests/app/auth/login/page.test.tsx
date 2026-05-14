import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import LoginPage from '@/app/auth/login/page';

describe('LoginPage', () => {
  it('renders the header with ModeToggle', () => {
    render(<LoginPage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('renders the logo and LoginForm', () => {
    render(<LoginPage />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
