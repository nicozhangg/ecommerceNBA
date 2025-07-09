import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
      <img
        src={product.image}
        alt={product.title}
      />

        <h4>{product.title}</h4>
      </Link>
      <p>{product.price}</p>
    </div>
  );
}