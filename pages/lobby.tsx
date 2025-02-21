// pages/lobby.tsx
import { useEffect, useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const Lobby = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>(gameState?.players || []);

  useEffect(() => {
    // Simula polling para verificar se a sala já está completa
    const interval = setInterval(() => {
      if (gameState && gameState.status === 'started') {
        // A sala foi preenchida e o jogo iniciou
        router.push('/game');
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [gameState, router]);

  return (
    <div className="container">
      <h1>Lobby</h1>
      <h2>Sala: {gameState?.room_id}</h2>
      <h3>Jogadores:</h3>
      <ul>
        {gameState?.players?.map((player: string, index: number) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <p>Aguardando o segundo jogador...</p>
    </div>
  );
};

export default Lobby;
