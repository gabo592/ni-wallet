'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import Link from 'next/link';
import { useState } from 'react';
import { login } from '@/app/auth/actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Ingrese un correo electrónico válido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data;

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el correo electrónico con el que creó su cuenta de Ni Wallet.
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
                <Input type="password" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la contraseña asociada a su cuenta de Ni Wallet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className="flex flex-col w-full gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Iniciar Sesión
          </Button>
          <Button type="button" asChild variant={'outline'} disabled={isLoading}>
            <Link href={'/auth/register'}>Crear Cuenta</Link>
          </Button>
        </section>
      </form>
    </Form>
  );
};
