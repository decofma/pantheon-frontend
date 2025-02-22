// pages/game.tsx
import { useEffect, useContext, useState } from 'react';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import GameBoard from '../components/GameBoard';
import { useRouter } from 'next/router';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const res = await api.get(`/game/${gameState.game_id}/state`);
        setGameState(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game state", error);
      }
    };
    if (gameState) fetchGameState();
  }, [gameState, setGameState]);

  const handleLeave = async () => {
    try {
      await api.post('/match/leave');
      setGameState(null);
      router.push('/menu');
    } catch (error) {
      console.error("Erro ao abandonar a partida", error);
    }
  };

  if (loading) return <div>Aguardando adversário...</div>;

  return (
    <div className="container">
      <h1>Jogo em Andamento</h1>
      <GameBoard />
      <button className="btn" onClick={handleLeave}>Abandonar Partida</button>
    </div>
  );
};

export default Game;
