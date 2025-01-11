import { getCurrencies } from '@/app/currencies/actions';
import { AccountsForm } from '@/components/accounts/accounts-form';
import { AppHeader } from '@/components/common/app-header';
import { Toaster } from 'sonner';

export default async function NewAccountPage() {
  const currencies = await getCurrencies();

  return (
    <>
      <AppHeader title="Crear cuenta" />
      <main className="flex flex-col items-center p-4 gap-8">
        <AccountsForm currencies={currencies} />
      </main>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
