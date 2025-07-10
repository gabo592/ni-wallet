import { SidebarTrigger } from '@/shared/ui/sidebar';
import { ModeToggle } from '@/widgets/mode-toggle/ui/mode-toggle';
import { FC } from 'react';
import { AppHeaderProps } from '../model/types';

export const AppHeader: FC<AppHeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-row items-center justify-between p-4">
      <SidebarTrigger className="w-9 h-9" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <ModeToggle />
    </header>
  );
};
