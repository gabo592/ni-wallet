import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTransition} from "react";

const formSchema = z.object({
  displayName: z.string().min(3, {error: 'El nombre debe tener al menos 3 caracteres.'}),
  email: z.email({error: 'Digite una dirección de correo válida.'}),
  password: z.string().min(6, {error: 'La contraseña debe tener al menos 6 caracteres.'}),
});

type FormSchema = z.infer<typeof formSchema>;

export function useRegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: ''
    }
  });

  function onSubmit(data: FormSchema) {
    startTransition(() => {
      console.log(data);
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}
