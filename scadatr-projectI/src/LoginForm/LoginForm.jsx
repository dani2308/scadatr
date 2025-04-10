// LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import scadatr_logo from "../../assets/scadatr_logo.png";

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-form-page");
    return () => document.body.classList.remove("login-form-page");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Utilizador ou Palavra-Passe Incorretos");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access_token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <img src={scadatr_logo} alt="Logo" className="logo" />
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Utilizador"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Palavra-Passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="remember-me">
          <label>
            <input type="checkbox" /> Mantenha a sessão iniciada
          </label>
        </div>
        <button type="submit">Login</button>
        <div className="forgot-password">
          <a href="#">Esqueceu-se da Palavra-Passe?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
