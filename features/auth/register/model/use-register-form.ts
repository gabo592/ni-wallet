import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { register } from './actions';
import { toast } from 'sonner';
import { useSidebar } from '@/shared/ui/sidebar';

const formSchema = z.object({
  firstName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  lastName: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrónico es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormSchema = z.infer<typeof formSchema>;

export const useRegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const { setOpen } = useSidebar();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: FormSchema) {
    const formData = new FormData();

    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);

    startTransition(async () => {
      toast.info('Se le enviará un correo electrónico de confirmación.');
      const result = await register(formData);

      if (!result.isSuccess) {
        toast.error('Error al registrarse', {
          description: result.error,
        });
      }
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
