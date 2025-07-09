import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EditarProductosLista.css';
import { getAllProductos } from '../../api/api';// Importamos desde el archivo centralizado

function EditarProductosLista() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllProductos(); 
        setProductos(response.data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(err.response?.data?.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="editar-lista-container">
      <h2>Seleccionar Producto a Editar</h2>
      <ul className="producto-lista">
        {productos.map((producto) => (
          <li key={producto._id} className="producto-item">
            <div>
              <strong>{producto.title}</strong><br />
              {producto.equipo} - {producto.price}
            </div>
            <Link to={`/admin/products/edit/${producto._id}`}>
              <button className="edit-button">Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditarProductosLista;
