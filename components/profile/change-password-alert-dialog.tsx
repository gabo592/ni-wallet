'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { resetPasswordForEmail } from '@/app/auth/actions';

export const ChangePasswordAlertDialog = () => {
  const [loading, setLoading] = useState(false);

  const handleOnAction = async () => {
    setLoading(true);

    await resetPasswordForEmail();

    alert('Se ha enviado un correo con las instrucciones para cambiar la contraseña.');

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'}>
          <Lock className="w-4 h-4" />
          Cambiar Contraseña
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cambiar Contraseña</AlertDialogTitle>
          <AlertDialogDescription>
            Le enviaremos un correo para que pueda cambiar tu contraseña.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={() => handleOnAction()}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
