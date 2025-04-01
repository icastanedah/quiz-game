'use client';

import React from 'react';
import { useGame } from '../context/GameContext';

const GameResults: React.FC = () => {
  const { gameState } = useGame();
  
  // Ordenar jugadores por puntuación
  const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="bg-slate-800 rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">¡Fin del juego!</h2>
      
      <div className="bg-slate-700 rounded-lg p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Clasificación final</h3>
        
        <div className="space-y-3">
          {sortedPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={`flex items-center p-3 rounded ${
                index === 0 ? 'bg-yellow-800/30 border border-yellow-600' : 'bg-slate-800'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-600 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-lg">{player.name}</h4>
              </div>
              <div className="text-xl font-bold">{player.score} pts</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
};

export default GameResults; 