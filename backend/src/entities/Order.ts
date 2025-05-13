import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    customerName!: string;

    @Column()
    customerEmail!: string;

    @Column()
    customerPhone!: string;

    @Column()
    deliveryAddress!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount!: number;

    @Column()
    status!: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    items!: OrderItem[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 