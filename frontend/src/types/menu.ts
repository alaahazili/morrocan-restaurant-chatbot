export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'tagine' | 'couscous' | 'grill' | 'dessert' | 'drink';
  image: string;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  isVegetarian?: boolean;
}