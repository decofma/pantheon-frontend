import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import GameBoard from '../components/GameBoard';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const res = await api.get(`/game/${gameState.game_id}/state`);
        setGameState(res.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Error fetching game state:", err.response?.data?.detail);
        } else {
          console.error("Unknown error fetching game state");
        }
      }
    };
    if (gameState) fetchGameState();
  }, [gameState, setGameState]);

  if (loading) return <div>Aguardando adversário...</div>;

  return (
    <div>
      <h1>Jogo em Andamento</h1>
      <GameBoard />
    </div>
  );
};

export default Game;
