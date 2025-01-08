import { RegisterForm } from '@/components/auth/register-form';
import { ModeToggle } from '@/components/common/mode-toggle';
import { ReturnButton } from '@/components/common/return-button';
import Logo from '@/public/images/logo.png';
import Image from 'next/image';
import { Toaster } from 'sonner';

export default function RegisterPage() {
  return (
    <>
      <header className="flex p-4 justify-between items-center">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Cuenta</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <Image src={Logo} alt="logo" className="h-28 w-auto" />
        <RegisterForm />
      </main>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
