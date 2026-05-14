import * as z from 'zod';
import { loginFormSchema } from './schemas';

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export { type LoginFormSchema };
