import { createContext, useContext, useState, useEffect } from 'react';
import { api, getAllProductos } from '../../../api/api'; 

const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch de productos usando tu instancia de axios configurada
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProductos(); // Usa tu función exportada
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

  // Función para obtener el stock disponible de un producto según su talla
  const getAvailableStock = (productId, size) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.stock) return 0;
    return product.stock[size] || 0;
  };

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => 
        item.id === product.id && item.talle === product.talle
      );

      const availableStock = getAvailableStock(product.id, product.talle);

      if (existingItem) {
        if (existingItem.quantity >= availableStock) {
          alert(`No hay suficiente stock. Máximo disponible: ${availableStock}`);
          return prevItems;
        }

        return prevItems.map((item) =>
          item.id === product.id && item.talle === product.talle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id, delta, talle) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.talle === talle) {
          const newQuantity = item.quantity + delta;
          const availableStock = getAvailableStock(id, talle);

          if (newQuantity > availableStock) {
            alert(`No hay suficiente stock. Máximo disponible: ${availableStock}`);
            return item;
          }

          if (newQuantity < 1) {
            return item;
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id, talle) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.talle === talle))
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getAvailableStock,
        products // Exponer los productos también si otros componentes los necesitan
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
