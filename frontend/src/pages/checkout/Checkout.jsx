import { useCart } from '../../features/cart/context/CartContext';
import './Checkout.css';
import api from '../../api/api';
import { useState, useEffect } from 'react';
 
const Checkout = () => {
  const { cartItems, getTotal, clearCart } = useCart();
 
  const [email, setEmail] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [totalFinal, setTotalFinal] = useState(null);
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [cuotas, setCuotas] = useState(3);
  const [totalConInteres, setTotalConInteres] = useState(getTotal());
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
 
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
 
  const calcularCuota = (total, cuotas) => {
    let interes = 0;
    if (cuotas === 6) interes = 0.15;
    if (cuotas === 12) interes = 0.30;
    const totalConInteres = total + total * interes;
    return (totalConInteres / cuotas).toFixed(2);
  };
 
  const calcularTotalConInteres = (total, cuotas) => {
    let interes = 0;
    if (cuotas === 6) interes = 0.15;
    if (cuotas === 12) interes = 0.30;
    return (total + total * interes).toFixed(2);
  };
 
  const calcularEnvio = (codigoPostal) => {
    if (codigoPostal.startsWith("1000")) setCostoEnvio(0);
    else if (codigoPostal.startsWith("7000")) setCostoEnvio(5000);
    else setCostoEnvio(9000);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pedido = {
      email, nombre, direccion, telefono, dni, codigoPostal,
      productos: cartItems, total: getTotal(), fecha: new Date().toISOString()
    };
 
    try {
      const response = await api.post('/pedidos', pedido);
 
      const updateStockPromises = cartItems.map(async (item) => {
        const producto = (await api.get(`/productos/${item.id}`)).data;
        const nuevoStock = { ...producto.stock };
        if (nuevoStock[item.talle]) nuevoStock[item.talle] -= item.quantity;
        await api.patch(`/productos/${item.id}`, { stock: nuevoStock });
      });
 
      await Promise.all(updateStockPromises);
      setMensajeExito(`¡Gracias por tu compra, ${nombre}! Tu pedido #${response.data.id} será enviado a ${direccion}.`);
      setTotalFinal(getTotal());
      clearCart();
    } catch (error) {
      console.error('Error procesando el pedido:', error);
    }
  };
 
  return (
    <div className="checkout-container">
      <h2>Entrega y Pago</h2>
      {mensajeExito ? (
        <div className="checkout-success">{mensajeExito}</div>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          {/* ...otros inputs... */}
          <div>
            <label>Seleccionar cuotas:</label>
            <select
              value={cuotas}
              onChange={(e) => {
                const c = parseInt(e.target.value, 10);
                setCuotas(c);
                setTotalConInteres(calcularTotalConInteres(getTotal(), c));
              }}
            >
              <option value={3}>3 cuotas sin interés de ${calcularCuota(getTotal(), 3)}</option>
              <option value={6}>6 cuotas con 15% interés de ${calcularCuota(getTotal(), 6)}</option>
              <option value={12}>12 cuotas con 30% interés de ${calcularCuota(getTotal(), 12)}</option>
            </select>
          </div>
 
          <div>
            <label>Código Postal:</label>
            <input
              type="text"
              required
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
            <button type="button" onClick={() => calcularEnvio(codigoPostal)}>Calcular</button>
            {costoEnvio !== null && (
              <p><strong>Costo de envío:</strong> {costoEnvio === 0 ? "Envío gratis" : `$${Number(costoEnvio).toLocaleString('es-AR')}`}</p>
            )}
          </div>
 
          <button type="submit">Confirmar Compra</button>
        </form>
      )}
 
      <div className="checkout-resumen">
        <h3>Resumen de compra:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.nombre} (x{item.quantity}) - Talle: {item.talle} - {
                typeof item.precio === 'number'
                  ? `$${item.precio.toLocaleString('es-AR')}`
                  : 'Precio no disponible'
              }
            </li>
          ))}
        </ul>
        <h4>
          Total: ${mensajeExito
            ? (parseFloat(totalFinal) + parseFloat(costoEnvio || 0)).toLocaleString('es-AR')
            : (parseFloat(totalConInteres) + parseFloat(costoEnvio || 0)).toLocaleString('es-AR')}
        </h4>
      </div>
    </div>
  );
};
 
export default Checkout;