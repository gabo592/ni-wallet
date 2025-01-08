import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { ModeToggle } from '@/components/common/mode-toggle';
import { Button } from '@/components/ui/button';
import { House } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'sonner';

export default function ResetPasswordPage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link href={'/'}>
            <House className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Cambiar Contraseña</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <ChangePasswordForm />
      </main>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
