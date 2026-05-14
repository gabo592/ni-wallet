import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the header with ModeToggle', () => {
    render(<HomePage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('renders the main section', () => {
    render(<HomePage />);

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
