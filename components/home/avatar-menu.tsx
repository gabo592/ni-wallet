import { getUser } from '@/app/auth/actions';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { Settings, UserRound } from 'lucide-react';
import { LogoutButton } from '../common/logout-button';
import { avatarMenuRoutes } from '@/constants/routes';

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0).toUpperCase()}${lastName
    .charAt(0)
    .toUpperCase()}`;
}

export async function AvatarMenu() {
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage src={user.profile_image_url} />
          <AvatarFallback>
            {getInitials(user.first_name, user.last_name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {avatarMenuRoutes.map((route) => (
          <DropdownMenuItem key={route.name} asChild>
            <Link href={route.href} className="hover:cursor-pointer">
              <route.icon />
              {route.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
