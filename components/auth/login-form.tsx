'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { login } from '@/app/auth/actions';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor, ingresa un correo electrónico válido.' }),
  password: z.string().min(6, {
    message: 'Por favor, ingresa una contraseña con al menos 6 caracteres.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormSchema) {
    setLoading(true);

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    await login(formData);

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-start gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese su correo electrónico"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingrese el correo electrónico que utilizó para crear su cuenta.
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
                <Input
                  placeholder="Ingrese su contraseña"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ingrese la contraseña que utilizó para crear su cuenta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="grid items-start gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="hover:cursor-pointer"
          >
            {loading && <Loader2 className="animate-spin" />}
            Iniciar Sesión
          </Button>
          <Button asChild variant={'outline'}>
            <Link href="/auth/register">Crear cuenta</Link>
          </Button>
        </section>
      </form>
    </Form>
  );
}
