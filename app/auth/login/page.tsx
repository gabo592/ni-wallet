import { ModeToggle } from '@/components/common/mode-toggle';
import { LoginForm } from '@/lib/features/auth/ui/login-form';

import Logo from '@/public/images/logo.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <div className="w-9 h-9"></div>
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8 w-full">
        <Image src={Logo} alt="Logo" className="w-24 h-24" />
        <LoginForm />
      </main>
    </>
  );
}
