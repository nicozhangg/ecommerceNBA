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

    const { addUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el nuevo usuario
        const newUser = { nombre, apellido, email, password, role };

        const success = await addUser(newUser); // ⬅️ usar función async del contexto

        if (success) {
            setMessage('¡Registro exitoso! Redirigiendo a la página de inicio de sesión...');
            console.log('Usuario registrado:', newUser);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError('Error al registrar. Intenta con otro correo.');
        }

        // Limpiar el formulario
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
        setRole('USER');
        setError('');
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
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
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