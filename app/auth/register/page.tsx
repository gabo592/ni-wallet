import { Container } from '@/components/common/container';
import { ReturnButton } from '@/components/common/return-button';
import { ModeToggle } from '@/components/common/mode-toggle';
import { RegisterForm } from '@/components/auth/register-form';
import { Toaster } from 'sonner';
import Image from 'next/image';
import Logo from '@/public/images/logo.png';

export default function RegisterPage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Cuenta</h1>
        <ModeToggle />
      </header>
      <Container>
        <Image src={Logo} alt="logo" className="w-20 h-auto" />
        <RegisterForm />
      </Container>
      <Toaster richColors />
    </>
  );
}
