import { ReturnButton } from './return-button';
import { ModeToggle } from './mode-toggle';

interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  return (
    <header className="flex flex-row items-center justify-between p-4">
      <ReturnButton />
      <h1 className="text-xl font-bold">{props.title}</h1>
      <ModeToggle />
    </header>
  );
}
