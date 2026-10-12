import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Planes from './components/Planes';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Registro from './components/Registro';
import Contacto from './components/Contacto';
import Progreso from './components/Progreso';
import { Citas } from './components/Citas';
import { HomeNutri } from './components/HomeNutri';
import { GestionarPacientes } from './components/GestionarPacientes';
import { Admin } from './components/Admin';
import { AdminClientes } from './components/AdminClientes';
import { AdminProfesionales } from './components/AdminProfesionales';
import AdminInventario from './components/AdminInventario';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/perfil-nutricionista" element={<HomeNutri />} />
          <Route path="/gestionar-pacientes" element={<GestionarPacientes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-clientes" element={<AdminClientes />} />
          <Route path="/admin-profesionales" element={<AdminProfesionales />} />
          <Route path="/admin-inventario" element={<AdminInventario />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;