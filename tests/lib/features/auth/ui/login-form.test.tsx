import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, afterEach } from 'vitest';

import { LoginForm } from '@/lib/features/auth/ui/login-form';

describe('LoginForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(
      screen.getByRole('button', { name: /iniciar sesi[oó]n/i }),
    );

    expect(
      await screen.findByText('Ingrese una dirección de correo válida.'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'La contraseña debe tener al menos 8 caracteres.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Introduce tu correo electrónico'),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.getByPlaceholderText('Introduce tu contraseña'),
    ).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits valid credentials and renders the register link', async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText('Introduce tu correo electrónico'),
      'persona@ejemplo.com',
    );
    await user.type(
      screen.getByPlaceholderText('Introduce tu contraseña'),
      '12345678',
    );
    await user.click(
      screen.getByRole('button', { name: /iniciar sesi[oó]n/i }),
    );

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Datos del formulario:', {
        email: 'persona@ejemplo.com',
        password: '12345678',
      });
    });

    expect(
      screen.getByRole('link', {
        name: '¿No tienes una cuenta? Regístrate',
      }),
    ).toHaveAttribute('href', '/auth/register');
  });
});
