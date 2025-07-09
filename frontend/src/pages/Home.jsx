import React from 'react';
import './Home.css';
import bannerImage from '../Assets/banner1.png'; // Cambiá por tu imagen de banner

export default function Home() {
    return (
    <>
    <div className="home-page">
        <div className="banner">
        <img src={bannerImage} alt="Banner Principal" className="banner-image" />
        </div>

        {/* Sección Informativa debajo del banner */}
        <div className="info-section">
        <div className="info-card">
            <h3>ENVIOS A TODO EL PAÍS</h3>
            <p>A Domicilio y a todas las Sucursales OCA del País. Gratis en compras + $150.000.</p>
        </div>
        <div className="info-card">
            <h3>MEDIOS DE PAGO</h3>
            <p>Con Mercado Pago con todas las Tarjetas de Crédito, Débito y Transferencia Bancaria.</p>
        </div>
        <div className="info-card">
            <h3>CONSULTAS ONLINE</h3>
            <p>Respondemos todas tus consultas por Whatsapp e Instagram. ¡Escribinos!</p>
        </div>
        </div>
    </div>
    </>
    );
}
