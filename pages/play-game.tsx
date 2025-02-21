// pages/play-game.tsx
import { useEffect, useContext, useState } from 'react';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const PlayGame = () => {
  const { token, setGameState } = useContext(GameContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await api.post(`/matchmaking/join`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGameState(res.data);
        setLoading(false);
        router.push('/game');
      } catch (error) {
        console.error("Erro ao buscar partida", error);
      }
    };
    fetchMatch();
  }, [token]);

  if (loading) return <div>Procurando partida...</div>;

  return <div>Match encontrada!</div>;
};

export default PlayGame;
