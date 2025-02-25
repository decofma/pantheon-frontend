// frontend/components/GameBoard.tsx
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import api from "../services/api";
import axios from "axios";
import { motion } from "framer-motion";
import router from "next/router";

const GameBoard = () => {
  const { gameState, setGameState, username } = useContext(GameContext);
  const [cardsMapping, setCardsMapping] = useState<
    Record<
      number,
      {
        nome: number;
        poder: number;
        efeito: string;
        atributo: string;
        custo_fe: number;
        mitologia: string;
        categoria: string;
      }
    >
  >({});
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Buscar os detalhes das cartas do backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get("/cards");
        setCardsMapping(res.data);
      } catch (error) {
        console.error("Error fetching cards mapping:", error);
      }
    };
    fetchCards();
  }, []);

  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId);
  };

  const submitInvocation = async () => {
    if (!selectedCard) {
      alert("Selecione uma carta para invocar.");
      return;
    }
    try {
      const move = {
        phase: "invocation",
        selected_card: selectedCard,
      };
      const res = await api.post(`/game/${gameState.game_id}/move`, move);
      setGameState(res.data);
      setSelectedCard(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error submitting move:", err.response?.data?.detail);
      } else {
        console.error("Unknown error submitting move");
      }
    }
  };
  useEffect(() => {
    if (!gameState?.players?.includes(username)) {
      router.push('/menu');
    }
  }, [gameState, username, router]);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/game/${gameState.game_id}/state`);
        setGameState(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Error fetching game state:",
            err.response?.data?.detail
          );
        } else {
          console.error("Unknown error fetching game state");
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [gameState, setGameState]);

  return (
    <div className="game-board">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Turno: {gameState.turn}</h2>
        <div>
          {gameState?.log?.map((entry: string, index: number) => (
            <p key={index}>{entry}</p>
          )) || <p>Nenhum log disponível</p>}
        </div>
        <div>
          <h3>Sua mão:</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {gameState?.hand?.[username]?.map(
              (cardId: number, index: number) => {
                const details = cardsMapping[cardId];
                if (!details) return null;
                return (
                  <div
                    key={index}
                    style={{
                      border:
                        selectedCard === cardId
                          ? "2px solid #0070f3"
                          : "1px solid #ccc",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      minWidth: "120px",
                    }}
                    onClick={() => handleCardClick(cardId)}
                  >
                    <p>{details.nome}</p>
                    <p>Custo: {details.custo_fe}</p>
                    <p>Motologia: {details.mitologia}</p>
                    <p>Tipo: {details.categoria}</p>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <button className="btn" onClick={submitInvocation}>
          Enviar Invocação
        </button>
      </motion.div>
    </div>
  );
};

export default GameBoard;
