import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Planes from './components/Planes'; // 
import Categorias from './components/Productos';
import Carrito from './components/Carrito';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Planes />} /> 
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;