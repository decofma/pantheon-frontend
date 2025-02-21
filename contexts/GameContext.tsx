// contexts/GameContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface GameContextType {
  token: string;
  setToken: (token: string) => void;
  gameState: any;
  setGameState: (state: any) => void;
  username: string;
  setUsername: (username: string) => void;
}

export const GameContext = createContext<GameContextType>({
  token: '',
  setToken: () => {},
  gameState: null,
  setGameState: () => {},
  username: '',
  setUsername: () => {},
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState('');
  const [gameState, setGameState] = useState(null);
  const [username, setUsernameState] = useState('');

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem('token', token);
  };

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem('username', name);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedUsername) {
      setUsernameState(storedUsername);
    }
  }, []);

  return (
    <GameContext.Provider value={{ token, setToken, gameState, setGameState, username, setUsername }}>
      {children}
    </GameContext.Provider>
  );
};
