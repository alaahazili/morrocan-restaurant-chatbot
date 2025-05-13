import { DataSource } from 'typeorm';
import { MenuItem } from '../entities/MenuItem';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { ChatMessage } from '../entities/ChatMessage';
import { ChatConversation } from '../entities/ChatConversation';
import { UserPreferences } from '../entities/UserPreferences';
import dotenv from 'dotenv';

dotenv.config();

console.log('Initializing database connection...');
console.log('Database URL:', process.env.DATABASE_URL ? 'Configured' : 'Not configured');

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgresql://postgres:your_password@localhost:5432/morrocan_restaurant1',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    entities: [
        MenuItem,
        Order,
        OrderItem,
        ChatMessage,
        ChatConversation,
        UserPreferences
    ],
    migrations: [],
    subscribers: [],
    poolSize: 10,
    extra: {
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
    }
});

// Function to test database connection
export const testConnection = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            console.log('Attempting to connect to database...');
            await AppDataSource.initialize();
            console.log('✅ Database connection established successfully!');
            console.log('Database name:', process.env.DB_NAME || 'morrocan_restaurant1');
            console.log('Database host:', process.env.DB_HOST || 'localhost');
        } else {
            console.log('✅ Database is already connected!');
        }
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
}; 