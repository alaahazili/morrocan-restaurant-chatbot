import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { MenuItem } from './MenuItem';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn()
    order!: Order;

    @ManyToOne(() => MenuItem)
    @JoinColumn()
    menuItem!: MenuItem;

    @Column()
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total!: number;
} 