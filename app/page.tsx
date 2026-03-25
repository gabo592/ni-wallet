import { ModeToggle } from '@/components/common/mode-toggle';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <header>
        <ModeToggle />
      </header>
      <main>
        <Button>Click</Button>
      </main>
    </>
  );
}
