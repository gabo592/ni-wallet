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
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { updatePassword } from '@/app/auth/actions';

const formSchema = z.object({
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    await updatePassword(password);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid items-start gap-4 w-full max-w-md"
      >
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>Establece una nueva contraseña segura.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>Digite nuevamente la contraseña.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Confirmar
        </Button>
        <Button asChild variant={'outline'}>
          <Link href={'/'}>Cancelar</Link>
        </Button>
      </form>
    </Form>
  );
};
