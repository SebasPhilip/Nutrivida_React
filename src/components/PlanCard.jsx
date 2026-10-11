import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext'; 

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);

  const manejarCompra = () => {
    const estaLogueado = localStorage.getItem('usuarioRol');

    if (!estaLogueado) {
      alert('Debes iniciar sesión para contratar un plan.');
      navigate('/login');
    } else {
      agregarAlCarrito(plan);
      alert(`Plan contratado: ${plan.nombre}`);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={plan.imagen} className="card-img-top" alt={plan.nombre} />
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{plan.nombre}</h5>
          <p className="card-text text-muted">Categoría: {plan.categoria}</p>
          
          {plan.oferta && (
            <span className="badge bg-warning text-dark mb-2" style={{ width: 'fit-content' }}>
              ¡En Oferta!
            </span>
          )}
          
          <h4 className="mt-auto text-success fw-bold">
            ${plan.precio.toLocaleString('es-CL')}
          </h4>
          
          <button 
            className="btn btn-dark w-100 mt-3"
            onClick={manejarCompra}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;