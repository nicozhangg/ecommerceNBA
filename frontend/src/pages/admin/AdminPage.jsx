import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

function AdminPage() {
  return (
    <div className="admin-page">
      <h2>Panel de Administración</h2>
      <p>Bienvenido al panel de administración. Elija una de las siguientes opciones:</p>

      <div className="admin-links">
        <Link to="/admin/products/add" className="admin-link">
        <button className="admin-button">Agregar Producto</button>
        </Link>
        <Link to="/admin/stock" className="admin-link">
        <button className="admin-button">Gestionar Stock</button>
        </Link>
        <Link to="/admin/products/edit" className="admin-link">
          <button className="admin-button">Editar Producto</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
