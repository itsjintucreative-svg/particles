import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am your Standard Model Assistant. Ask me anything about quarks, forces, or the nature of the universe.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    // Initialize empty model message
    setMessages(prev => [...prev, {
      id: modelMsgId,
      role: 'model',
      text: '',
      timestamp: Date.now()
    }]);

    let fullResponse = "";

    await streamChatResponse(
      messages, // Pass history excluding the new user message (logic inside service handles structure, but for simplicity we pass current state)
      input,
      (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg
        ));
      }
    );

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800 p-4 flex items-center gap-3 border-b border-slate-700">
        <div className="p-2 bg-indigo-500 rounded-lg">
           <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">Quantum Assistant</h3>
          <p className="text-xs text-indigo-300 flex items-center gap-1">
            <Sparkles size={10} /> Powered by Gemini
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] rounded-2xl p-4 
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}
            `}>
              {msg.role === 'model' ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1 items-center">
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the Higgs Boson..."
          className="flex-1 bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-500"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
