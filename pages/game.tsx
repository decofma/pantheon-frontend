import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { GameContext } from '../contexts/GameContext';
import GameBoard from '../components/GameBoard';

const Game = () => {
  const { token, 
    // gameState, 
    setGameState } = useContext(GameContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinMatchmaking = async () => {
      try {
        const res = await axios.post('/matchmaking/join', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGameState(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error joining matchmaking", error);
      }
    }
    joinMatchmaking();
  }, [token]);

  if (loading) return <div>Procurando adversário...</div>;

  return (
    <div>
      <h1>Jogo em Andamento</h1>
      <GameBoard />
    </div>
  )
}

export default Game;
