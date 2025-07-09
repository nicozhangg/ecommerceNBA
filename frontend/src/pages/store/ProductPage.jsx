import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import Navbar from "../../shared/component/layouts/NavBar";
import { useCart } from "../../features/cart/context/CartContext";
import api from "../../api/api"; // Tu instancia de Axios configurada

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]); // Estado para todos los productos
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [consultation, setConsultation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentSimilarIndex, setCurrentSimilarIndex] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState(null);

  // Cargar TODOS los productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/productos"); // Usamos la instancia de axios
        setAllProducts(response.data);
        
        // Encontrar el producto actual
        const currentProduct = response.data.find(p => p.id === id || p._id === id);
        if (!currentProduct) {
          throw new Error("Producto no encontrado");
        }
        setProduct(currentProduct);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [id]);

  // Filtrar productos similares cuando cambia el producto principal o allProducts
  useEffect(() => {
    if (!product || allProducts.length === 0) return;

    // Función auxiliar para verificar stock
    const hasStock = (product) => {
      return product.stock && 
             Object.values(product.stock).some(qty => qty > 0);
    };

    // 1. Filtramos productos del mismo equipo (excluyendo el actual)
    const sameTeamProducts = allProducts.filter(p => 
      p.equipo === product.equipo && 
      (p.id !== product.id && p._id !== product._id) &&
      hasStock(p)
    );

    // 2. Si no hay suficientes, agregamos productos de otras categorías
    const otherProducts = allProducts.filter(p => 
      p.equipo !== product.equipo && 
      (p.id !== product.id && p._id !== product._id) &&
      hasStock(p)
    );

    // Combinamos y limitamos a 6 productos
    const combined = [
      ...sameTeamProducts,
      ...otherProducts
    ].slice(0, 6);

    setSimilarProducts(combined);
  }, [product, allProducts]);

  // Efecto para el carrusel
  useEffect(() => {
    const track = document.querySelector(".similar-carousel__track");
    if (track) {
      track.style.setProperty("--current-index", currentSimilarIndex);
    }
  }, [currentSimilarIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
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
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      talle: selectedSize,
      quantity: 1
    };

    addToCart(productForCart);
    alert(`${product.nombre} (Talle: ${selectedSize}) agregado al carrito`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/carrito");
  };

  const handleAddToFavorites = () => {
    setFavorite(!favorite);
    alert(
      favorite ? "Removido de favoritos" : "Agregado a favoritos"
    );
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (consultation.trim()) {
      alert("Consulta enviada: " + consultation);
      setConsultation("");
    }
  };

  const handleCalculateShipping = () => {
    if (!postalCode) return;
    
    const cp = parseInt(postalCode);
    if (cp >= 1000 && cp <= 1999) {
      setShippingCost(0); // Envío gratis CABA
    } else if (cp >= 7000 && cp <= 7999) {
      setShippingCost(5000); // GBA
    } else {
      setShippingCost(9000); // Resto del país
    }
  };

  if (loading) return (
    <div className="loading-container">
      <p>Cargando producto...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>{error}</h2>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );

  if (!product) return null;

  return (
    <div className="product-page">
      <Navbar />
      
      {/* Producto principal */}
      <div className="product-page__details">
        {/* Galería de imágenes */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={product.imagen} 
              alt={product.nombre} 
            />
          </div>
          <div className="thumbnails">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.nombre} ${index + 1}`}
                className={index === currentImageIndex ? "active" : ""}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="product-info">
          <h1>{product.nombre}</h1>
          <p className="price">${product.precio.toLocaleString('es-AR')}</p>
          
          <div className="team-category">
            <span>{product.equipo}</span>
            <span>{product.categoria}</span>
          </div>
          
          <p className="description">{product.descripcion}</p>
          
          {/* Selector de talles */}
          <div className="size-selector">
            <h3>Seleccionar talle:</h3>
            <div className="sizes">
              {Object.entries(product.stock || {}).map(([size, quantity]) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""} ${quantity === 0 ? "disabled" : ""}`}
                  onClick={() => quantity > 0 && setSelectedSize(size)}
                  disabled={quantity === 0}
                >
                  {size}
                  {quantity === 0 && <span className="stock-label">Agotado</span>}
                </button>
              ))}
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="action-buttons">
            <button 
              className="btn-buy" 
              onClick={handleBuyNow}
              disabled={!selectedSize}
            >
              Comprar ahora
            </button>
            <button 
              className="btn-cart" 
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Agregar al carrito
            </button>
            <button 
              className={`btn-favorite ${favorite ? "active" : ""}`}
              onClick={handleAddToFavorites}
            >
              {favorite ? "❤️ En favoritos" : "🤍 Agregar a favoritos"}
            </button>
          </div>
          
          {/* Envío */}
          <div className="shipping-calculator">
            <h3>Calcular envío</h3>
            <div className="shipping-input">
              <input
                type="text"
                placeholder="Código postal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
              <button onClick={handleCalculateShipping}>Calcular</button>
            </div>
            {shippingCost !== null && (
              <p className="shipping-result">
                {shippingCost === 0 ? (
                  "✅ Envío gratis"
                ) : (
                  `🚚 Envío: $${shippingCost.toLocaleString('es-AR')}`
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Productos similares */}
      <section className="similar-products">
        <h2>Productos relacionados</h2>
        
        {similarProducts.length > 0 ? (
          <div className="similar-carousel">
            <button 
              className="carousel-btn prev"
              onClick={() => setCurrentSimilarIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSimilarIndex === 0}
            >
              &lt;
            </button>
            
            <div className="similar-grid">
              {similarProducts
                .slice(currentSimilarIndex, currentSimilarIndex + 4)
                .map(product => (
                  <div key={product.id || product._id} className="similar-product">
                    <Link to={`/producto/${product.id || product._id}`}>
                      <img src={product.imagen} alt={product.nombre} />
                      <h3>{product.nombre}</h3>
                      <p>${product.precio.toLocaleString('es-AR')}</p>
                    </Link>
                  </div>
                ))
              }
            </div>
            
            <button 
              className="carousel-btn next"
              onClick={() => setCurrentSimilarIndex(prev => 
                Math.min(prev + 1, similarProducts.length - 4)
              )}
              disabled={currentSimilarIndex >= similarProducts.length - 4}
            >
              &gt;
            </button>
          </div>
        ) : (
          <p className="no-similar">No encontramos productos similares</p>
        )}
      </section>

      {/* Formulario de consultas */}
      <section className="product-questions">
        <h2>¿Tienes preguntas sobre este producto?</h2>
        <form onSubmit={handleConsultationSubmit}>
          <textarea
            value={consultation}
            onChange={(e) => setConsultation(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            rows={4}
            required
          />
          <button type="submit">Enviar consulta</button>
          <div className="whatsapp-contact">
            <span>O contáctanos por WhatsApp:</span>
            <a 
              href={`https://wa.me/5492211234567?text=Consulta sobre ${product.nombre}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/whatsapp-icon.png" alt="WhatsApp" />
              +54 9 221 123-4567
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}