import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import type { FC } from 'react';

// Use fallback icons for MessageSquare and X
const MessageSquare: FC<{ size?: number }> = () => <span>💬</span>;
const X: FC<{ size?: number }> = () => <span>×</span>;

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

type OrderData = object;
type ReservationData = object;
type MenuItemData = object;

interface AdditionalData {
  order?: OrderData;
  reservation?: ReservationData;
  menuItems?: MenuItemData[];
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate or retrieve session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          sessionId 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Add bot response
      const botMessage: Message = {
        text: data.text || 'Sorry, I could not understand that.',
        sender: 'bot',
        timestamp: new Date(),
        intent: data.intent,
        confidence: data.confidence
      };
      setMessages(prev => [...prev, botMessage]);

      // Handle additional data based on intent
      handleAdditionalData(data);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message with more specific information
      const errorMessage: Message = {
        text: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdditionalData = (data: AdditionalData) => {
    if (data.order) {
      // Handle order data
      console.log('Order updated:', data.order);
    }
    if (data.reservation) {
      // Handle reservation data
      console.log('Reservation created:', data.reservation);
    }
    if (data.menuItems) {
      // Handle menu items data
      console.log('Menu items found:', data.menuItems);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-moroccan-gold text-white p-3 rounded-full shadow-lg hover:bg-moroccan-gold/90 transition-colors"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-moroccan-gold text-white rounded-t-lg">
            <h3 className="font-bold">Restaurant Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-moroccan-gold text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-moroccan-gold"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-moroccan-gold hover:bg-moroccan-gold/90"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 