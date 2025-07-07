import { Container } from '@/widgets/container/ui/container';
import { ModeToggle } from '@/widgets/mode-toggle/ui/mode-toggle';
import { LoginForm } from '@/features/auth/login/ui/login-form';
import Image from 'next/image';
import Logo from '@/public/images/logo.png';

export default function LoginPage() {
  return (
    <>
      <header className="flex flex-row p-4 items-center justify-between">
        <div className="w-9 h-9"></div>
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        <ModeToggle />
      </header>
      <Container>
        <Image src={Logo} alt="Logo" className="w-20 h-auto" />
        <LoginForm />
      </Container>
    </>
  );
}
