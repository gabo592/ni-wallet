'use client';

import { Button } from '@/shared/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useReturnButton } from '../model/use-return-button';

export const ReturButton = () => {
  const { handleReturn } = useReturnButton();

  return (
    <Button variant="outline" size="icon" onClick={() => handleReturn()}>
      <ChevronLeft />
    </Button>
  );
};
