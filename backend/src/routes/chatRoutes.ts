import { Router } from 'express';
import { ChatController } from '../controllers/chatController';

const router = Router();
const chatController = new ChatController();

// Chat endpoint
router.post('/chat', (req, res) => chatController.handleChat(req, res));

export default router; 