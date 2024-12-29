import { FC } from 'react';
import { ReturnButton } from './return-button';
import { ModeToggle } from './mode-toggle';

interface AppHeaderProps {
  title: string;
}

export const AppHeader: FC<AppHeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center p-4">
      <ReturnButton />
      <h1 className="text-xl font-bold">{title}</h1>
      <ModeToggle />
    </header>
  );
};
