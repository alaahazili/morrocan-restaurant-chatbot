import { OrderRepository } from '../repositories/OrderRepository';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { AppDataSource } from '../config/database';

export class OrderService {
    private orderRepository: OrderRepository;
    private orderItemRepository = AppDataSource.getRepository(OrderItem);

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(orderData: {
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        deliveryAddress: string;
        items: Array<{
            menuItemId: string;
            quantity: number;
            price: number;
        }>;
    }): Promise<Order> {
        // Calculate total amount
        const totalAmount = orderData.items.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        // Create order items
        const orderItems = orderData.items.map(item => {
            const orderItem = new OrderItem();
            orderItem.menuItem = { id: item.menuItemId } as any;
            orderItem.quantity = item.quantity;
            orderItem.price = item.price;
            orderItem.total = item.price * item.quantity;
            return orderItem;
        });

        // Create the order
        const order = new Order();
        order.customerName = orderData.customerName;
        order.customerEmail = orderData.customerEmail;
        order.customerPhone = orderData.customerPhone;
        order.deliveryAddress = orderData.deliveryAddress;
        order.totalAmount = totalAmount;
        order.status = 'pending';
        order.items = orderItems;

        return await this.orderRepository.createOrder(order);
    }

    async getOrderById(id: string): Promise<Order | null> {
        return await this.orderRepository.getOrderById(id);
    }

    async updateOrderStatus(id: string, status: string): Promise<Order | null> {
        const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid order status');
        }
        return await this.orderRepository.updateOrderStatus(id, status);
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.getAllOrders();
    }

    async getOrdersByStatus(status: string): Promise<Order[]> {
        return await this.orderRepository.getOrdersByStatus(status);
    }
} 