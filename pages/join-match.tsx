// pages/join-match.tsx
import { useState, useContext } from 'react';
import axios from 'axios';
import api from '../services/api';
import { GameContext } from '../contexts/GameContext';
import { useRouter } from 'next/router';

const JoinMatch = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { setGameState } = useContext(GameContext);
  const router = useRouter();

  const handleJoinMatch = async () => {
    try {
      const res = await api.post('/match/join', { room_id: roomId });
      
      if (res.data.status === 'started' && res.data.game_state) {
        setGameState(res.data.game_state);
        router.push('/game');
      } else {
        setGameState(res.data);
        router.push('/lobby');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Erro ao entrar na sala');
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return (
    <div className="container">
      <h1>Join Match</h1>
      <input
        className="input"
        type="text"
        placeholder="Room ID (4 dígitos)"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      />
      <button className="btn" onClick={handleJoinMatch}>Entrar na Sala</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JoinMatch;
