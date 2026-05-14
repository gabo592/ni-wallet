'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useLoginForm } from '../hooks/use-login-form';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LoginForm() {
  const { form, onSubmit, isPending } = useLoginForm();

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-sm"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Correo electrónico</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Introduce tu correo electrónico"
                type="email"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Contraseña</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Introduce tu contraseña"
                type="password"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={isPending} form="login-form">
            Iniciar sesión
          </Button>
          <Button asChild variant="link">
            <Link href="/auth/register">¿No tienes una cuenta? Regístrate</Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
