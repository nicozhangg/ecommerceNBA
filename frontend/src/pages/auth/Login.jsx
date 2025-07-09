import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../features/user/context/UserContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password); // Llama a la función de inicio de sesión del contexto
    if (success) {
      setMessage('¡Inicio de sesión exitoso! Redirigiendo a la página principal...');
      console.log('Inicio de sesión exitoso');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setMessage('Credenciales incorrectas. Inténtalo de nuevo.');
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

        {message && <p className="message">{message}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Iniciar Sesión</button>

        <p className="register-text">
          ¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
