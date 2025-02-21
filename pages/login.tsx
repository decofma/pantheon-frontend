// pages/login.tsx
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GameContext } from "../contexts/GameContext";
import api from "@/services/api";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { setToken, setUsername } = useContext(GameContext);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
      router.push("/menu");
    }
  }, [router, setToken, setUsername]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `/auth/login`,
        new URLSearchParams({
          username: usernameInput,
          password,
        })
      );
      const token = res.data.access_token;
      setToken(token);
      setUsername(usernameInput);
      localStorage.setItem("token", token);
      localStorage.setItem("username", usernameInput);
      router.push("/menu");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Erro para criar conta' );
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login; 