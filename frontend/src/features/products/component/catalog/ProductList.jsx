import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllProductos } from '../../../../api/api'; 
import ProductCard from './ProductCard';
import './ProductList.css';

export default function ProductList({ selectedTeam }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search')?.toLowerCase() || '';
  };

  // Cargar productos usando tu API configurada
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProductos(); // Usa tu función de API
        setProducts(response.data);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError(err.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Aplicar filtros por equipo y búsqueda
  useEffect(() => {
    const searchQuery = getSearchQuery();
    let filtered = products;

    if (selectedTeam && selectedTeam !== 'Todos') {
      // Si es un array de equipos
      if (Array.isArray(selectedTeam)) {
        filtered = filtered.filter((p) => selectedTeam.includes(p.equipo));
      } else {
        // Si es un solo equipo
        filtered = filtered.filter((p) => p.equipo === selectedTeam);
      }
    }

    // Filtrar por búsqueda palabras
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        // Para cada producto, convierte el título a minúsculas (si existe) y verifica si incluye el texto de búsqueda (también en minúsculas para asegurar coincidencias sin importar mayúsculas o minúsculas)
        p.title?.toLowerCase().includes(searchQuery)
      );
    }


    setFilteredProducts(filtered);
  }, [selectedTeam, products, location]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-list">
      {loading && <p>Cargando productos...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>No se encontraron productos.</p>
          </div>
        )
      )}
    </div>
  );
}


