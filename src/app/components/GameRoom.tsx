'use client';

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import CodeViewer from './CodeViewer';
import ChatBox from './ChatBox';
import Timer from './Timer';
import PlayerList from './PlayerList';

const GameRoom: React.FC = () => {
  const { gameState, currentUser } = useGame();
  const isDrawing = currentUser?.id === gameState.currentPlayer?.id;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sección izquierda: información del juego */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Ronda {gameState.round}/{gameState.totalRounds}</h3>
          <Timer timeLeft={gameState.timeLeft} totalTime={gameState.roundTime} />
          
          <div className="mt-4">
            <h4 className="font-medium text-slate-300">Explicando:</h4>
            <p className="text-lg font-semibold">{gameState.currentPlayer?.name}</p>
          </div>
          
          {gameState.status === 'roundEnd' && (
            <div className="mt-4 p-3 bg-green-800/40 border border-green-600 rounded-md">
              <p className="font-medium">¡Fin de la ronda!</p>
              <p>La respuesta era: <span className="font-bold">{gameState.currentExample?.name}</span></p>
            </div>
          )}
        </div>
        
        <PlayerList />
      </div>
      
      {/* Sección central: código y chat */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        {/* Visor de código */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">
              {isDrawing ? (
                <span>Explica este código: <span className="text-yellow-400">{gameState.currentExample?.name}</span></span>
              ) : (
                <span>Adivina el code smell o patrón de diseño</span>
              )}
            </h3>
          </div>
          
          {isDrawing && (
            <div className="mb-4 p-3 bg-yellow-800/30 border border-yellow-600 rounded">
              <p className="font-medium">Eres el explicador. Debes dar pistas sobre el code smell o patrón de diseño sin mencionarlo directamente.</p>
              
              <div className="mt-2 bg-slate-700/50 p-2 rounded">
                <p className="text-sm">Pista: {gameState.currentExample?.hint}</p>
              </div>
            </div>
          )}
          
          <CodeViewer code={gameState.currentExample?.code || ''} />
        </div>
        
        {/* Chat */}
        <ChatBox isDrawing={isDrawing} />
      </div>
    </div>
  );
};

export default GameRoom; 