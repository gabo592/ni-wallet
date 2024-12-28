'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Loader2, LogOut } from 'lucide-react';
import { signOut } from '@/app/auth/actions';

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  return (
    <Button variant={'destructive'} onClick={() => handleLogout()} className="w-full">
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
      Cerrar Sesión
    </Button>
  );
};
