import React, { useState } from 'react';
import './StockManager.css';
import { actualizarProducto } from '../../../../api/api';


 // ✅ Import axios centralizado

function StockManager({ product }) {
  const [stock, setStock] = useState(product.stock);

  const handleStockChange = (size, value) => {
    const newStock = { ...stock, [size]: parseInt(value) || 0 };
    setStock(newStock);
  };

  const handleSave = async () => {
    try {
      await actualizarProducto(product._id, { ...product, stock }); // ✅ Enviamos con axios
      alert('Stock actualizado correctamente');
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar el stock');
    }
  };

  return (
    <div className="stock-manager">
      <h3 className="product-title">{product.title}</h3>

      <div className="stock-manager-content">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="stock-inputs">
          <fieldset>
            <legend>Stock por Talle</legend>
            <div className="sizes">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div className="size-input" key={size}>
                  <label>{size}:</label>
                  <input
                    type="number"
                    min="0"
                    value={stock[size]}
                    onChange={(e) => handleStockChange(size, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <button className="save-button" onClick={handleSave}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockManager;
