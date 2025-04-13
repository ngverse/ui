import { SidebarGroup } from './sidebar-types';

export const PIPE_LINKS: SidebarGroup = {
  name: 'Pipes',
  statics: [
    {
      name: 'Configuration',
      url: 'configuration',
    },
  ],
  children: [
    {
      name: 'CharAt',
      url: 'char-at',
      mode: 'experimental',
    },
  ],
};
