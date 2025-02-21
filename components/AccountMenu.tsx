// components/AccountMenu.tsx
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GameContext } from '../contexts/GameContext';

const AccountMenu = () => {
  const { username, setToken, setUsername } = useContext(GameContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleToggle = () => setOpen(!open);

  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        <span role="img" aria-label="user">👤</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '4px',
          zIndex: 10,
        }}>
          <p>{username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
