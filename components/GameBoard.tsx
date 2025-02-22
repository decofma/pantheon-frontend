// components/GameBoard.tsx
import { useContext, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import axios from 'axios';
import api from '../services/api';
import { motion } from 'framer-motion';

const GameBoard = () => {
  const { gameState, setGameState } = useContext(GameContext);
  
  const submitMove = async () => {
    try {
      const move = {
        move_type: "atacar", // Exemplo – ajuste conforme necessário
        data: { damage: 3 }
      };
      const res = await api.post(`/game/${gameState.game_id}/move`, move);
      setGameState(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error submitting move:", err.response?.data?.detail);
      } else {
        console.error("Unknown error submitting move");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/game/${gameState.game_id}/state`);
        setGameState(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Error fetching game state:", err.response?.data?.detail);
        } else {
          console.error("Unknown error fetching game state");
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [gameState, setGameState]);

  return (
    <div className="game-board">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2>Turno: {gameState.turn}</h2>
        <div>
          {gameState?.log?.map((entry: string, index: number) => (
            <p key={index}>{entry}</p>
          )) || <p>Nenhum log disponível</p>}
        </div>
        <button className="btn" onClick={submitMove}>Enviar Jogada</button>
      </motion.div>
    </div>
  );
};

export default GameBoard;
