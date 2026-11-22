import { useEffect, useState } from 'react';
import ProductosService, { describeError } from '../services/productosService';
import ProductoCard from './ProductCard';

const CatalogoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await ProductosService.getAll();
        setProductos(response.data);
      } catch (err) {
        setError(describeError(err));
      }
    };
    cargarProductos();
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">Nuestros Productos</h2>
        <p className="text-muted">Suplementos y alimentos para acompañar tu plan</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {productos.length === 0 && !error ? (
        <p className="text-center text-muted">No hay productos disponibles por el momento.</p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={{
                ...producto,
                imagen: producto.imagen || 'https://placehold.co/600x400/198754/ffffff?text=Producto+NutriVida',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogoProductos;