'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { useLoginForm } from '../model/use-login-form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export const LoginForm = () => {
  const { form, isPending, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="Correo electrónico"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Introduce el correo electrónico que utilizó al registrarte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Introduce la contraseña que utilizó al registrarte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="grid gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Iniciar sesión
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/register">Registrarse</Link>
          </Button>
        </section>
      </form>
    </Form>
  );
};
