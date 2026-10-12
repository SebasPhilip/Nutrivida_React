import { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import { obtenerPlanes } from '../data/planes';

const Planes = () => {
  const [listaPlanes, setListaPlanes] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [soloOfertas, setSoloOfertas] = useState(false);

  useEffect(() => {
    const datos = obtenerPlanes();
    setListaPlanes(datos);
  }, []);

  const categorias = ['Todas', ...new Set(listaPlanes.map(plan => plan.categoria))];

  const planesFiltrados = listaPlanes.filter(plan => {
    const cumpleCategoria = categoriaSeleccionada === 'Todas' || plan.categoria === categoriaSeleccionada;
    const cumpleOferta = soloOfertas ? plan.oferta === true : true;
    return cumpleCategoria && cumpleOferta;
  });

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-5">
        <h2 className="text-success fw-bold">Catálogo de Planes</h2>
        <p className="text-muted">Encuentra el plan perfecto para ti y comienza tu cambio hoy.</p>
      </div>
      
      <div className="row mb-5 bg-light p-3 rounded shadow-sm align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <label className="fw-bold text-success mb-2">Filtrar por Categoría:</label>
          <select 
            className="form-select border-success shadow-sm"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6 d-flex align-items-end h-100 mt-2 mt-md-0">
          <div className="form-check form-switch fs-5">
            <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch"
              id="switchOfertas"
              checked={soloOfertas}
              onChange={(e) => setSoloOfertas(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label className="form-check-label fw-bold text-success" htmlFor="switchOfertas" style={{ cursor: 'pointer' }}>
              Mostrar solo planes en Oferta
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        {planesFiltrados.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">No se encontraron planes con estos filtros.</h4>
            <button 
              className="btn btn-outline-success mt-3" 
              onClick={() => { setCategoriaSeleccionada('Todas'); setSoloOfertas(false); }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          planesFiltrados.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))
        )}
      </div>
    </div>
  );
};

export default Planes;