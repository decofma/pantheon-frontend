// pages/menu.tsx
import { GameContext } from '@/contexts/GameContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const Menu = () => {
  const router = useRouter();
  const { token, setGameState } = useContext(GameContext);

  return (
    <div className="container">
      <h1>Menu</h1>
      <button onClick={() => router.push('/play-game')}>Play Game</button>
      <button onClick={() => router.push('/create-match')}>Create Match</button>
      <button onClick={() => router.push('/join-match')}>Join Match</button>
      <button onClick={() =>  console.log("Token:", token)}>Test</button>
    </div>
  );
};

export default Menu;
