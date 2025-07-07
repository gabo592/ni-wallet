import { UserAvatar } from '@/entities/user/ui/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SidebarMenuButton } from '@/shared/ui/sidebar';
import { ChevronsUpDown } from 'lucide-react';
import { routes } from '../model/constants';
import { getUser } from '@/entities/user/api/actions';
import { SignOutButton } from '@/features/auth/sign-out/ui/sign-out-button';
import Link from 'next/link';

export const AvatarMenu = async () => {
  const { data } = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-auto hover:cursor-pointer">
          <section className="flex items-center gap-2">
            <UserAvatar />
            <section className="flex flex-col">
              <span className="font-semibold">{`${data?.first_name} ${data?.last_name}`}</span>
              <span className="text-xs text-muted-foreground">
                {data?.email}
              </span>
            </section>
          </section>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" side="right">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuGroup>
          {routes.map((route) => (
            <DropdownMenuItem key={route.name}>
              <Link
                href={route.href}
                className="flex items-center gap-2 w-full"
              >
                <route.icon />
                {route.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
