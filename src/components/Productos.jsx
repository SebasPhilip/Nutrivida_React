import { useState, useEffect } from 'react';
import ProductoCard from './ProductCard';
import { obtenerProductos } from '../data/productos';

const Categorias = () => {
 
  const [productos, setProductos] = useState([]);
  
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  useEffect(() => {
    const datos = obtenerProductos();
    setProductos(datos);
    setProductosFiltrados(datos); 
  }, []);

  
  const filtrarPorCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    
    if (categoria === 'Todos') {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter(prod => prod.categoria === categoria);
      setProductosFiltrados(filtrados);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center fw-bold text-success mb-4">Tienda de Suplementos</h2>
      
      
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        <button 
          className={`btn ${categoriaActiva === 'Todos' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => filtrarPorCategoria('Todos')}
        >
          Todos
        </button>
        <button 
          className={`btn ${categoriaActiva === 'Suplementos' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => filtrarPorCategoria('Suplementos')}
        >
          Suplementos
        </button>
        <button 
          className={`btn ${categoriaActiva === 'Vitaminas' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => filtrarPorCategoria('Vitaminas')}
        >
          Vitaminas
        </button>
        <button 
          className={`btn ${categoriaActiva === 'Snacks' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => filtrarPorCategoria('Snacks')}
        >
          Snacks Saludables
        </button>
      </div>

      
      <div className="row">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No hay productos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categorias;