import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, AlertCircle, RefreshCw } from 'lucide-react';
import { bodyCareApi } from '../../services/api.js';

const QUICK_QUESTIONS = [
  'Can I continue light walking or cardio?',
  'How many minutes should I apply heat/cold?',
  'What sleeping position is best for this pain?',
  'What red flags mean I should see a doctor immediately?'
];

export default function BodyCareFollowUpChat({
  assessmentId,
  bodyPart,
  symptoms,
  guidance,
  chatMessages,
  setChatMessages
}) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  const handleSend = async (messageToSend) => {
    const text = (messageToSend || inputText).trim();
    if (!text || loading) return;

    setInputText('');
    setError(null);

    // Optimistically add user message
    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...chatMessages, userMsg];
    setChatMessages(updatedHistory);
    setLoading(true);

    try {
      const response = await bodyCareApi.chat({
        assessmentId: assessmentId || null,
        bodyPart,
        symptoms,
        guidance,
        message: text,
        chatHistory: updatedHistory
      });

      if (response && response.reply) {
        const aiMsg = {
          role: 'assistant',
          content: response.reply,
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('No reply received from AI service.');
      }
    } catch (err) {
      console.error('Follow-up chat error:', err);
      setError(err.message || 'AI guidance service is temporarily unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-fit-surface border border-fit-border rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fit-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fit-primary/30 to-teal-500/20 border border-fit-primary/40 flex items-center justify-center text-fit-primary shadow-lg shadow-fit-primary/10">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-fit-text flex items-center gap-2">
              BodyCare AI Follow-Up
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-[10px] font-bold text-teal-600 dark:text-teal-300">
                Context Active
              </span>
            </h3>
            <p className="text-xs text-fit-muted">
              Ask questions about your {bodyPart} recovery plan, modifications, or precautions.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      {chatMessages.length === 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-fit-muted flex items-center gap-1.5">
            <Sparkles size={14} className="text-fit-primary" /> Suggested Questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={loading}
                className="px-3 py-2 rounded-xl bg-fit-surface2 hover:bg-fit-surface border border-fit-border hover:border-fit-primary/40 text-xs text-fit-muted hover:text-fit-text transition-all text-left flex items-center gap-2 shadow-sm"
              >
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8 text-fit-muted text-sm">
            No questions asked yet. Ask anything regarding exercises to avoid, heating pad usage, or general recovery!
          </div>
        ) : (
          chatMessages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-500 shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-fit-primary text-white font-semibold rounded-tr-none shadow-glow'
                      : 'bg-fit-surface2 border border-fit-border text-fit-text rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-fit-surface2 border border-fit-border flex items-center justify-center text-fit-text shrink-0 mt-1">
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* AI Typing Indicator */}
        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-500 shrink-0 animate-pulse">
              <Bot size={16} />
            </div>
            <div className="bg-fit-surface2 border border-fit-border rounded-2xl rounded-tl-none p-4 text-xs text-fit-muted flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin text-fit-primary" />
              BodyCare AI is analyzing your recovery query...
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-500 flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a follow-up question (e.g., Should I rest or stretch today?)..."
          disabled={loading}
          className="flex-1 bg-fit-surface2 border border-fit-border rounded-2xl px-4 py-3.5 text-sm text-fit-text placeholder:text-fit-muted focus:outline-none focus:border-fit-primary transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="p-3.5 bg-fit-primary hover:brightness-105 text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center shadow-glow"
          title="Send follow-up question"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
