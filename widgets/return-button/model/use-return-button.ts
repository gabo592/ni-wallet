import { useRouter } from 'next/navigation';

export const useReturnButton = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };

  return {
    handleReturn,
  };
};
