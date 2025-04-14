export interface ModuleNavigation {
  name: string;
  url: string;
  icon: string;
}

export const MODULE_NAVIGATIONS: ModuleNavigation[] = [
  {
    name: 'UI',
    url: '/doc/ui',
    icon: 'settop_component',
  },
  {
    name: 'Pipes',
    icon: 'valve',
    url: '/doc/pipes',
  },
  {
    name: 'Animations',
    url: '/doc/animations',
    icon: 'animation',
  },
];
