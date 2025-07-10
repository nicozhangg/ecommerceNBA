import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../../../api/api'; // Asegurate que esta ruta sea la correcta

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // 🔐 Login contra el backend con JWT
    const login = async (email, password) => {
        try {
            const response = await loginUser({ email, password }); // hace POST /auth/login
            const { token, role, nombre, apellido } = response.data;

            // Guardar token en localStorage
            localStorage.setItem('token', token);

            // Normalizar el role a mayúsculas para evitar problemas de casing
            const normalizedRole = role ? role.toUpperCase() : 'ADMIN';

            const user = { email, role: normalizedRole, nombre, apellido }; // podés adaptar esto según la respuesta de tu backend
            localStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);

            return true;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return false;
        }
    };

    // 🆕 Registro (si usás /auth/register en el backend)
    const addUser = async (newUser) => {
        try {
            await registerUser(newUser); // hace POST /auth/register
            return true;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ currentUser, login, logout, addUser }}>
            {children}
        </UserContext.Provider>
    );
};
