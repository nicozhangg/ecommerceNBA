import { useCart } from '../../features/cart/context/CartContext';
import { Link } from 'react-router-dom';
import './Carrito.css';

const Carrito = () => {
  const { 
    cartItems,        // Lista de productos en el carrito
    updateQuantity,   // Función para cambiar cantidad de un producto
    removeFromCart,   // Función para eliminar un producto del carrito
    getTotal,         // Función para calcular el total del carrito
    getAvailableStock // Función para obtener stock disponible de un producto y talle
  } = useCart();

  // Función para aumentar cantidad respetando stock disponible
  const handleIncreaseQuantity = (item) => {
    const availableStock = getAvailableStock(item.id, item.talle);
    if (item.quantity < availableStock) { // Condicion que no supere el stock actual
      updateQuantity(item.id, 1, item.talle);
    } else {
      alert(`No puedes agregar más. Stock máximo: ${availableStock}`);
    }
  };

  // Si el carrito está vacío, mostrar mensaje y botón para ir a la tienda  
  if (cartItems.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/store"><button>Ir a la tienda</button></Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      <ul className="carrito-lista">
        {cartItems.map((item) => {
          const availableStock = getAvailableStock(item.id, item.talle);
          return (
            <li key={`${item.id}-${item.talle}`} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} className="carrito-img" />
              <div className="carrito-detalle">
                <h4>{item.nombre}</h4>
                <p>${item.precio.toLocaleString()}</p>
                {item.talle && (
                  <>
                    <p><strong>Talle:</strong> {item.talle}</p>
                    <p className="stock-info">
                      Disponibles: {availableStock - item.quantity} restantes
                    </p>
                  </>
                )}
                <div className="cantidad-controles">
                  <button 
                    onClick={() => updateQuantity(item.id, -1, item.talle)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleIncreaseQuantity(item)}
                    disabled={item.quantity >= availableStock}
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.talle)} 
                  className="btn-borrar"
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="carrito-total">
        <h3>Total: ${getTotal().toLocaleString()}</h3>
        <div className="carrito-botones">
          <Link to="/store">
            <button className="btn-seguir-comprando">
              <i className="fas fa-shopping-bag"></i> Seguir comprando
            </button>
          </Link>
          <Link to="/checkout">
            <button className="btn-finalizar">
              <i className="fas fa-credit-card"></i> Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carrito;