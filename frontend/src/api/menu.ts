import { MenuItem } from '@/types/menu';
import { mockMenu } from '@/data/mockMenu';

export const fetchMenu = async (): Promise<MenuItem[]> => {
  try {
    if (import.meta.env.PROD) {
      const response = await fetch('/api/menu');
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    }
    return mockMenu;
  } catch (error) {
    console.error('Error fetching menu:', error);
    // Return mock data but add error flag for UI handling
    return [...mockMenu, { _error: true } as unknown as MenuItem];
  }
};