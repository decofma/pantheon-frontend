import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface GameContextType {
  token: string;
  setToken: (token: string) => void;
  gameState: any;
  setGameState: (state: any) => void;
}

export const GameContext = createContext<GameContextType>({
  token: '',
  setToken: () => {},
  gameState: null,
  setGameState: () => {}
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState('');
  const [gameState, setGameState] = useState(null);

  // Função para atualizar o token e salvar no localStorage
  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem("token", token);
  };

  // Ao montar, verifica se existe um token salvo
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  return (
    <GameContext.Provider value={{ token, setToken, gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
