import {MainContainer} from "@/components/common/main-container";
import {ReturnButton} from "@/components/common/return-button";
import {ModeToggle} from "@/components/common/mode-toggle";
import {RegisterForm} from "@/components/auth/register-form";
import Image from "next/image";
import Logo from "@/public/images/logo.png";


export default function RegisterPage() {
  return (
    <>
      <header className='flex items-center justify-between p-4'>
        <ReturnButton/>
        <h1 className='text-2xl font-bold'>Registrarse</h1>
        <ModeToggle/>
      </header>
      <MainContainer>
        <Image src={Logo} alt='logo' className='w-20 h-20'/>
        <RegisterForm/>
      </MainContainer>
    </>
  )
}
