import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

export class OrderRepository {
    private repository: Repository<Order>;

    constructor() {
        this.repository = AppDataSource.getRepository(Order);
    }

    async createOrder(order: Partial<Order>): Promise<Order> {
        const newOrder = this.repository.create(order);
        return await this.repository.save(newOrder);
    }

    async getOrderById(id: string): Promise<Order | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['items', 'items.menuItem']
        });
    }

    async updateOrderStatus(id: string, status: string): Promise<Order | null> {
        await this.repository.update(id, { status });
        return await this.getOrderById(id);
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.repository.find({
            relations: ['items', 'items.menuItem'],
            order: { createdAt: 'DESC' }
        });
    }

    async getOrdersByStatus(status: string): Promise<Order[]> {
        return await this.repository.find({
            where: { status },
            relations: ['items', 'items.menuItem'],
            order: { createdAt: 'DESC' }
        });
    }
} 