import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders the default button variant', () => {
    render(<Button>Continuar</Button>);

    const button = screen.getByRole('button', { name: 'Continuar' });

    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveClass('bg-primary');
  });

  it('renders children through asChild', () => {
    render(
      <Button asChild variant="link">
        <a href="/auth/register">Crear cuenta</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Crear cuenta' });

    expect(link).toHaveAttribute('data-variant', 'link');
    expect(link).toHaveClass('text-primary');
  });
});
