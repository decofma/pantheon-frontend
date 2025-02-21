// pages/create-match.tsx
import { useState, useContext } from 'react';
import api from '@/services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const CreateMatch = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { token, setGameState } = useContext(GameContext);
  const router = useRouter();

  const handleCreateMatch = async () => {
    try {
      const res = await api.post(`/match/create`, { room_id: roomId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGameState(res.data);
      router.push('/lobby');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar sala');
    }
  };

  return (
    <div className="container">
      <h1>Create Match</h1>
      <input
        type="text"
        placeholder="Room ID (4 dígitos)"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      />
      <button onClick={handleCreateMatch}>Criar Sala</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateMatch;
