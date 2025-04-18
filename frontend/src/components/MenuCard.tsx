import { MenuItem } from '@/types/menu';
import { Button } from './Button';
import { useCart } from '@/store/cartStore';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const addToCart = useCart(state => state.addItem);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-moroccan-gold/20">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.isVegetarian && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            نباتي
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-arabic text-moroccan-blue">{item.name}</h3>
          <span className="bg-moroccan-gold/10 text-moroccan-red px-2 py-1 rounded text-sm">
            {item.category}
          </span>
        </div>
        <p className="text-gray-600 my-3">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-moroccan-red font-bold">{item.price} DH</span>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => addToCart(item)}
          >
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
};