import { ModeToggle } from '@/widgets/mode-toggle/ui/mode-toggle';

export default function Home() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <div className="w-9 h-9"></div>
        <h1 className="text-2xl font-bold">Ni Wallet</h1>
        <ModeToggle />
      </header>
      <main></main>
    </>
  );
}
