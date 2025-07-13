import { Container } from "@/components/common/container";
import { ModeToggle } from "@/components/common/mode-toggle";
import { Fragment } from "react";
import { LoginForm } from "@/components/auth/login/form";
import Image from "next/image";
import Logo from "@/public/images/logo.png";

export default function LoginPage() {
  return (
    <Fragment>
      <header className="flex items-center justify-between p-4">
        <div className="h-9 w-9"></div>
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        <ModeToggle />
      </header>
      <Container>
        <Image src={Logo} alt="logo" className="w-20 h-auto" />
        <LoginForm />
      </Container>
    </Fragment>
  );
}
