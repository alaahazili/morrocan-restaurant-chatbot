import { v2 } from '@google-cloud/dialogflow';
import { MenuItem } from '../types/menu';
import { mockMenu } from '../data/mockMenu';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Order {
    id: string;
    items: { item: MenuItem; quantity: number }[];
    status: 'pending' | 'preparing' | 'ready' | 'completed';
    total: number;
    createdAt: Date;
}

export class DialogflowService {
    private sessionClient: v2.SessionsClient | null = null;
    private projectId: string;
    private sessionPath: string;
    private isDialogflowEnabled: boolean;
    private orders: Map<string, Order> = new Map();

    constructor(sessionId: string) {
        // Get credentials from environment variables
        const credentials = {
            private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
        };

        this.projectId = process.env.DIALOGFLOW_PROJECT_ID || '';
        this.isDialogflowEnabled = !!(this.projectId && credentials.private_key && credentials.client_email);
        
        if (this.isDialogflowEnabled) {
            // Initialize the Dialogflow client with credentials
            this.sessionClient = new v2.SessionsClient({
                credentials: credentials
            });
            this.sessionPath = this.sessionClient.projectAgentSessionPath(this.projectId, sessionId);
        } else {
            console.warn('Dialogflow credentials not found. Using fallback responses.');
            this.sessionPath = '';
        }
    }

    async handleQuery(query: string): Promise<any> {
        if (!this.isDialogflowEnabled) {
            return this.handleFallbackResponse(query);
        }

        try {
            const response = await this.detectIntent(query);
            return this.processDialogflowResponse(response);
        } catch (error) {
            console.error('Error handling query:', error);
            return this.handleFallbackResponse(query);
        }
    }

    private async detectIntent(text: string): Promise<any> {
        if (!this.sessionClient) {
            throw new Error('Dialogflow client not initialized');
        }

        const request = {
            session: this.sessionPath,
            queryInput: {
                text: {
                    text,
                    languageCode: 'en-US',
                },
            },
        };

        try {
            const [response] = await this.sessionClient.detectIntent(request);
            return response;
        } catch (error) {
            console.error('Error detecting intent:', error);
            throw error;
        }
    }

    private processDialogflowResponse(response: any): any {
        const fulfillmentText = response.queryResult?.fulfillmentText;
        const parameters = response.queryResult?.parameters || {};
        
        return {
            text: fulfillmentText || 'I could not understand that.',
            intent: response.queryResult?.intent?.displayName,
            confidence: response.queryResult?.intentDetectionConfidence,
            parameters: parameters
        };
    }

    private handleFallbackResponse(query: string): any {
        const lowerQuery = query.toLowerCase();
        
        // Order-related responses
        if (lowerQuery.includes('order') || lowerQuery.includes('track')) {
            if (lowerQuery.includes('track')) {
                return this.handleOrderTracking();
            } else if (lowerQuery.includes('checkout') || lowerQuery.includes('pay')) {
                return this.handleCheckout();
            } else if (lowerQuery.includes('add') || lowerQuery.includes('want')) {
                return this.handleAddToOrder(query);
            } else {
                return {
                    text: 'I can help you with your order. You can add items, track your order, or proceed to checkout. What would you like to do?',
                    intent: 'order.assist',
                    confidence: 1
                };
            }
        }
        
        // Simple keyword-based responses
        if (lowerQuery.includes('menu') || lowerQuery.includes('food') || lowerQuery.includes('dish')) {
            return {
                text: 'Here are some of our popular dishes: Tagine, Couscous, and Pastilla. Would you like to know more about any of these?',
                intent: 'menu.inquiry',
                confidence: 1
            };
        } else if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
            return {
                text: 'Our prices range from 35 MAD for starters to 125 MAD for main courses. Would you like to know the price of a specific dish?',
                intent: 'price.inquiry',
                confidence: 1
            };
        } else if (lowerQuery.includes('vegetarian') || lowerQuery.includes('vegan')) {
            return {
                text: 'We have several vegetarian options including Vegetable Tagine, Couscous with Seven Vegetables, and Harira Soup.',
                intent: 'dietary.inquiry',
                confidence: 1
            };
        } else {
            return {
                text: 'I can help you with information about our menu, prices, and dietary options. What would you like to know?',
                intent: 'default.fallback',
                confidence: 1
            };
        }
    }

    private handleOrderTracking(): any {
        const order = this.getCurrentOrder();
        if (!order) {
            return {
                text: 'You don\'t have any active orders. Would you like to place one?',
                intent: 'order.tracking',
                confidence: 1
            };
        }

        return {
            text: `Your order #${order.id} is currently ${order.status}. It includes: ${this.formatOrderItems(order.items)}. Total: ${order.total} MAD`,
            intent: 'order.tracking',
            confidence: 1,
            order: order
        };
    }

    private handleCheckout(): any {
        const order = this.getCurrentOrder();
        if (!order || order.items.length === 0) {
            return {
                text: 'Your cart is empty. Please add some items before checking out.',
                intent: 'checkout.empty',
                confidence: 1
            };
        }

        return {
            text: `Ready to checkout? Your order total is ${order.total} MAD. Would you like to proceed with payment?`,
            intent: 'checkout.confirm',
            confidence: 1,
            order: order
        };
    }

    private handleAddToOrder(query: string): any {
        const items = this.findItemsInQuery(query);
        if (items.length === 0) {
            return {
                text: 'I couldn\'t find that item in our menu. Could you please try again?',
                intent: 'order.add.failed',
                confidence: 1
            };
        }

        const order = this.getCurrentOrder() || this.createNewOrder();
        items.forEach(item => {
            const existingItem = order.items.find(i => i.item.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                order.items.push({ item, quantity: 1 });
            }
        });

        this.updateOrderTotal(order);
        this.orders.set(order.id, order);

        return {
            text: `Added to your order: ${items.map(i => i.name).join(', ')}. Your current total is ${order.total} MAD. Would you like to add anything else?`,
            intent: 'order.add.success',
            confidence: 1,
            order: order
        };
    }

    private getCurrentOrder(): Order | undefined {
        return Array.from(this.orders.values())
            .find(order => order.status === 'pending');
    }

    private createNewOrder(): Order {
        const order: Order = {
            id: Math.random().toString(36).substring(2, 9),
            items: [],
            status: 'pending',
            total: 0,
            createdAt: new Date()
        };
        this.orders.set(order.id, order);
        return order;
    }

    private updateOrderTotal(order: Order): void {
        order.total = order.items.reduce((total, { item, quantity }) => 
            total + (item.price * quantity), 0);
    }

    private formatOrderItems(items: { item: MenuItem; quantity: number }[]): string {
        return items.map(({ item, quantity }) => 
            `${quantity}x ${item.name}`).join(', ');
    }

    private findItemsInQuery(query: string): MenuItem[] {
        return mockMenu.filter(item => 
            query.toLowerCase().includes(item.name.toLowerCase())
        );
    }

    private findMenuItem(name: string): MenuItem | undefined {
        return mockMenu.find(item => 
            item.name.toLowerCase() === name.toLowerCase()
        );
    }

    private getItemsByCategory(category: string): MenuItem[] {
        return mockMenu.filter(item => 
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    private getItemsByPrice(maxPrice: number): MenuItem[] {
        return mockMenu.filter(item => item.price <= maxPrice);
    }

    private getVegetarianItems(): MenuItem[] {
        return mockMenu.filter(item => item.isVegetarian);
    }

    private searchItems(searchTerm: string): MenuItem[] {
        const term = searchTerm.toLowerCase();
        return mockMenu.filter(item => 
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
    }
} 