import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GameContext } from '../contexts/GameContext';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(GameContext);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', new URLSearchParams({
        username,
        password
      }));
      setToken(res.data.access_token);
      router.push('/game');
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
