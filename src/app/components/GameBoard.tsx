'use client';

import React from 'react';
import { useGame } from '../context/GameContext';
import WaitingRoom from './WaitingRoom';
import GameRoom from './GameRoom';
import GameResults from './GameResults';

const GameBoard: React.FC = () => {
  const { gameState } = useGame();
  
  // Renderizar diferentes componentes según el estado del juego
  const renderGameContent = () => {
    switch (gameState.status) {
      case 'waiting':
        return <WaitingRoom />;
      case 'playing':
      case 'roundEnd':
        return <GameRoom />;
      case 'gameEnd':
        return <GameResults />;
      default:
        return <WaitingRoom />;
    }
  };
  
  return (
    <div className="flex flex-col">
      {renderGameContent()}
    </div>
  );
};

export default GameBoard; 