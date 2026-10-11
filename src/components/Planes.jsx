import { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import { obtenerPlanes } from '../data/planes';

const Planes = () => {
  const [listaPlanes, setListaPlanes] = useState([]);

  useEffect(() => {
    const datos = obtenerPlanes();
    setListaPlanes(datos);
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-5">
        <h2 className="text-success fw-bold">Catálogo de Planes</h2>
        <p className="text-muted">Encuentra el plan perfecto para ti y comienza tu cambio hoy.</p>
      </div>
      
      <div className="row">
        {listaPlanes.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Planes;