import { useContext } from 'react';
import { CartContext } from '../Context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalAPagar } = useContext(CartContext);
  const navigate = useNavigate();

  const manejarPago = () => {
    alert("Gracias por tu compra!");
    vaciarCarrito();
    navigate('/');
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-success mb-4">Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted mb-4">Tu carrito está vacío </h4>
          <Link to="/planes" className="btn btn-primary me-2">Ver Planes</Link>
          <Link to="/productos" className="btn btn-outline-primary">Ver Productos</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                {carrito.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <div className="d-flex align-items-center">
                      <img src={item.imagen} alt={item.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} className="me-3" />
                      <div>
                        <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-4">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarDelCarrito(item.id, item.nombre)}
                      >
                        
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="text-end mt-3">
                  <button className="btn btn-sm btn-outline-secondary" onClick={vaciarCarrito}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body bg-light rounded">
                <h5 className="fw-bold mb-4">Resumen de Compra</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalAPagar.toLocaleString('es-CL')}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>Descuentos</span>
                  <span>$0</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5 text-success">${totalAPagar.toLocaleString('es-CL')}</span>
                </div>

                <button className="btn btn-success w-100 fw-bold py-2" onClick={manejarPago}>
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;