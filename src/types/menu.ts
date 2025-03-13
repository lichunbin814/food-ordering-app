export interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export type Menu = MenuCategory[];
