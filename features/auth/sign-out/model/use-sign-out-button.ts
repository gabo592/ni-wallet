import { useTransition } from 'react';
import { signOut } from './actions';
import { toast } from 'sonner';

export const useSignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOut();

      if (!result.isSuccess) {
        toast.error(result.error);
      }
    });
  };

  return {
    isPending,
    handleSignOut,
  };
};
