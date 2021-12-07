import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: '',
    group: true,
  },
  {
    title: 'Work Orders',
    icon: 'clipboard-outline',
    children: [
      {
        title: 'Create',
        link: '/workorders/create',
      },
      {
        title: 'Open',
        link: '/workorders/list/open',
      },
      {
        title: 'In Progress',
        link: '/workorders/list/inprogress',
      },
      {
        title: 'Completed',
        link: '/workorders/list/closed',
      },
    ],
  },
  {
    title: '',
    group: true,
  },
  {
    title: 'Assets',
    icon: 'cube-outline',
    link: '/assets/list',
  },
  {
    title: 'Parts',
    icon: 'pantone-outline',
    link: '/parts/list',
  },
  {
    title: 'Locations',
    icon: 'map-outline',
    link: '/locations/list',
  },
  {
    title: '',
    group: true,
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    link: '/settings',
    children: [
      {
        title: 'Users',
        link: '/users/list',
      },
    ],
  },
];
