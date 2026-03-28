'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { quickActions } from '@/lib/chat-constants';
import { useGameStore } from '@/lib/game-store';
import { XPBar } from './xp-bar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const trackChat = useGameStore((s) => s.trackChat);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const userMessage: Message = { role: 'user', content: content.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');
      setIsStreaming(true);
      trackChat();

      // Add placeholder for assistant
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (res.status === 429) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: "You're sending messages too fast! Please wait a moment and try again.",
            };
            return updated;
          });
          setIsStreaming(false);
          return;
        }

        if (!res.ok) throw new Error('Failed to get response');

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error('No reader');

        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: 'assistant',
                      content: fullContent,
                    };
                    return updated;
                  });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: "Sorry, I couldn't connect right now. Please try again or use the contact form below!",
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming, trackChat]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-400/20 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 text-deep" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-green animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9990] w-[min(400px,calc(100vw-3rem))] h-[min(560px,calc(100dvh-3rem))] flex flex-col rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40"
            style={{
              background: 'linear-gradient(135deg, rgba(10,10,27,0.97) 0%, rgba(5,5,16,0.99) 100%)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">Transmute AI</h3>
                    <p className="text-[10px] text-accent-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-text-muted" />
                </button>
              </div>
              <XPBar />
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/10 to-amber-400/5 flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-amber-400/60" />
                  </div>
                  <p className="text-sm text-text-secondary mb-1">
                    Hi! I&apos;m the Transmute Labs AI.
                  </p>
                  <p className="text-xs text-text-muted mb-6">
                    Ask me anything about our services, team, or how AI can help your business.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMessage(action)}
                        className="px-3 py-1.5 rounded-full text-[11px] bg-white/[0.04] border border-white/[0.08] text-text-secondary hover:text-amber-400 hover:border-amber-400/20 transition-all cursor-pointer"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-accent-blue/15'
                        : 'bg-amber-400/15'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-3.5 h-3.5 text-accent-blue" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent-blue/10 text-text-primary rounded-tr-md'
                        : 'bg-white/[0.04] text-text-secondary rounded-tl-md'
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 animate-pulse [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 animate-pulse [animation-delay:0.4s]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-3 pt-0">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-3" />
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  maxLength={500}
                  disabled={isStreaming}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-amber-400/30 focus:border-amber-400/20 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-deep" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
