import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './auth/AuthContext';
import { getRol } from './auth/session';


import Navbar from './components/Navbar';


import Home from './components/Home';
import CatalogoPlanes from './components/CatalogoPlanes';
import CatalogoProductos from './components/CatalogoProductos';
import Contacto from './components/Contacto';


import Login from './components/Login';
import Registro from './components/Registro';


import Carrito from './components/Carrito';
import Progreso from './components/Progreso';
import { Citas } from './components/Citas';


import { HomeNutri } from './components/HomeNutri';
import { GestionarPacientes } from './components/GestionarPacientes';


import { Admin } from './components/Admin';
import { AdminClientes } from './components/AdminClientes';
import { AdminProfesionales } from './components/AdminProfesionales';
import AdminInventario from './components/AdminInventario';
import Planes from './components/Planes';         
import Productos from './components/Productos';   


const RutaProtegida = ({ children, rolesPermitidos }) => {
  const rol = getRol();

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
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/planes" element={<CatalogoPlanes />} />
            <Route path="/productos" element={<CatalogoProductos />} />
            <Route path="/contacto" element={<Contacto />} />


            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />


            <Route element={<RutaProtegida rolesPermitidos={['Paciente']} />}>
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/progreso" element={<Progreso />} />
              <Route path="/citas" element={<Citas />} />
            </Route>


            <Route element={<RutaProtegida rolesPermitidos={['Nutri']} />}>
              <Route path="/perfil-nutricionista" element={<HomeNutri />} />
              <Route path="/gestionar-pacientes" element={<GestionarPacientes />} />
            </Route>


            <Route element={<RutaProtegida rolesPermitidos={['Admin']} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-clientes" element={<AdminClientes />} />
              <Route path="/admin-profesionales" element={<AdminProfesionales />} />
              <Route path="/admin-inventario" element={<AdminInventario />} />
              <Route path="/admin-planes" element={<Planes />} />
              <Route path="/admin-productos" element={<Productos />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
