import React, { useEffect, useState } from 'react';
import StockManager from '../../features/products/component/management/StockManager';
import './ManageStockPage.css';
import { getAllProductos as obtenerProductos } from '../../api/api';
 // ✅ Importamos desde api central

function ManageStockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await obtenerProductos(); // ✅ Usamos axios desde api.jsx
        setProducts(response.data); // ✅ Recordá que axios devuelve .data
      } catch (error) {
        console.error(error);
        alert('No se pudo cargar la lista de productos');
      } finally {
        setLoading(false); // Se desactiva el loading siempre
      }
    };

    cargarProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="manage-stock-page">
      <h2>Gestionar Stock de Productos</h2>
      <div className="stock-list">
        {products.map((product) => (
          <StockManager key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ManageStockPage;

