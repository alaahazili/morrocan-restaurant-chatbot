import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ChatConversation } from './ChatConversation';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    text!: string;

    @Column()
    sender!: 'user' | 'bot';

    @Column({ nullable: true })
    intent?: string;

    @Column({ type: 'float', nullable: true })
    confidence?: number;

    @ManyToOne(() => ChatConversation, conversation => conversation.messages)
    @JoinColumn()
    conversation!: ChatConversation;

    @CreateDateColumn()
    timestamp!: Date;
} 