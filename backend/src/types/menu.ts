export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'tagine' | 'couscous' | 'grill' | 'dessert' | 'drink';
  image: string;
  isVegetarian?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
} 