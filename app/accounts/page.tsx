import { AppHeader } from '@/components/common/app-header';
import { Search } from '@/components/common/search';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAccounts } from './actions';
import { AccountsItem } from '@/components/accounts/accounts-item';
import { Toaster } from 'sonner';

interface AccountsPageProps {
  searchParams?: Promise<{
    search?: string;
  }>;
}

export default async function AccountsPage(props: AccountsPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';

  const accounts = await getAccounts({ search });

  return (
    <>
      <AppHeader title="Cuentas de Ahorro" />
      <main className="flex flex-col items-center p-4 gap-8">
        <section className="flex items-center w-full max-w-md justify-between gap-4">
          <Search />
          <Button asChild>
            <Link href="/accounts/new">Agregar</Link>
          </Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((item) => (
            <AccountsItem key={item.id} account={item} />
          ))}
        </section>
      </main>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
