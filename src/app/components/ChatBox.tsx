'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

interface ChatBoxProps {
  isDrawing: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ isDrawing }) => {
  const { messages, sendMessage, gameState, currentUser } = useGame();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll a los mensajes más recientes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && currentUser) {
      sendMessage(messageText.trim(), currentUser.name);
      setMessageText('');
    }
  };
  
  return (
    <div className="bg-slate-800 rounded-lg flex flex-col h-[400px]">
      <div className="p-3 border-b border-slate-700">
        <h3 className="font-bold">
          {isDrawing ? 'Chat (Da pistas sin revelar la respuesta)' : 'Chat (Adivina el concepto)'}
        </h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-3">
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-2 rounded max-w-[80%] ${
                msg.author === 'Sistema' 
                  ? 'bg-slate-700 mx-auto text-center'
                  : msg.author === currentUser?.name
                    ? 'bg-blue-800/40 ml-auto'
                    : 'bg-slate-700'
              } ${msg.isCorrect && 'bg-green-800/50 border border-green-600'}`}
            >
              {msg.author !== 'Sistema' && (
                <div className="font-bold text-xs mb-1">
                  {msg.author}
                </div>
              )}
              <div className={`${msg.author === 'Sistema' ? 'text-slate-300 text-sm' : ''}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-3 border-t border-slate-700">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={isDrawing ? "Escribe pistas aquí..." : "Adivina aquí..."}
            disabled={gameState.status === 'roundEnd'}
            className="flex-grow p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={gameState.status === 'roundEnd'}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox; 