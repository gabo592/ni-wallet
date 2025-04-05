'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { logout } from '@/app/auth/actions';
import { Loader2, LogOut } from 'lucide-react';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await logout();
    setLoading(false);
  }

  return (
    <Button
      variant={'destructive'}
      onClick={handleClick}
      disabled={loading}
      className="w-full"
    >
      {loading ? <Loader2 className="animate-spin" /> : <LogOut />}
      Cerrar Sesión
    </Button>
  );
}
