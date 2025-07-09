import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Almacenar todos los usuarios registrados
    const [users, setUsers] = useState(() => {
        // Cargar usuarios desde localStorage al iniciar
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [];
    });

    // Almacenar el usuario actual
    const [currentUser, setCurrentUser] = useState(() => {
        // Cargar usuario actual desde localStorage al iniciar
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const addUser = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Guardar en localStorage
    };

    const login = (email, password) => {
        // Verificar si el usuario existe y la contraseña es correcta
        const user = users.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user)); // Guardar usuario actual en localStorage
            return true;
        }
        return false; // Login fallido
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser'); // Eliminar usuario actual de localStorage
    };

    useEffect(() => {
        // Sincronizar usuarios con localStorage cuando cambien
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    return (
        <UserContext.Provider value={{ users, currentUser, addUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};