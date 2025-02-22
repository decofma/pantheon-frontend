// pages/menu.tsx
import { useRouter } from 'next/router';
import AccountMenu from '../components/AccountMenu';

const Menu = () => {
  const router = useRouter();

  return (
    <div className="container">
      <header>
        <h1>Menu</h1>
        <AccountMenu />
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn" onClick={() => router.push('/play-game')}>Play Game</button>
        <button className="btn" onClick={() => router.push('/create-match')}>Create Match</button>
        <button className="btn" onClick={() => router.push('/join-match')}>Join Match</button>
      </div>
    </div>
  );
};

export default Menu;
