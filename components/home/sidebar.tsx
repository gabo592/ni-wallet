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
import { sidebarMenuRoutes } from '@/constants/routes';
import Link from 'next/link';

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}
          className="hover:cursor-pointer"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>Selecciona una opción</SheetDescription>
        </SheetHeader>
        <section className="flex flex-col w-full p-4">
          {sidebarMenuRoutes.map((route) => (
            <Link
              key={route.name}
              href={route.href}
              className="flex items-center gap-2 p-2 w-full rounded-md hover:cursor-pointer hover:bg-accent hover:text-accent-foreground"
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}
