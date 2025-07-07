import { Container } from '@/widgets/container/ui/container';
import { ModeToggle } from '@/widgets/mode-toggle/ui/mode-toggle';
import { ReturButton } from '@/widgets/return-button/ui/return-button';
import { RegisterForm } from '@/features/auth/register/ui/register-form';
import Image from 'next/image';
import Logo from '@/public/images/logo.png';

export default function RegisterPage() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <ReturButton />
        <h1 className="text-2xl font-bold">Registrarse</h1>
        <ModeToggle />
      </header>
      <Container>
        <Image src={Logo} alt="Logo" className="w-20 h-auto" />
        <RegisterForm />
      </Container>
    </>
  );
}
