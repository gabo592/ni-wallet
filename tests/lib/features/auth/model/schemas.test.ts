import { describe, expect, it } from 'vitest';

import { loginFormSchema } from '@/lib/features/auth/model/schemas';

describe('loginFormSchema', () => {
  it('accepts a valid login payload', () => {
    const result = loginFormSchema.safeParse({
      email: 'persona@ejemplo.com',
      password: '12345678',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid email and short passwords', () => {
    const result = loginFormSchema.safeParse({
      email: 'correo-invalido',
      password: '1234',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain(
        'Ingrese una dirección de correo válida.',
      );
      expect(result.error.flatten().fieldErrors.password).toContain(
        'La contraseña debe tener al menos 8 caracteres.',
      );
    }
  });
});
