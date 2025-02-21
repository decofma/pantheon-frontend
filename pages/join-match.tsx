// pages/join-match.tsx
import { useState, useContext } from 'react';
import api from '@/services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const JoinMatch = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { token, setGameState } = useContext(GameContext);
  const router = useRouter();

  const handleJoinMatch = async () => {
    try {
      const res = await api.post(`/match/join`, { room_id: roomId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGameState(res.data);
      if (res.data.status === 'started') {
        router.push('/game');
      } else {
        router.push('/lobby');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao entrar na sala');
    }
  };

  return (
    <div className="container">
      <h1>Join Match</h1>
      <input
        type="text"
        placeholder="Room ID (4 dígitos)"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinMatch}>Entrar na Sala</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JoinMatch;
