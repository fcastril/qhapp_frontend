
export interface MenuItem {
  id?: number;
  label?: string;
  icon?: string;
  feather?: boolean;
  fontawesone?: boolean;
  link?: string;
  expanded?: boolean;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  option?: string;
}
