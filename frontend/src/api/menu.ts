import { MenuItem } from '@/types/menu';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchMenu = async (): Promise<MenuItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

export const fetchMenuByCategory = async (category: string): Promise<MenuItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/category/${category}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching menu for category ${category}:`, error);
    throw error;
  }
};

export const fetchMenuItem = async (id: number): Promise<MenuItem> => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/item/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching menu item ${id}:`, error);
    throw error;
  }
};