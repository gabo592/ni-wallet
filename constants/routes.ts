import {
  ArrowLeftRight,
  Goal,
  House,
  Landmark,
  LucideProps,
  Settings,
  UserRound,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Route {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

export const avatarMenuRoutes: Route[] = [
  {
    name: 'Mi Perfil',
    href: '/profile',
    icon: UserRound,
  },
  {
    name: 'Configuración',
    href: '/settings',
    icon: Settings,
  },
];

export const sidebarMenuRoutes: Route[] = [
  {
    name: 'Inicio',
    href: '/',
    icon: House,
  },
  {
    name: 'Transacciones',
    href: '/transactions',
    icon: ArrowLeftRight,
  },
  {
    name: 'Cuentas',
    href: '/accounts',
    icon: Landmark,
  },
  {
    name: 'Metas',
    href: '/goals',
    icon: Goal,
  },
];
