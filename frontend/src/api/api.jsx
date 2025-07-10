import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // 🔧 necesario para evitar errores 400
  },
});

// Interceptor: agrega el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------- AUTH ----------------
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);

// ----------- PRODUCTOS ----------------
export const getAllProductos = () => api.get('/productos');
export const getProductoById = (id) => api.get(`/productos/${id}`);
export const crearProducto = (producto) => {
  // Asegura que stockPorTalle sea un objeto plano
  if (producto.stockPorTalle instanceof Map) {
    producto.stockPorTalle = Object.fromEntries(producto.stockPorTalle);
  }
  return api.post('/productos', producto);
};
export const actualizarProducto = (id, producto) => api.put(`/productos/${id}`, producto);
export const eliminarProducto = (id) => api.delete(`/productos/${id}`);

// ----------- PEDIDOS ----------------
export const crearPedido = (pedido) => api.post('/carrito/checkout', pedido);

// ----------- STOCK ----------------
export const actualizarStock = (id, stock) =>
  api.patch(`/productos/${id}/stock`, { stock });

export default api;
export const obtenerProductos = getAllProductos;
