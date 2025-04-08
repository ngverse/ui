export interface Group {
  name: string;
  children: SidebarLink[];
  sort?: boolean;
}

export interface SidebarLink {
  name: string;
  url: string;
  mode?: 'experimental';
}
