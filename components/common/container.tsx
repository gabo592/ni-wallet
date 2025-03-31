import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <main className="flex flex-col items-center p-4 gap-8 w-full">
      {children}
    </main>
  );
}
