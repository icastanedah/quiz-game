'use client';

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import CodeViewer from './CodeViewer';
import ChatBox from './ChatBox';
import Timer from './Timer';
import PlayerList from './PlayerList';

const GameRoom: React.FC = () => {
  const { gameState, currentUser, makeGuess } = useGame();
  const isDrawing = currentUser?.id === gameState.currentPlayer?.id;
  const [guess, setGuess] = useState('');
  const isSinglePlayer = gameState.players.length === 1;
  
  const handleSubmitGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim() && isSinglePlayer) {
      const isCorrect = makeGuess(guess.trim());
      // Dar retroalimentación inmediata en modo un solo jugador
      if (isCorrect) {
        setGuess('');
      }
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sección izquierda: información del juego */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Ronda {gameState.round}/{gameState.totalRounds}</h3>
          <Timer timeLeft={gameState.timeLeft} totalTime={gameState.roundTime} />
          
          <div className="mt-4">
            <h4 className="font-medium text-slate-300">Jugador:</h4>
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
              {isSinglePlayer ? (
                <span>Identifica el code smell o patrón de diseño</span>
              ) : isDrawing ? (
                <span>Explica este código: <span className="text-yellow-400">{gameState.currentExample?.name}</span></span>
              ) : (
                <span>Adivina el code smell o patrón de diseño</span>
              )}
            </h3>
          </div>
          
          {isDrawing && !isSinglePlayer && (
            <div className="mb-4 p-3 bg-yellow-800/30 border border-yellow-600 rounded">
              <p className="font-medium">Eres el explicador. Debes dar pistas sobre el code smell o patrón de diseño sin mencionarlo directamente.</p>
              
              <div className="mt-2 bg-slate-700/50 p-2 rounded">
                <p className="text-sm">Pista: {gameState.currentExample?.hint}</p>
              </div>
            </div>
          )}

          {isSinglePlayer && (
            <div className="mb-4 p-3 bg-blue-800/30 border border-blue-600 rounded">
              <p className="font-medium">¡Modo un jugador! Identifica el code smell o patrón de diseño representado en el código.</p>
              
              <div className="mt-2 bg-slate-700/50 p-2 rounded">
                <p className="text-sm">Pista: {gameState.currentExample?.hint}</p>
              </div>
              
              <form onSubmit={handleSubmitGuess} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  className="flex-grow p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={gameState.status === 'roundEnd'}
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
          )}
          
          <CodeViewer code={gameState.currentExample?.code || ''} />
        </div>
        
        {/* Chat - Solo mostrar si hay más de un jugador */}
        {!isSinglePlayer && <ChatBox isDrawing={isDrawing} />}
      </div>
    </div>
  );
};

export default GameRoom; 