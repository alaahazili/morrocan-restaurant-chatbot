import { Request, Response } from 'express';
import { DialogflowService } from '../services/DialogflowService';

export class ChatController {
    private dialogflowService: DialogflowService;

    constructor() {
        // Initialize Dialogflow service with a unique session ID
        this.dialogflowService = new DialogflowService('chat-session');
    }

    async handleChat(req: Request, res: Response) {
        try {
            const { message } = req.body;

            if (!message) {
                return res.status(400).json({ error: 'Message is required' });
            }

            const response = await this.dialogflowService.handleQuery(message);
            res.json(response);
        } catch (error) {
            console.error('Chat error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
} 