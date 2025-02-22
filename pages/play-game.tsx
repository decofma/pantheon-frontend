// frontend/pages/play-game.tsx
import { useEffect, useContext, useState } from 'react';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const PlayGame = () => {
  const { setGameState } = useContext(GameContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await api.post('/matchmaking/join', {});
        if (res.data.game_id) {
          setGameState(res.data);
          setLoading(false);
          router.push('/game');
        } else {
          const interval = setInterval(async () => {
            try {
              const statusRes = await api.get('/matchmaking/status');
              if (statusRes.data.game_id) {
                setGameState(statusRes.data);
                clearInterval(interval);
                router.push('/game');
              }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                  setError(err.response?.data?.detail || "Erro ao entrar na sala");
                } else {
                  setError("Erro desconhecido");
                }
              }
          }, 3000);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar partida", error);
      }
    };
    fetchMatch();
  }, [router, setGameState]);

  if (loading) return <div>Procurando partida...</div>;
  if (error) return <div>{error}</div>;
  return <div>Esperando por um adversário...</div>;
};

export default PlayGame;
