'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Welcome message
            setMessages([
                {
                    role: 'assistant',
                    content: 'مرحباً! 👋 أنا مساعدك الذكي في Blore Agency. كيف يمكنني مساعدتك اليوم؟',
                },
            ]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: messages,
                }),
            });

            const data = await response.json();

            if (response.ok && data.reply) {
                setMessages(data.conversationHistory);
            } else {
                // Handle specific error types
                let errorMessage = 'عذراً، حدث خطأ. يمكنك التواصل معنا مباشرة على info@bloreagency.com';

                if (data.code === 'MISSING_API_KEY' || data.code === 'INVALID_API_KEY') {
                    errorMessage = '⚠️ عذراً، الشات بوت غير متاح حالياً. يرجى التواصل معنا عبر:\n📧 info@bloreagency.com\n📱 +20 120 294 4459';
                } else if (data.code === 'QUOTA_EXCEEDED') {
                    errorMessage = '⚠️ عذراً، تم تجاوز الحد المسموح. يرجى التواصل معنا مباشرة:\n📧 info@bloreagency.com\n📱 +20 120 294 4459';
                } else if (data.code === 'RATE_LIMIT') {
                    errorMessage = '⏳ عذراً، الكثير من الطلبات. يرجى الانتظار قليلاً والمحاولة مرة أخرى.';
                } else if (data.message) {
                    errorMessage = `عذراً، ${data.message}\n\nيمكنك التواصل معنا:\n📧 info@bloreagency.com\n📱 +20 120 294 4459`;
                }

                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: errorMessage,
                    },
                ]);
            }
        } catch (error) {
            console.error('Chatbot connection error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: '❌ عذراً، حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.\n\nأو تواصل معنا مباشرة:\n📧 info@bloreagency.com\n📱 +20 120 294 4459',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ display: isOpen ? 'none' : 'block' }}
            >
                <MessageCircle className="w-6 h-6" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">Blore AI Assistant</h3>
                                    <p className="text-white/80 text-xs">متصل الآن</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                            : 'bg-gray-800 text-gray-100'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 text-gray-100 p-3 rounded-2xl">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-gray-900 border-t border-gray-800">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="اكتب رسالتك..."
                                    className="bg-gray-800 border-gray-700 text-white flex-1"
                                    disabled={isLoading}
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
