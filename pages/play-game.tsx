// frontend/pages/play-game.tsx
import { useEffect, useContext, useState } from 'react';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const PlayGame = () => {
  const { setGameState, username } = useContext(GameContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [matchStatus, setMatchStatus] = useState('Procurando partida...');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const joinMatchmaking = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Tenta entrar na fila de matchmaking
        const res = await api.post('/matchmaking/join', {});
        
        // Se o jogo foi criado imediatamente
        if (res.data.game_id) {
          setGameState(res.data);
          router.push('/game');
          return;
        }

        // Configura polling para verificar status
        intervalId = setInterval(async () => {
          try {
            const statusRes = await api.get('/matchmaking/status');
            
            if (statusRes.data.game_id) {
              setGameState(statusRes.data);
              clearInterval(intervalId);
              router.push('/game');
            } else {
              setMatchStatus(statusRes.data.message || 'Aguardando adversário...');
            }
          } catch (err) {
            if (axios.isAxiosError(err)) {
              setError(err.response?.data?.detail || "Erro ao verificar status da partida");
            } else {
              setError("Erro desconhecido");
            }
            clearInterval(intervalId);
          }
        }, 3000);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || "Erro ao entrar na fila de matchmaking");
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    joinMatchmaking();

    // Limpeza ao desmontar o componente
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [router, setGameState, username]);

  const handleCancel = async () => {
    try {
      await api.post('/match/leave');
      router.push('/menu');
    } catch (err) {
      console.error("Erro ao cancelar busca", err);
    }
  };

  if (error) {
    return (
      <div className="container">
        <h1>Erro</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button className="btn" onClick={() => router.push('/menu')}>
          Voltar ao Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Matchmaking</h1>
      {loading ? (
        <div>Conectando ao servidor...</div>
      ) : (
        <>
          <p>{matchStatus}</p>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn" onClick={handleCancel}>
              Cancelar Busca
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayGame;