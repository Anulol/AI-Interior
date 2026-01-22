import { ListBulletIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/outline';
import { NavItem } from '@/types';

export const navigation: Array<NavItem> = [
  { name: 'Designer', href: '/designer', icon: HomeIcon },
  { name: 'History', href: '/designer/history', icon: ListBulletIcon },
];
