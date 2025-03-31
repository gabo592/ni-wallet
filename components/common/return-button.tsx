'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

export function ReturnButton() {
  const router = useRouter();

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      className="hover:cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
}
