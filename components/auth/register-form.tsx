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
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { signup } from '@/app/auth/actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  image: z.any(),
  firstName: z.string().min(1, { message: 'El primer nombre es requerido.' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido.' }),
  email: z
    .string()
    .email({ message: 'Por favor, ingresa un correo electrónico válido.' }),
  password: z.string().min(6, {
    message: 'Por favor, ingresa una contraseña con al menos 6 caracteres.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  async function onSubmit(values: FormSchema) {
    if (!image) {
      toast.warning('Por favor, ingresa una imagen de perfil.');
      return;
    }

    setTimeout(() => {
      toast.info('Le enviaremos un correo de confirmación.');
    }, 3000);

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);

    await signup(formData);

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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormDescription>
                Por favor, ingresa una imagen de perfil.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>
                Su primer nombre es necesario para identificarlo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Apellido" {...field} />
              </FormControl>
              <FormDescription>
                Su apellido es necesario para identificarlo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                Ingrese el correo electrónico con el que creará su cuenta.
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
                Ingrese una contraseña con al menos 6 caracteres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
