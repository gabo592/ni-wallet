import { loginFormSchema } from './schemas';

import * as z from 'zod';

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
