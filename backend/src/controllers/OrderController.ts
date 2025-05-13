import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async createOrder = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderData = req.body;
            const order = await this.orderService.createOrder(orderData);
            res.status(201).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Error creating order', error: (error as Error).message });
        }
    };

    async getOrderById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.json(order);
        } catch (error) {
            console.error('Error getting order:', error);
            res.status(500).json({ message: 'Error getting order', error: (error as Error).message });
        }
    };

    async updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await this.orderService.updateOrderStatus(id, status);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.json(order);
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ message: 'Error updating order status', error: (error as Error).message });
        }
    };

    async getAllOrders = async (req: Request, res: Response): Promise<void> => {
        try {
            const orders = await this.orderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            console.error('Error getting all orders:', error);
            res.status(500).json({ message: 'Error getting all orders', error: (error as Error).message });
        }
    };

    async getOrdersByStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { status } = req.query;
            if (typeof status !== 'string') {
                res.status(400).json({ message: 'Status parameter is required and must be a string' });
                return;
            }
            const orders = await this.orderService.getOrdersByStatus(status);
            res.json(orders);
        } catch (error) {
            console.error('Error getting orders by status:', error);
            res.status(500).json({ message: 'Error getting orders by status', error: (error as Error).message });
        }
    };
} 