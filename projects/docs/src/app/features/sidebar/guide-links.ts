import { SidebarGroup } from './sidebar-types';

export const GUIDES_LINKS: SidebarGroup = {
  name: 'Guides',
  sort: false,
  children: [
    {
      name: 'Introduction',
      url: 'introduction',
    },

    {
      name: 'Installation',
      url: 'installation',
    },
    {
      name: 'Usage',
      url: 'usage',
    },
  ],
};
