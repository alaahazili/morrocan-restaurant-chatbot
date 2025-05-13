// Interface for Message
export interface IMessage {
    text: string;
    sender: 'user' | 'bot';
    intent?: string;
    confidence?: number;
    timestamp: Date;
}

// Interface for Conversation
export interface IConversation {
    sessionId: string;
    userId?: string;
    messages: IMessage[];
    context: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for User Preferences
export interface IUserPreferences {
    userId: string;
    dietaryPreferences: string[];
    spicePreference: string;
    favoriteCategories: string[];
    previousOrders: string[];
    lastInteraction: Date;
} 