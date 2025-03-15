import { Menu } from '../types/menu';

export const menuData: Menu = [
  {
    id: 'main-dishes',
    name: 'Main Dishes',
    items: [
      {
        id: 'main-1',
        name: 'Braised Beef Noodle Soup',
        description: 'Rich broth with tender, juicy beef',
      },
      {
        id: 'main-2',
        name: 'Fried Chicken Cutlet Rice',
        description: 'Crispy golden chicken with special sauce',
      },
      {
        id: 'main-3',
        name: 'Garlic Pork Chop Rice',
        description: 'Fresh pork chop with aromatic garlic',
      },
    ],
  },
  {
    id: 'sides',
    name: 'Side Dishes',
    items: [
      {
        id: 'side-1',
        name: 'Cucumber Salad',
        description: 'Refreshing appetizer salad',
      },
      {
        id: 'side-2',
        name: 'Braised Egg',
        description: 'Flavorful soy-braised egg',
      },
      {
        id: 'side-3',
        name: 'Kimchi',
        description: 'Authentic Korean kimchi',
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    items: [
      {
        id: 'drink-1',
        name: 'Bubble Milk Tea',
        description: 'Creamy milk tea with chewy pearls',
      },
      {
        id: 'drink-2',
        name: 'Lemon Green Tea',
        description: 'Refreshing green tea with lemon',
      },
      {
        id: 'drink-3',
        name: 'Winter Melon Tea',
        description: 'Traditional cooling beverage',
      },
    ],
  },
];
