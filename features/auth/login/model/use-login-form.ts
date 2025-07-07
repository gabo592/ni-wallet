import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useTransition } from 'react';
import { login } from './actions';
import { useSidebar } from '@/shared/ui/sidebar';

const fromSchema = z.object({
  email: z.string().email('El correo electrónico es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormSchema = z.infer<typeof fromSchema>;

export const useLoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const { setOpen } = useSidebar();

  const form = useForm<FormSchema>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: FormSchema) {
    const formData = new FormData();

    formData.append('email', values.email);
    formData.append('password', values.password);

    startTransition(async () => {
      await login(formData);
    });
  }

  useEffect(() => {
    setOpen(false);
  }, []);

  return {
    form,
    onSubmit,
    isPending,
  };
};
