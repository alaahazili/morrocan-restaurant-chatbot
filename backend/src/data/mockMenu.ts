import { MenuItem } from '../types/menu';

export const mockMenu: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Harira Soup",
    description: "Traditional Moroccan soup with lentils, chickpeas, tomatoes and herbs",
    price: 35,
    category: "starter",
    image: "/images/harira.jpg",
    isVegetarian: true
  },
  {
    id: 2,
    name: "Briouats",
    description: "Crispy phyllo pastry stuffed with spiced meat or cheese",
    price: 45,
    category: "starter",
    image: "/images/briouats.jpg"
  },

  // Tagines
  {
    id: 3,
    name: "Chicken Tagine with Lemon",
    description: "Tender chicken with preserved lemons and green olives",
    price: 95,
    category: "tagine",
    image: "/images/chicken-tagine.jpg",
    spiceLevel: "medium"
  },
  {
    id: 4,
    name: "Lamb Tagine with Prunes",
    description: "Slow-cooked lamb with sweet prunes and almonds",
    price: 115,
    category: "tagine",
    image: "/images/lamb-tagine.jpg"
  },
  {
    id: 5,
    name: "Vegetable Tagine",
    description: "Seasonal vegetables with chickpeas and Moroccan spices",
    price: 85,
    category: "tagine",
    image: "/images/vegetable-tagine.jpg",
    isVegetarian: true
  },

  // Couscous
  {
    id: 6,
    name: "Couscous with Seven Vegetables",
    description: "Fluffy semolina with seasonal vegetables and broth",
    price: 90,
    category: "couscous",
    image: "/images/vegetable-couscous.jpg",
    isVegetarian: true
  },
  {
    id: 7,
    name: "Couscous with Lamb",
    description: "Traditional Friday couscous with tender lamb",
    price: 110,
    category: "couscous",
    image: "/images/lamb-couscous.jpg"
  },

  // Grills
  {
    id: 8,
    name: "Mixed Grill Platter",
    description: "Selection of Moroccan grilled meats with salads",
    price: 125,
    category: "grill",
    image: "/images/mixed-grill.jpg"
  },
  {
    id: 9,
    name: "Kefta Kebabs",
    description: "Spiced ground beef skewers with grilled vegetables",
    price: 95,
    category: "grill",
    image: "/images/kefta.jpg"
  },

  // Desserts
  {
    id: 10,
    name: "Baklava",
    description: "Layers of phyllo pastry with honey and nuts",
    price: 45,
    category: "dessert",
    image: "/images/baklava.jpg",
    isVegetarian: true
  },
  {
    id: 11,
    name: "Sellou",
    description: "Traditional Moroccan energy dessert with almonds and sesame",
    price: 40,
    category: "dessert",
    image: "/images/sellou.jpg",
    isVegetarian: true
  },

  // Drinks
  {
    id: 12,
    name: "Mint Tea",
    description: "Traditional Moroccan green tea with fresh mint",
    price: 25,
    category: "drink",
    image: "/images/mint-tea.jpg",
    isVegetarian: true
  },
  {
    id: 13,
    name: "Avocado Smoothie",
    description: "Creamy avocado with milk and honey",
    price: 35,
    category: "drink",
    image: "/images/avocado-smoothie.jpg",
    isVegetarian: true
  }
]; 