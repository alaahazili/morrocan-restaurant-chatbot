import { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { MenuCard } from '@/components/MenuCard';
import { fetchMenu, fetchMenuByCategory } from '@/api/menu';
import { Button } from '@/components/Button';

const categories = ['all', 'tagine', 'couscous', 'starter', 'dessert', 'grill', 'drink'];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching menu items...');
        const data = await fetchMenu();
        console.log('Menu items fetched:', data);
        setMenuItems(data);
      } catch (err) {
        console.error('Error loading menu:', err);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      try {
        setLoading(true);
        const data = await fetchMenu();
        setMenuItems(data);
      } catch (err) {
        console.error('Error loading menu:', err);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const data = await fetchMenuByCategory(category);
        setMenuItems(data);
      } catch (err) {
        console.error(`Error loading ${category} items:`, err);
        setError(`Failed to load ${category} items. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }
  };

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
              onClick={() => handleCategoryChange(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moroccan-gold mx-auto"></div>
            <p className="mt-4 text-moroccan-blue">Loading menu items...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => handleCategoryChange(activeCategory)}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}