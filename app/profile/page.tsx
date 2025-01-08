import { AppHeader } from '@/components/common/app-header';
import { getUser } from '../auth/actions';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Lock, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditProfileDrawerDialog } from '@/components/profile/edit-profile-drawer-dialog';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect('/error');
  }

  return (
    <>
      <AppHeader title="Perfil" />
      <main className="flex flex-col items-center gap-8 p-4">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt="user_avatar"
            width={1000}
            height={1000}
            className="w-36 h-auto rounded-full"
          />
        ) : (
          <User className="w-14 h-14" />
        )}
        <section className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
          <h3>{user.email}</h3>
        </section>

        <section className="flex flex-col lg:flex-row w-full max-w-md lg:max-w-xl gap-2 justify-between">
          <EditProfileDrawerDialog user={user} />
          <Button variant={'outline'}>
            <Lock className="w-4 h-4" />
            Cambiar Contraseña
          </Button>
          <Button variant={'destructive'}>
            <Trash2 className="w-4 h-4" />
            Eliminar Cuenta
          </Button>
        </section>
      </main>
    </>
  );
}
