import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserPreferences {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    userId!: string;

    @Column('simple-array', { nullable: true })
    dietaryPreferences?: string[];

    @Column({ nullable: true })
    spicePreference?: string;

    @Column('simple-array', { nullable: true })
    favoriteCategories?: string[];

    @Column('simple-array', { nullable: true })
    previousOrders?: string[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    lastInteraction!: Date;
} 