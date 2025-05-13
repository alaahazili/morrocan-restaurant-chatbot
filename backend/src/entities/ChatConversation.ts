import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ChatMessage } from './ChatMessage';

@Entity()
export class ChatConversation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    sessionId!: string;

    @Column({ nullable: true })
    userId?: string;

    @OneToMany(() => ChatMessage, message => message.conversation)
    messages!: ChatMessage[];

    @Column('jsonb', { default: {} })
    context!: Record<string, any>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 