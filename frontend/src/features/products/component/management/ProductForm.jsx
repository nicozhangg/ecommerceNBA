import React, { useState } from 'react';
import './ProductForm.css';
import { crearProducto } from '../../../../api/api'; // Ajustá esta ruta si es necesario

const defaultStock = { S: 0, M: 0, L: 0, XL: 0 };

function ProductForm({ initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    price: initialData.price || '',
    equipo: initialData.equipo || '',
    image: initialData.image || '',
    images: initialData.images || ['', ''],
    stock: initialData.stock || defaultStock,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['S', 'M', 'L', 'XL'].includes(name)) {
      setForm(prev => ({
        ...prev,
        stock: { ...prev.stock, [name]: parseInt(value) || 0 }
      }));
    } else if (name === 'price') {
      const rawValue = value.replace(/[^\d]/g, '');
      const formatted = rawValue ? '$' + Number(rawValue).toLocaleString('es-AR') : '';
      setForm({ ...form, price: formatted });
    } else if (name.startsWith('image-')) {
      const index = parseInt(name.split('-')[1]);
      const newImages = [...form.images];
      newImages[index] = value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFocus = (e) => {
    if (['S', 'M', 'L', 'XL'].includes(e.target.name) && e.target.value === '0') {
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rawPrice = form.price ? form.price.replace(/[^\d]/g, '') : '';
      const precioNumerico = rawPrice ? parseInt(rawPrice, 10) : 0;

      const nuevoProducto = {
        nombre: form.title,
        precio: precioNumerico,
        imagenUrl: form.image,
        imagenes: form.images,
        equipo: form.equipo,
        stockPorTalle: form.stock,
      };

      await crearProducto(nuevoProducto);

      alert('Producto guardado exitosamente');
      // reset o redirección acá si querés

    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Error al guardar el producto');
    }
  };


  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{initialData.id ? 'Editar Producto' : 'Agregar Producto'}</h2>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
      />

      <select name="equipo" value={form.equipo} onChange={handleChange} required>
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

      <input
        type="text"
        name="image"
        placeholder="URL de imagen principal"
        value={form.image}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image-0"
        placeholder="Imagen secundaria 1"
        value={form.images[0]}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image-1"
        placeholder="Imagen secundaria 2"
        value={form.images[1]}
        onChange={handleChange}
      />

      <fieldset>
        <legend>Stock por Talle</legend>
        {['S', 'M', 'L', 'XL'].map(size => (
          <label key={size}>
            {size}:
            <input
              type="number"
              name={size}
              value={form.stock[size]}
              min="0"
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </label>
        ))}
      </fieldset>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default ProductForm;

