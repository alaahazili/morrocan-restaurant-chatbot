import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { MenuItem } from '@/types/menu';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

const storage: PersistStorage<CartStore> = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('Error parsing cart storage', error);
      return null;
    }
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.id === item.id);
        return {
          items: existing
            ? state.items.map(i => 
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...state.items, { ...item, quantity: 1 }]
        };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }),
    {
      name: 'moroccan-restaurant-cart',
      storage
    }
  )
);