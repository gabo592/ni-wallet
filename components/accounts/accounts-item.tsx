import { Account } from '@/types/account';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { FC } from 'react';
import { Button } from '../ui/button';
import { Landmark, Pencil } from 'lucide-react';
import { formatCurrency } from '@/utils/common/format';
import { Badge } from '../ui/badge';
import { DeleteAlertDialog } from '../common/delete-alert-dialog';
import { deleteAccount } from '@/app/accounts/actions';

interface AccountsItemProps {
  account: Account;
}

export const AccountsItem: FC<AccountsItemProps> = ({ account }) => {
  return (
    <Card className="flex flex-col items-start justify-between">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Landmark className="h-4 w-4" />
          {account.name}
        </CardTitle>
        <CardDescription>{account.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold">
          {formatCurrency(account.balance, account.currency?.code ?? '')}
        </p>
        <Badge variant={'outline'}>{account.currency?.name}</Badge>
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full">
        <DeleteAlertDialog id={account.id} onConfirm={deleteAccount} />
        <Button variant={'secondary'}>
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
};
