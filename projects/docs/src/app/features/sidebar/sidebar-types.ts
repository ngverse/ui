export interface SidebarGroup {
  name: string;
  children: SidebarLink[];
  sort?: boolean;
  statics?: SidebarLink[];
}

export interface SidebarLink {
  name: string;
  url: string;
  mode?: 'experimental';
}
