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
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;