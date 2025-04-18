import { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import {MenuCard} from '@/components/MenuCard';
import { fetchMenu } from '@/api/menu';
import { Button } from '@/components/Button';

const categories = ['all', 'tagine', 'couscous', 'starter', 'dessert'];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchMenu().then(data => setMenuItems(data));
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-12 bg-moroccan-gold/5">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-arabic text-center text-moroccan-red mb-6">قائمتنا</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}