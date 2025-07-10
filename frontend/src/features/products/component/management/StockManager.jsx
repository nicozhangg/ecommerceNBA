import React, { useState } from 'react';
import './StockManager.css';
import { actualizarStock } from '../../../../api/api';

function StockManager({ product }) {
  // Inicializo con objeto seguro para evitar undefined
  const [stock, setStock] = useState(
    product.stockPorTalle || { S: 0, M: 0, L: 0, XL: 0 }
  );

  const handleStockChange = (size, value) => {
    const newStock = { ...stock, [size]: parseInt(value) || 0 };
    setStock(newStock);
  };

  const handleSave = async () => {
    try {
      console.log("Enviando stock:", stock);
      await actualizarStock(product.id, stock);
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
                    value={stock[size] ?? 0}  // fallback a 0 si es undefined
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
