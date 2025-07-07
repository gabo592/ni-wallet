import { SidebarTrigger } from '@/shared/ui/sidebar';
import { ModeToggle } from '@/widgets/mode-toggle/ui/mode-toggle';

export default function Home() {
  return (
    <section className="w-full">
      <header className="flex flex-row items-center justify-between p-4">
        <SidebarTrigger className="w-9 h-9" />
        <h1 className="text-2xl font-bold">Ni Wallet</h1>
        <ModeToggle />
      </header>
      <main></main>
    </section>
  );
}
