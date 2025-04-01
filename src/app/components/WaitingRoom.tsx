'use client';

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const WaitingRoom: React.FC = () => {
  const { gameState, joinGame, startGame, currentUser } = useGame();
  const [playerName, setPlayerName] = useState('');
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      joinGame(playerName.trim());
      setPlayerName('');
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-slate-800 rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Sala de espera</h2>
      
      {!currentUser ? (
        <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium mb-1">
              Tu nombre
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors"
          >
            Unirse al juego
          </button>
        </form>
      ) : (
        <>
          <div className="w-full max-w-md">
            <h3 className="text-xl mb-3">Jugadores ({gameState.players.length}):</h3>
            <ul className="bg-slate-700 rounded p-3 space-y-2">
              {gameState.players.map((player) => (
                <li key={player.id} className="flex justify-between items-center">
                  <span>{player.name} {player.id === currentUser.id ? '(Tú)' : ''}</span>
                  <span className="text-sm text-slate-400">Puntuación: {player.score}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-3 items-center">
            <p className="text-slate-300">
              {gameState.players.length < 2 
                ? 'Se necesitan al menos 2 jugadores para comenzar.' 
                : 'Listo para empezar!'}
            </p>
            <button
              onClick={startGame}
              disabled={gameState.players.length < 2}
              className={`px-6 py-3 rounded-lg font-bold text-lg ${
                gameState.players.length < 2
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Comenzar juego
            </button>
          </div>
        </>
      )}
      
      <div className="mt-6 p-4 bg-slate-700 rounded w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-2">¿Cómo jugar?</h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-300">
          <li>En cada ronda, un jugador verá un ejemplo de código con un code smell o patrón de diseño.</li>
          <li>Ese jugador debe explicar o dar pistas sobre qué concepto representa, sin usar el nombre exacto.</li>
          <li>Los demás jugadores intentan adivinar el término correcto.</li>
          <li>El primero en adivinar gana 10 puntos, y el explicador gana 5 puntos.</li>
          <li>¡Gana quien más puntos acumule al final!</li>
        </ol>
      </div>
    </div>
  );
};

export default WaitingRoom; 