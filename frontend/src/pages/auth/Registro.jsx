import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../features/user/context/UserContext'; // Importar el contexto de usuario
import './Registro.css';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // Estado para manejar errores

    const { users, addUser } = useContext(UserContext); // Accede a la lista de usuarios
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar si el correo ya está registrado
        const userExists = users.some((user) => user.email === email);
        if (userExists) {
            setError('El correo electrónico ya está registrado. Intenta con otro.');
            return;
        }

        // Crear el nuevo usuario
        const newUser = { nombre, apellido, email, password, role };
        addUser(newUser);
        setMessage('¡Registro exitoso! Redirigiendo a la página de inicio de sesión...');
        console.log('Usuario registrado:', newUser);

        // Redirigir a la página de login después de 2 segundos
        setTimeout(() => {
            navigate('/login');
        }, 2000);

        // Limpiar el formulario
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
        setRole('user');
        setError(''); // Limpiar el mensaje de error
    };

    return (
        <div className="registro-container">
            <form className="registro-form" onSubmit={handleSubmit}>
                <h1>Crear Cuenta</h1>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}

                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />

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

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                <button type="submit">Registrarse</button>

                <p className="login-text">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </form>
        </div>
    );
}

export default Registro;