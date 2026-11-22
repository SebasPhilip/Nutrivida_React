import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';

// Layout
import Navbar from './components/Navbar';

// Públicas
import Home from './components/Home';
import CatalogoPlanes from './components/CatalogoPlanes';
import CatalogoProductos from './components/CatalogoProductos';
import Contacto from './components/Contacto';

// Autenticación
import Login from './components/Login';
import Registro from './components/Registro';

// Paciente
import Carrito from './components/Carrito';
import Progreso from './components/Progreso';
import { Citas } from './components/Citas';

// Nutricionista
import { HomeNutri } from './components/HomeNutri';
import { GestionarPacientes } from './components/GestionarPacientes';

// Admin
import { Admin } from './components/Admin';
import { AdminClientes } from './components/AdminClientes';
import { AdminProfesionales } from './components/AdminProfesionales';
import AdminInventario from './components/AdminInventario';
import Planes from './components/Planes';         // CRUD de planes
import Productos from './components/Productos';   // CRUD de productos

/**
 * Protege rutas según el rol guardado en localStorage ('usuarioRol').
 * Roles existentes: 'Paciente', 'Nutri', 'Admin'.
 *  - Sin sesión          -> /login
 *  - Rol no autorizado   -> /
 * Se usa como ruta de layout: <Route element={<RutaProtegida rolesPermitidos={[...]} />}>
 */
const RutaProtegida = ({ children, rolesPermitidos }) => {
  const rol = localStorage.getItem('usuarioRol');

  if (!rol) {
    return <Navigate to="/login" replace />;
  }

  if (!rolesPermitidos.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* ---------- Públicas ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<CatalogoPlanes />} />
          <Route path="/productos" element={<CatalogoProductos />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* ---------- Autenticación ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* ---------- Paciente ---------- */}
          <Route element={<RutaProtegida rolesPermitidos={['Paciente']} />}>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/progreso" element={<Progreso />} />
            <Route path="/citas" element={<Citas />} />
          </Route>

          {/* ---------- Nutricionista ---------- */}
          <Route element={<RutaProtegida rolesPermitidos={['Nutri']} />}>
            <Route path="/perfil-nutricionista" element={<HomeNutri />} />
            <Route path="/gestionar-pacientes" element={<GestionarPacientes />} />
          </Route>

          {/* ---------- Admin ---------- */}
          <Route element={<RutaProtegida rolesPermitidos={['Admin']} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-clientes" element={<AdminClientes />} />
            <Route path="/admin-profesionales" element={<AdminProfesionales />} />
            <Route path="/admin-inventario" element={<AdminInventario />} />
            <Route path="/admin-planes" element={<Planes />} />
            <Route path="/admin-productos" element={<Productos />} />
          </Route>

          {/* ---------- Ruta no encontrada ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
