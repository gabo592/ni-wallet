import * as z from 'zod';

const loginFormSchema = z.object({
  email: z.email({ error: 'Ingrese una dirección de correo válida.' }),
  password: z
    .string()
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres.' }),
});

export { loginFormSchema };
