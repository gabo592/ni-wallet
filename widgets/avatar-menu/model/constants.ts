import { Route } from '@/shared/lib/types';
import { CreditCardIcon, UserIcon } from 'lucide-react';

export const routes: Route[] = [
  {
    name: 'Perfil',
    href: '/profile',
    icon: UserIcon,
  },
  {
    name: 'Cuenta',
    href: '/billing',
    icon: CreditCardIcon,
  },
];
