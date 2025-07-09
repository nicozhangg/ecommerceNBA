import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './pages/store/Store';
import ProductPage from './pages/store/ProductPage';
import Login from './pages/auth/Login';
import Registro from './pages/auth/Registro';
import { UserProvider } from './features/user/context/UserContext'; 
import Home from './pages/Home';
import Carrito from './pages/cart/Carrito';
import Checkout from './pages/checkout/Checkout';
import NavBar from './shared/component/layouts/NavBar';
import Footer from './shared/component/layouts/Footer';
import './App.css';

import AdminPage from './pages/admin/AdminPage';
import AddProductPage from './pages/admin/AddProductPage';
import ManageStockPage from './pages/admin/ManageStockPage';
import EditarProductosLista from './pages/admin/EditarProductosLista';
import EditarProductoPage from './pages/admin/EditarProductoPage';


import Contacto from './pages/Contacto'; 

function App() {
  return (
    <UserProvider>      
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/stock" element={<ManageStockPage />} />
          <Route path="/admin/products/edit" element={<EditarProductosLista />} />
          <Route path="/admin/products/edit/:id" element={<EditarProductoPage />} />

          <Route path="/contacto" element={<Contacto />} />

          
        </Routes>
      </Router>
      <Footer />
    </UserProvider>
  );
}

export default App;
