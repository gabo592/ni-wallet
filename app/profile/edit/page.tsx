import { getUser } from '@/app/auth/actions';
import { AppHeader } from '@/components/common/app-header';
import { EditProfileForm } from '@/components/profile/edit-profile-form';
import { redirect } from 'next/navigation';

export default async function EditProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect('/error');
  }

  return (
    <>
      <AppHeader title="Editar Perfil" />
      <main className="flex flex-col items-center p-4 gap-8">
        <EditProfileForm user={user} />
      </main>
    </>
  );
}
