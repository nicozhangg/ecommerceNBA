import React, { useState } from "react";
import "./Contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Formulario enviado correctamente. ¡Gracias por contactarnos!");
  };

  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <div className="contacto-grid">
        {/* Columna de información */}
        <div className="contacto-column contacto-info">
          <h3>Datos de Contacto</h3>
          <p>📞 Teléfono: +54 11 4567 8901</p>
          <p>📧 Email: contacto@nbastore.com </p>
          <p>🏢 Ubicación: Balvanera, Capital Federal</p>
          <a> </a>
          <p>🌐 Envianos un WhatsApp:
            
          </p>

          <a
              href="https://wa.me/2215342811" 
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-icon"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
        </div>

        {/* Columna del formulario */}
        <div className="contacto-column">
          <form onSubmit={handleSubmit} className="contacto-form">
            <div className="contacto-input">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="contacto-input">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu email"
                required
              />
            </div>

            <div className="contacto-input">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                placeholder="Tu mensaje"
                required
              />
            </div>

            <button type="submit" className="contacto-btn">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
