import { useContext, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import api from '../services/api';

const GameBoard = () => {
  const { token, gameState, setGameState } = useContext(GameContext);
  
  const submitMove = async () => {
    try {
      const move = {
        move_type: "atacar", // Exemplo – altere conforme a jogada desejada
        data: { damage: 3 }
      };
      const res = await api.post(`/game/${gameState.game_id}/move`, move, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGameState(res.data);
    } catch (error) {
      console.error("Error submitting move", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/game/${gameState.game_id}/state`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGameState(res.data);
      } catch (error) {
        console.error("Error fetching game state", error);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [gameState, token]);

  return (
    <div className="game-board">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2>Turno: {gameState.turn}</h2>
        <div>
          {gameState.log.map((entry: string, index: number) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
        <button onClick={submitMove}>Enviar Jogada</button>
      </motion.div>
    </div>
  );
};

export default GameBoard;
