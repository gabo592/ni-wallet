import { LoginForm } from '@/components/auth/login-form';
import { ModeToggle } from '@/components/common/mode-toggle';
import Logo from '@/public/images/logo.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <header className="flex p-4 justify-between items-center">
        <div className="w-9 h-9"></div>
        <h1 className="text-xl font-bold">Inicar Sesión</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <Image src={Logo} alt="logo" className="h-28 w-auto" />
        <LoginForm />
      </main>
    </>
  );
}
