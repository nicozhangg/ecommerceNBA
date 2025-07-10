import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarProductoPage.css';

import {
  getProductoById,
  actualizarProducto,
  eliminarProducto,
} from '../../api/api';

function EditarProductoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    getProductoById(id).then((res) => setProducto(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const rawValue = value.replace(/[^\d]/g, '');
      const formatted = `$${Number(rawValue).toLocaleString('es-AR')}`;
      setProducto((prev) => ({
        ...prev,
        price: formatted,
      }));
    } else if (name.startsWith('stock.')) {
      const size = name.split('.')[1];
      setProducto((prev) => ({
        ...prev,
        stock: {
          ...prev.stock,
          [size]: parseInt(value, 10) || 0,
        },
      }));
    } else {
      setProducto((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarProducto(id, producto);
    alert('Producto actualizado correctamente');
    navigate('/admin/products/edit');
  };

  const handleDelete = async () => {
    const confirm = window.confirm('¿Estás seguro de que querés eliminar este producto? Esta acción no se puede deshacer.');
    if (!confirm) return;

    await eliminarProducto(id);
    alert('Producto eliminado correctamente');
    navigate('/admin/products/edit');
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="editar-producto">
      <h2 className="editar-title">Editar Producto</h2>

      <div className="editar-producto-contenido">
        <div className="editar-producto-imagen">
          <img src={producto.image} alt={producto.title} />
        </div>

        <form className="editar-formulario" onSubmit={handleSubmit}>
          <label>Título</label>
          <input className="form-control" name="title" value={producto.title} onChange={handleChange} />

          <label>Precio</label>
          <input className="form-control" name="price" value={producto.price} onChange={handleChange} />

          <label>Equipo</label>
          <select
            className="form-control"
            name="equipo"
            value={producto.equipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un equipo</option>
            {[
              'Lakers', 'Warriors', 'Bulls', 'Celtics', 'Heat', 'Spurs', 'Nets',
              '76ers', 'Suns', 'Bucks', 'Mavericks', 'Clippers', 'Nuggets', 'Raptors',
              'Kings', 'Knicks', 'Pistons', 'Hornets', 'Thunder', 'Hawks', 'Timberwolves',
              'Magic', 'Pacers', 'Pelicans', 'Trail Blazers', 'Jazz', 'Grizzlies', 'Rockets',
              'Wizards'
            ].map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>

          <label>Imagen principal</label>
          <input className="form-control" name="image" value={producto.image} onChange={handleChange} />

          <label>Imágenes adicionales</label>
          {producto.imagenes?.map((img, index) => (
            <input
              key={index}
              className="form-control"
              type="text"
              name={`image-${index}`}
              placeholder={`Imagen secundaria ${index + 1}`}
              value={img}
              onChange={(e) => {
                const nuevasImagenes = [...producto.imagenes];
                nuevasImagenes[index] = e.target.value;
                setProducto((prev) => ({
                  ...prev,
                  imagenes: nuevasImagenes,
                }));
              }}
            />
          ))}

          <fieldset>
            <legend>Stock por Talle</legend>
            <div className="talles">
              {['S', 'M', 'L', 'XL'].map(talle => (
                <div className="talle-input" key={talle}>
                  <label>{talle}:</label>
                  <input
                    className="form-control"
                    type="number"
                    name={`stock.${talle}`}
                    value={producto.stock[talle]}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="botones-formulario">
            <button type="submit" className="guardar-button">Guardar Cambios</button>
            <button type="button" className="eliminar-button" onClick={handleDelete}>
              Eliminar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarProductoPage;

