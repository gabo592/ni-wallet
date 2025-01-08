import { getUser } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AVATAR_MENU_ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { LogoutButton } from '../common/logout-button';

const getInitials = (first_name: string, last_name: string) => {
  return `${first_name[0]}${last_name[0]}`.toUpperCase();
};

export const AvatarMenu = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/error');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Avatar>
          <AvatarImage src={user.avatar_url ?? ''} alt="user_avatar" />
          <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {AVATAR_MENU_ROUTES.map((route, index) => (
            <DropdownMenuItem key={`item-${index}`} asChild>
              <Link href={route.path} className="flex items-center gap-2">
                <route.icon className="w-4 h-4" />
                {route.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
