import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const PlayGame = () => {
  const { setGameState } = useContext(GameContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await api.post('/matchmaking/join', {});
        setGameState(res.data);
        setLoading(false);
        router.push('/game');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Erro ao buscar partida:", err.response?.data?.detail);
        } else {
          console.error("Erro desconhecido ao buscar partida");
        }
      }
    };
    fetchMatch();
  }, [router, setGameState]);

  if (loading) return <div>Procurando partida...</div>;

  return <div>Match encontrada!</div>;
};

export default PlayGame;
