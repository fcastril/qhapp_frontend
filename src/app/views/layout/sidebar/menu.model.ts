export interface MenuItem {
  id: string;
  label?: string;
  icon?: string;
  feather?: boolean;
  fontawesone?: boolean;
  link?: string;
  expanded?: boolean;
  subItems?: MenuItem[];
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  option?: string;
  access?: boolean;
}
