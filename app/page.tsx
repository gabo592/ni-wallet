import { ModeToggle } from '@/components/common/mode-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <header>
        <ModeToggle />
      </header>
      <main>
        <Button>Click me</Button>
      </main>
    </>
  );
}
