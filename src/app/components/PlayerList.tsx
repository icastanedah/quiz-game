'use client';

import React from 'react';
import { useGame } from '../context/GameContext';

const PlayerList: React.FC = () => {
  const { gameState, currentUser } = useGame();
  
  // Ordenar jugadores por puntuación
  const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Jugadores</h3>
      
      <div className="space-y-2">
        {sortedPlayers.map((player) => (
          <div 
            key={player.id} 
            className={`flex justify-between items-center p-2 rounded ${
              player.isDrawing 
                ? 'bg-blue-800/30 border border-blue-600' 
                : player.id === currentUser?.id 
                  ? 'bg-slate-700'
                  : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${player.isDrawing ? 'bg-blue-500' : 'bg-slate-500'}`}></div>
              <span>
                {player.name} 
                {player.id === currentUser?.id && ' (Tú)'}
                {player.isDrawing && ' (Explicando)'}
              </span>
            </div>
            <span className="font-bold">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList; 