import React from 'react';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <GameProvider>
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center my-6">Code Skribbl: Code Smells & Design Patterns</h1>
          <GameBoard />
        </main>
      </GameProvider>
    </div>
  );
}
