import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const id = product.id || product._id;
  const image = product.imagenUrl || product.image;
  const nombre = product.nombre || product.title;
  const precio = product.precio ?? product.price;

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">

        <img
          src={image}
          alt={nombre}
        />
        <h4>{nombre}</h4>
      </Link>
      <p>{typeof precio === 'number' ? `$${precio.toLocaleString('es-AR')}` : 'Precio no disponible'}</p>
    </div>
  );
}
