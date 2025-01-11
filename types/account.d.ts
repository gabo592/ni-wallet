import { type Currency } from './currency';
import { type Database } from './database';

type Table = Database['public']['Tables']['accounts'];

export type AccountEntity = Table['Row'];

export type Account = AccountEntity & {
  currency: Currency | null;
};

export type CreateAccountDto = Table['Insert'];

export type UpdateAccountDto = Table['Update'];
