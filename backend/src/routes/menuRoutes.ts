import { Router } from 'express';
import { mockMenu } from '../data/mockMenu';

const router = Router();

// Get all menu items
router.get('/menu', (req, res) => {
    try {
        res.json(mockMenu);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get menu items by category
router.get('/menu/category/:category', (req, res) => {
    try {
        const category = req.params.category;
        const items = mockMenu.filter(item => 
            item.category.toLowerCase() === category.toLowerCase()
        );
        
        if (items.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.json(items);
    } catch (error) {
        console.error('Error fetching menu by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get menu item by ID
router.get('/menu/item/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const item = mockMenu.find(item => item.id === id);
        
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(item);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 