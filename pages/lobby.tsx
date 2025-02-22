// pages/lobby.tsx
import { useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';
import api from '../services/api';

const Lobby = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (gameState && gameState.status === 'started') {
          router.push('/game');
        }
      } catch (error) {
        console.error("Erro ao consultar status da sala", error);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [gameState, router]);

  const handleLeave = async () => {
    try {
      await api.post('/match/leave');
      setGameState(null);
      router.push('/menu');
    } catch (error) {
      console.error("Erro ao abandonar a partida", error);
    }
  };

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
      <button className="btn" onClick={handleLeave}>Abandonar Partida</button>
    </div>
  );
};

export default Lobby;
