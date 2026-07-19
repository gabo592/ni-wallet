import {ModeToggle} from "@/components/common/mode-toggle";
import {MainContainer} from "@/components/common/main-container";
import {LoginForm} from "@/components/auth/login-form";
import Logo from "@/public/images/logo.png";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <header className='flex items-center justify-between p-4'>
        <div className='h-9 w-9'></div>
        <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
        <ModeToggle/>
      </header>
      <MainContainer>
        <Image src={Logo} alt='logo' className='w-20 h-20'/>
        <LoginForm/>
      </MainContainer>
    </>
  )
}
