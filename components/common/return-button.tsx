'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

export const ReturnButton = () => {
  const router = useRouter();

  return (
    <Button size={'icon'} variant={'outline'} onClick={() => router.back()}>
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
