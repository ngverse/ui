import { Group } from './sidebar-types';

export const GUIDES_LINKS: Group = {
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
      name: 'Theming',
      url: 'theming',
    },
    {
      name: 'Usage',
      url: 'usage',
    },
  ],
};
