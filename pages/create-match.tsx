import { useState, useContext } from 'react';
import axios from 'axios';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const CreateMatch = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { setGameState } = useContext(GameContext);
  const router = useRouter();

  const handleCreateMatch = async () => {
    try {
      const res = await api.post('/match/create', { room_id: roomId });
      setGameState(res.data);
      router.push('/lobby');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Erro ao criar sala');
      } else {
        setError('Erro desconhecido');
      }
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
