'use client';

import { Account, AccountEntity } from '@/types/account';
import { Currency } from '@/types/currency';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
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
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { createAccount, updateAccount } from '@/app/accounts/actions';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  description: z.string().min(3, 'La descripción debe tener al menos 3 caracteres.'),
  currency_id: z.string().uuid('El ID de la moneda debe ser válido.'),
  balance: z.coerce.number().min(0, 'El saldo debe ser mayor o igual a 0.'),
});

interface AccountsFormProps {
  account?: Account;
  currencies: Currency[];
}

export const AccountsForm: FC<AccountsFormProps> = ({ account, currencies }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account?.name ?? '',
      description: account?.description ?? '',
      currency_id: account?.currency?.id ?? '',
      balance: account?.balance ?? 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { name, description, currency_id, balance } = data;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('currency_id', currency_id);
    formData.append('balance', balance.toString());

    setIsLoading(true);

    let result: AccountEntity | null = null;

    if (account) {
      formData.append('id', account.id);
      result = await updateAccount(formData);
    } else {
      result = await createAccount(formData);
    }

    if (result) {
      if (account) {
        toast.success('Cuenta actualizada con éxito.');
      } else {
        toast.success('Cuenta creada con éxito.');
        form.reset();
      }
    } else {
      toast.error('Error al crear la cuenta.');
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-start gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                El nombre de la cuenta es importante para identificarla en la plataforma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                La descripción de la cuenta ayuda a comprender mejor su propósito.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                El balance de la cuenta indica la cantidad de dinero que tiene la cuenta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moneda</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una moneda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.code} - {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                La moneda indica la magnitud de dinero que se utiliza en la cuenta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Guardar
        </Button>
      </form>
    </Form>
  );
};
