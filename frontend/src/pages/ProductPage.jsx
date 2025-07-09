import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import Navbar from "../Components/NavBar";
import { useCart } from "../context/CartContext";
import { api } from "../../api/api"; 

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [favorite, setFavorite] = useState(false);
  const [consultation, setConsultation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/productos/${id}`); // Usando Axios
        setProduct(response.data);
      } catch (err) {
        console.error("Error al cargar producto:", err);
        setError("Producto no encontrado");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <h1>{error}</h1>;
  if (!product) return <h1>Producto no encontrado</h1>;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona un talle");
      return;
    }

    const productForCart = {
      id: product.id,
      nombre: product.title,
      precio: parseFloat(product.price.replace(/\$/g, "").replace(/\./g, "")),
      imagen: product.images[0],
      talle: selectedSize,
    };

    addToCart(productForCart);
    alert(`"${product.title}" (Talle: ${selectedSize}) fue agregado al carrito.`);
  };

  const handleBuyNow = () => {
    alert(`¡Gracias por tu compra de "${product.title}"!`);
  };

  const handleAddToFavorites = () => {
    setFavorite(!favorite);
    alert(
      favorite
        ? `"${product.title}" fue eliminado de tus favoritos.`
        : `"${product.title}" fue agregado a tus favoritos.`
    );
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (consultation.trim()) {
      alert(`Consulta enviada: "${consultation}"`);
      setConsultation("");
    } else {
      alert("Por favor, escribe algo en tu consulta.");
    }
  };

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-page__details">
        <div className="product-page__carousel">
          <button onClick={handlePrevImage} className="carousel-btn prev-btn">
            &#8249;
          </button>
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.title} - Imagen ${currentImageIndex + 1}`}
            className="product-page__image"
          />
          <button onClick={handleNextImage} className="carousel-btn next-btn">
            &#8250;
          </button>
        </div>
        <div className="product-page__info">
          <h1>{product.title}</h1>
          <p><strong>Precio:</strong> {product.price}</p>
          <p><strong>Equipo:</strong> {product.equipo}</p>
          <p><strong>Descripción:</strong> {product.description || "Sin descripción disponible."}</p>
          <p><strong>Envío:</strong> desde $500</p>

          <div className="product-page__actions">
            <button onClick={handleBuyNow} className="btn btn-buy">Comprar</button>
            <button onClick={handleAddToCart} className="btn btn-cart">Agregar al carrito</button>
            <button onClick={handleAddToFavorites} className="btn btn-favorite">
              {favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
          </div>

          <div className="product-page__sizes">
            <label htmlFor="size-selector"><strong>Seleccionar talle:</strong></label>
            <select
              id="size-selector"
              className="size-selector"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">-- Selecciona talle --</option>
              {Object.entries(product.stock || {}).map(([size, quantity]) => (
                <option
                  key={size}
                  value={size}
                  disabled={quantity === 0}
                >
                  {size} {quantity === 0 ? "(Agotado)" : `(Disponible: ${quantity})`}
                </option>
              ))}
            </select>
          </div>

          {selectedSize && (
            <p><strong>Cantidad disponible:</strong> {product.stock[selectedSize]} unidades</p>
          )}
        </div>
      </div>

      <div className="product-page__consultation">
        <h2>Dejar una consulta</h2>
        <form onSubmit={handleConsultationSubmit}>
          <textarea
            value={consultation}
            onChange={(e) => setConsultation(e.target.value)}
            placeholder="Escribe tu consulta aquí..."
            rows="4"
          />
          <button type="submit" className="btn btn-submit">Enviar consulta</button>
        </form>
      </div>
    </div>
  );
}
