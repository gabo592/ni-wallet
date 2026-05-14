import { ModeToggle } from '@/components/common/mode-toggle';

export default function HomePage() {
  return (
    <>
      <header
        data-testid="header"
        className="flex items-center justify-between p-4"
      >
        <ModeToggle />
      </header>
      <main data-testid="main"></main>
    </>
  );
}
