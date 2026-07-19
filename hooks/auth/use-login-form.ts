import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTransition} from "react";

const formSchema = z.object({
  email: z.email({error: 'Digite una dirección de correo válida.'}),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export function useLoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
