import { UserImage } from '@/entities/user/ui/user-image';
import { ChangeImageDialog } from '@/features/user/change-image/ui/change-image-dialog';
import { Button } from '@/shared/ui/button';
import { Pencil, Lock, Trash2 } from 'lucide-react';

export const UserProfile = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-6">
      <UserImage />
      <section className="grid md:grid-cols-2 gap-4 w-full max-w-md">
        <ChangeImageDialog />
        <Button variant="outline">
          <Pencil className="w-4 h-4" />
          Editar Información
        </Button>
        <Button variant="outline">
          <Lock className="w-4 h-4" />
          Cambiar Contraseña
        </Button>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4" />
          Eliminar Cuenta
        </Button>
      </section>
    </section>
  );
};
