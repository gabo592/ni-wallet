import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { SIDEBAR_ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>
            Estas son las opciones de navegación de la aplicación.
          </SheetDescription>
          <Separator />
        </SheetHeader>
        <section className="flex flex-col w-full">
          {SIDEBAR_ROUTES.map((route, index) => (
            <Link
              key={`route-${index}`}
              href={route.path}
              className="flex flex-row items-center gap-4 p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <route.icon className="w-4 h-4" />
              {route.title}
            </Link>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
};
