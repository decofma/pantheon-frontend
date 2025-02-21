// frontend/pages/play-game.tsx
import { useEffect, useContext, useState } from 'react';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const PlayGame = () => {
  const { setGameState } = useContext(GameContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await api.post('/matchmaking/join', {});
        if (res.data.game_id) {
          // Partida criada, redireciona para /game
          setGameState(res.data);
          setLoading(false);
          router.push('/game');
        } else {
          // Se não houver partida, exibe mensagem de espera
          setWaiting(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar partida", error);
      }
    };
    fetchMatch();
  }, [router, setGameState]);

  if (loading) return <div>Procurando partida...</div>;
  if (waiting) return <div>Esperando por um adversário...</div>;
  return <div>Match encontrada!</div>;
};

export default PlayGame;
