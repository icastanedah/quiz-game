'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CodeExample, codeExamples } from '../data/codeExamples';

// Tipos
export type Player = {
  id: string;
  name: string;
  score: number;
  isDrawing: boolean;
};

export type GameStatus = 'waiting' | 'playing' | 'roundEnd' | 'gameEnd';

export type GameState = {
  players: Player[];
  currentPlayer: Player | null;
  currentExample: CodeExample | null;
  timeLeft: number;
  roundTime: number;
  status: GameStatus;
  correctGuess: boolean;
  round: number;
  totalRounds: number;
};

export type GameContextType = {
  gameState: GameState;
  currentUser: Player | null;
  setCurrentUser: (player: Player) => void;
  joinGame: (playerName: string) => void;
  startGame: () => void;
  endRound: () => void;
  makeGuess: (guess: string) => boolean;
  messages: { text: string; author: string; isCorrect?: boolean }[];
  sendMessage: (text: string, author: string, isCorrect?: boolean) => void;
};

// Valores por defecto
const defaultGameState: GameState = {
  players: [],
  currentPlayer: null,
  currentExample: null,
  timeLeft: 60,
  roundTime: 60,
  status: 'waiting',
  correctGuess: false,
  round: 0,
  totalRounds: 5,
};

// Creación del contexto
const GameContext = createContext<GameContextType | undefined>(undefined);

// Proveedor del contexto
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [currentUser, setCurrentUser] = useState<Player | null>(null);
  const [messages, setMessages] = useState<{ text: string; author: string; isCorrect?: boolean }[]>([]);
  
  // Temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (gameState.status === 'playing' && gameState.timeLeft > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (gameState.status === 'playing' && gameState.timeLeft === 0) {
      endRound();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.status, gameState.timeLeft]);
  
  // Funciones
  const joinGame = (playerName: string) => {
    if (gameState.status !== 'waiting') return;
    
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: playerName,
      score: 0,
      isDrawing: false,
    };
    
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
    
    setCurrentUser(newPlayer);
  };
  
  const startGame = () => {
    if (gameState.players.length < 2) {
      sendMessage('Se necesitan al menos 2 jugadores para comenzar', 'Sistema');
      return;
    }
    
    const shuffledPlayers = [...gameState.players]
      .sort(() => Math.random() - 0.5);
    
    const firstPlayer = shuffledPlayers[0];
    firstPlayer.isDrawing = true;
    
    const shuffledExamples = [...codeExamples]
      .sort(() => Math.random() - 0.5)
      .slice(0, gameState.totalRounds);
    
    setGameState(prev => ({
      ...prev,
      players: shuffledPlayers,
      currentPlayer: firstPlayer,
      currentExample: shuffledExamples[0],
      status: 'playing',
      timeLeft: prev.roundTime,
      round: 1,
    }));
    
    sendMessage(`¡El juego ha comenzado! ${firstPlayer.name} está explicando el código.`, 'Sistema');
  };
  
  const endRound = () => {
    setGameState(prev => ({
      ...prev,
      status: 'roundEnd',
    }));
    
    setTimeout(() => {
      // Seleccionar siguiente jugador y ejemplo
      const currentPlayerIndex = gameState.players.findIndex(p => p.isDrawing);
      const nextPlayerIndex = (currentPlayerIndex + 1) % gameState.players.length;
      
      const updatedPlayers = gameState.players.map((player, index) => ({
        ...player,
        isDrawing: index === nextPlayerIndex,
      }));
      
      const nextRound = gameState.round + 1;
      
      if (nextRound > gameState.totalRounds) {
        // Fin del juego
        setGameState(prev => ({
          ...prev,
          status: 'gameEnd',
        }));
        
        sendMessage('¡Fin del juego! Gracias por jugar.', 'Sistema');
      } else {
        // Siguiente ronda
        const nextExample = codeExamples.find(ex => 
          ex.id === String(nextRound)
        ) || codeExamples[0];
        
        setGameState(prev => ({
          ...prev,
          players: updatedPlayers,
          currentPlayer: updatedPlayers[nextPlayerIndex],
          currentExample: nextExample,
          timeLeft: prev.roundTime,
          status: 'playing',
          correctGuess: false,
          round: nextRound,
        }));
        
        sendMessage(`¡Ronda ${nextRound}! ${updatedPlayers[nextPlayerIndex].name} está explicando el código.`, 'Sistema');
      }
    }, 3000);
  };
  
  const makeGuess = (guess: string): boolean => {
    if (!gameState.currentExample) return false;
    
    // Verificar si la respuesta es correcta (comparación simple)
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedAnswer = gameState.currentExample.name.toLowerCase().trim();
    
    const isCorrect = normalizedGuess === normalizedAnswer;
    
    if (isCorrect && currentUser && !gameState.correctGuess) {
      // Actualizar puntuación
      const updatedPlayers = gameState.players.map(player => {
        if (player.id === currentUser.id) {
          return {
            ...player,
            score: player.score + 10,
          };
        }
        if (player.isDrawing) {
          return {
            ...player,
            score: player.score + 5,
          };
        }
        return player;
      });
      
      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        correctGuess: true,
      }));
      
      // Actualizar usuario actual si es necesario
      if (currentUser) {
        const updatedCurrentUser = updatedPlayers.find(p => p.id === currentUser.id);
        if (updatedCurrentUser) {
          setCurrentUser(updatedCurrentUser);
        }
      }
      
      sendMessage(`¡${currentUser.name} ha adivinado correctamente! Era: ${gameState.currentExample.name}`, 'Sistema');
      
      // Terminar la ronda después de una respuesta correcta
      setTimeout(endRound, 3000);
    }
    
    return isCorrect;
  };
  
  const sendMessage = (text: string, author: string, isCorrect?: boolean) => {
    if (gameState.status === 'playing' && author !== 'Sistema' && currentUser && !currentUser.isDrawing) {
      // Si es un mensaje del jugador durante el juego, verificar si es una respuesta
      const isGuessCorrect = makeGuess(text);
      setMessages(prev => [...prev, { text, author, isCorrect: isGuessCorrect }]);
    } else {
      setMessages(prev => [...prev, { text, author, isCorrect }]);
    }
  };
  
  return (
    <GameContext.Provider
      value={{
        gameState,
        currentUser,
        setCurrentUser,
        joinGame,
        startGame,
        endRound,
        makeGuess,
        messages,
        sendMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
}; 