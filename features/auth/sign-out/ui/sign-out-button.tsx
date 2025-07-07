'use client';

import { Button } from '@/shared/ui/button';
import { useSignOutButton } from '../model/use-sign-out-button';
import { Loader2, LogOut } from 'lucide-react';

export const SignOutButton = () => {
  const { handleSignOut, isPending } = useSignOutButton();

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      disabled={isPending}
      className="w-full"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4 text-white" />
      )}
      Cerrar sesión
    </Button>
  );
};
