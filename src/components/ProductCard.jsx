import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext'; 

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);

  const manejarCompra = () => {
    
    const estaLogueado = localStorage.getItem('usuarioRol');

    if (!estaLogueado) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      navigate('/login');
    } else {
      agregarAlCarrito(producto);
      alert(`Producto agregado al carrito: ${producto.nombre}`);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
        
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2" style={{ width: 'fit-content' }}>
            {producto.categoria}
          </span>
          <h5 className="card-title fw-bold">{producto.nombre}</h5>
          
          <p className="text-muted small mb-3">Stock disponible: {producto.stock} uds.</p>
          
          <h4 className="mt-auto text-success fw-bold">
            ${producto.precio.toLocaleString('es-CL')}
          </h4>
          
          <button 
            className="btn btn-outline-success w-100 mt-3" 
            onClick={manejarCompra}
          >
             Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;