import { MenuItem } from '../models/chatModels';

const menuItems = [
  {
    name: "Tagine Lamb",
    description: "Slow-cooked lamb with prunes, almonds, and Moroccan spices",
    price: 180,
    category: "Main Course",
    isAvailable: true,
    dietaryInfo: ["Halal"],
    spiceLevel: "Medium",
    ingredients: ["Lamb", "Prunes", "Almonds", "Onions", "Moroccan Spices"],
    imageUrl: "/images/tagine-lamb.jpg"
  },
  {
    name: "Couscous Royal",
    description: "Traditional Moroccan couscous with vegetables and mixed meats",
    price: 160,
    category: "Main Course",
    isAvailable: true,
    dietaryInfo: ["Halal"],
    spiceLevel: "Mild",
    ingredients: ["Couscous", "Chicken", "Lamb", "Vegetables", "Raisins"],
    imageUrl: "/images/couscous-royal.jpg"
  },
  {
    name: "Harira Soup",
    description: "Traditional Moroccan soup with lentils, chickpeas, and tomatoes",
    price: 60,
    category: "Starter",
    isAvailable: true,
    dietaryInfo: ["Vegetarian", "Vegan"],
    spiceLevel: "Mild",
    ingredients: ["Lentils", "Chickpeas", "Tomatoes", "Herbs", "Spices"],
    imageUrl: "/images/harira.jpg"
  },
  {
    name: "Pastilla",
    description: "Sweet and savory pie with pigeon meat, almonds, and cinnamon",
    price: 140,
    category: "Main Course",
    isAvailable: true,
    dietaryInfo: ["Halal"],
    spiceLevel: "Mild",
    ingredients: ["Pigeon", "Almonds", "Cinnamon", "Phyllo Dough", "Eggs"],
    imageUrl: "/images/pastilla.jpg"
  },
  {
    name: "Mint Tea",
    description: "Traditional Moroccan mint tea with fresh mint leaves",
    price: 30,
    category: "Beverage",
    isAvailable: true,
    dietaryInfo: ["Vegetarian", "Vegan"],
    spiceLevel: "None",
    ingredients: ["Green Tea", "Fresh Mint", "Sugar"],
    imageUrl: "/images/mint-tea.jpg"
  }
];

export const seedDatabase = async () => {
  try {
    // Clear existing menu items
    await MenuItem.deleteMany({});
    
    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}; 