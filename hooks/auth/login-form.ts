import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.email("Ingrese una dirección de correo válida"),
  password: z
    .string()
    .min(6, "La contraseña debe de tener al menos 6 caracteres."),
});

type FormSchema = z.infer<typeof formSchema>;

export const useLoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function submit(values: FormSchema) {
    startTransition(() => {
      console.log(values);
    });
  }

  return {
    isPending,
    submit,
    form,
  };
};
