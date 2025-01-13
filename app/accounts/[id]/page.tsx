import { AppHeader } from '@/components/common/app-header';
import { getAccount } from '../actions';
import { redirect } from 'next/navigation';
import { getCurrencies } from '@/app/currencies/actions';
import { AccountsForm } from '@/components/accounts/accounts-form';
import { Toaster } from 'sonner';

interface EditAccountPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAccountPage({ params }: EditAccountPageProps) {
  const id = (await params).id;

  const [account, currencies] = await Promise.all([getAccount(id), getCurrencies()]);

  if (!account) {
    redirect('/error');
  }

  return (
    <>
      <AppHeader title="Editar Cuenta" />
      <main className="flex flex-col items-center p-4 gap-8">
        <AccountsForm account={account} currencies={currencies} />
      </main>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
