import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
