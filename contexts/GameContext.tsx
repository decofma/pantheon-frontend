import React, { createContext, useState, ReactNode } from 'react';

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
  const [token, setToken] = useState('');
  const [gameState, setGameState] = useState(null);

  return (
    <GameContext.Provider value={{ token, setToken, gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
