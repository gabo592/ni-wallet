import {
  ArrowRightLeft,
  Goal,
  House,
  Landmark,
  LucideProps,
  Settings,
  Trophy,
  User,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Route {
  path: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export const SIDEBAR_ROUTES: Route[] = [
  {
    path: '/',
    title: 'Inicio',
    icon: House,
  },
  {
    path: '/transactions',
    title: 'Transacciones',
    icon: ArrowRightLeft,
  },
  {
    path: '/savings-goals',
    title: 'Metas de Ahorro',
    icon: Goal,
  },
  {
    path: '/rewards',
    title: 'Recompensas',
    icon: Trophy,
  },
  {
    path: '/accounts',
    title: 'Cuentas',
    icon: Landmark,
  },
];

export const AVATAR_MENU_ROUTES: Route[] = [
  {
    path: '/profile',
    title: 'Perfil',
    icon: User,
  },
  {
    path: '/settings',
    title: 'Configuración',
    icon: Settings,
  },
];
