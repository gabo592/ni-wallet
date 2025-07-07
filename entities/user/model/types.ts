import { type Database } from '@/shared/api/database';

type Table = Database['public']['Tables']['users'];

export type User = Table['Row'];
export type UserInsert = Table['Insert'];
export type UserUpdate = Table['Update'];
