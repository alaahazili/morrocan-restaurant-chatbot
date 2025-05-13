import { SessionsClient } from '@google-cloud/dialogflow';
import { AppDataSource } from '../config/database';
import { ChatMessage } from '../entities/ChatMessage';
import { ChatConversation } from '../entities/ChatConversation';
import { UserPreferences } from '../entities/UserPreferences';
import { MenuItem } from '../entities/MenuItem';

interface DialogflowIntent {
    displayName?: string;
    detectionConfidence?: number;
}

interface DialogflowQueryResult {
    fulfillmentText?: string;
    intent?: DialogflowIntent;
    parameters?: {
        fields?: Record<string, any>;
    };
}

export class ChatService {
    private sessionClient: SessionsClient;
    private messageRepository = AppDataSource.getRepository(ChatMessage);
    private conversationRepository = AppDataSource.getRepository(ChatConversation);
    private userPreferencesRepository = AppDataSource.getRepository(UserPreferences);
    private menuItemRepository = AppDataSource.getRepository(MenuItem);

    constructor() {
        this.sessionClient = new SessionsClient({
            credentials: {
                client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
                private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
        });
    }

    async processMessage(sessionId: string, message: string, userId?: string) {
        try {
            // Get or create conversation
            let conversation = await this.conversationRepository.findOne({
                where: { sessionId },
                relations: ['messages'],
            });

            if (!conversation) {
                conversation = this.conversationRepository.create({
                    sessionId,
                    userId,
                    context: {},
                });
                await this.conversationRepository.save(conversation);
            }

            // Save user message
            const userMessage = this.messageRepository.create({
                text: message,
                sender: 'user',
                conversation,
            });
            await this.messageRepository.save(userMessage);

            // Get Dialogflow response
            const result = await this.getDialogflowResponse(sessionId, message);
            
            // Save bot message
            const botMessage = this.messageRepository.create({
                text: result.fulfillmentText || 'Sorry, I could not understand that.',
                sender: 'bot',
                intent: result.intent?.displayName || undefined,
                confidence: result.intent?.detectionConfidence || undefined,
                conversation,
            });
            await this.messageRepository.save(botMessage);

            // Handle intent if exists
            let additionalData = null;
            if (result.intent?.displayName) {
                additionalData = await this.handleIntent(
                    result.intent.displayName,
                    result.parameters?.fields || {},
                    sessionId,
                    userId
                );
            }

            return {
                text: botMessage.text,
                intent: botMessage.intent,
                confidence: botMessage.confidence,
                additionalData,
            };
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }

    private async getDialogflowResponse(sessionId: string, message: string): Promise<DialogflowQueryResult> {
        const sessionPath = this.sessionClient.projectAgentSessionPath(
            process.env.DIALOGFLOW_PROJECT_ID!,
            sessionId
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en-US',
                },
            },
        };

        const [response] = await this.sessionClient.detectIntent(request);
        const queryResult = response.queryResult!;
        // Normalize fulfillmentText and intent.displayName: convert null to undefined
        let normalizedIntent: DialogflowIntent | undefined = undefined;
        if (queryResult.intent) {
            normalizedIntent = {
                ...queryResult.intent,
                displayName: queryResult.intent.displayName ?? undefined,
            };
        }
        // Normalize parameters
        let normalizedParameters: { fields?: Record<string, any> } | undefined = undefined;
        if (queryResult.parameters && queryResult.parameters !== null) {
            normalizedParameters = {
                fields: (queryResult.parameters as any).fields ?? undefined,
            };
        }
        return {
            ...queryResult,
            fulfillmentText: queryResult.fulfillmentText ?? undefined,
            intent: normalizedIntent,
            parameters: normalizedParameters,
        };
    }

    private async handleIntent(
        intentName: string,
        parameters: Record<string, any>,
        sessionId: string,
        userId?: string
    ) {
        switch (intentName) {
            case 'menu.inquiry':
                return this.handleMenuInquiry(parameters);
            case 'order.add':
                return this.handleOrderAdd(parameters, sessionId, userId);
            case 'user.preferences':
                return this.handleUserPreferences(parameters, userId);
            default:
                return null;
        }
    }

    private async handleMenuInquiry(parameters: Record<string, any>) {
        const category = parameters.category?.stringValue;
        const query = this.menuItemRepository.createQueryBuilder('menuItem');

        if (category) {
            query.where('menuItem.category = :category', { category });
        }

        const items = await query.getMany();
        return { menuItems: items };
    }

    private async handleOrderAdd(
        parameters: Record<string, any>,
        sessionId: string,
        userId?: string
    ) {
        // Implementation for order handling
        return { success: true };
    }

    private async handleUserPreferences(
        parameters: Record<string, any>,
        userId?: string
    ) {
        if (!userId) return null;

        let preferences = await this.userPreferencesRepository.findOne({
            where: { userId },
        });

        if (!preferences) {
            preferences = this.userPreferencesRepository.create({ userId });
        }

        if (parameters.dietaryPreferences?.listValue?.values) {
            preferences.dietaryPreferences = parameters.dietaryPreferences.listValue.values.map(
                (v: any) => v.stringValue
            );
        }

        if (parameters.spicePreference?.stringValue) {
            preferences.spicePreference = parameters.spicePreference.stringValue;
        }

        await this.userPreferencesRepository.save(preferences);
        return { success: true };
    }
} 