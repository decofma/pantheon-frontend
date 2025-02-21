// pages/menu.tsx
import { useRouter } from 'next/router';
import AccountMenu from '../components/AccountMenu';

const Menu = () => {
  const router = useRouter();

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Menu</h1>
        <AccountMenu />
      </header>
      <button onClick={() => router.push('/play-game')}>Play Game</button>
      <button onClick={() => router.push('/create-match')}>Create Match</button>
      <button onClick={() => router.push('/join-match')}>Join Match</button>
    </div>
  );
};

export default Menu;
