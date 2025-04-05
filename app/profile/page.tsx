import { Container } from '@/components/common/container';
import { Header } from '@/components/common/header';
import { getProfile } from './actions';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Lock, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect('/');
  }

  return (
    <>
      <Header title="Mi Perfil" />
      <Container>
        <section className="flex flex-col items-center gap-4 w-full">
          <Image
            src={profile.profile_image_url}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <section className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h2>
            <h3 className="text-xl font-semibold">{profile.email}</h3>
          </section>
        </section>
        <section className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 w-full">
          <Button variant={'outline'}>
            <Pencil className="w-4 h-4 mr-2" /> Editar Perfil
          </Button>
          <Button variant={'outline'}>
            <Lock className="w-4 h-4 mr-2" /> Cambiar Contraseña
          </Button>
          <Button variant={'destructive'}>
            <Trash2 className="w-4 h-4 mr-2" /> Eliminar Cuenta
          </Button>
        </section>
      </Container>
    </>
  );
}
