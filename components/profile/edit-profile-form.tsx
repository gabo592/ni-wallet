'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, useState } from 'react';
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
import { User } from '@/types/user';
import { Loader2 } from 'lucide-react';
import { updateUser } from '@/app/auth/actions';

const formSchema = z.object({
  image: z.any(),
  id: z.string().uuid(),
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.'),
});

interface EditProfileFormProps {
  user: User;
}

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setImage(files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { first_name, last_name } = values;

    const formData = new FormData();

    formData.append('id', user.id);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);

    if (image) {
      formData.append('image', image);
    }

    setIsLoading(true);
    await updateUser(formData);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de Perfil</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormDescription>
                Puede escoger una foto de perfil o un avatar, la decisión es suya.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Con su Primer Nombre podremos dirigirnos a usted de manera más personalizada.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                El Primer Apellido es importante para identificarlo en la plataforma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Guardar
        </Button>
      </form>
    </Form>
  );
};
