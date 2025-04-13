import { SidebarGroup } from './sidebar-types';

export const ANIMATION_LINKS: SidebarGroup = {
  name: 'Animations',
  statics: [
    {
      name: 'Configuration',
      url: 'configuration',
    },
  ],
  children: [
    {
      name: 'Fade In',
      url: 'fade-in',
    },
    {
      name: 'Fade In Up',
      url: 'fade-in-up',
    },
  ],
};
