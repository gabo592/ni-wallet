import { useForm } from 'react-hook-form';
import { LoginFormSchema } from '../model/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '../model/schemas';
import { useTransition } from 'react';

export function useLoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: LoginFormSchema) {
    startTransition(async () => {
      console.log('Datos del formulario:', data);
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
}
