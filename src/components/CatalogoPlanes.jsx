import { useEffect, useState } from 'react';
import PlanesService, { describeError } from '../services/planesService';
import PlanCard from './PlanCard';

const CatalogoPlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const response = await PlanesService.getAll();
        setPlanes(response.data);
      } catch (err) {
        setError(describeError(err));
      }
    };
    cargarPlanes();
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">Nuestros Planes Nutricionales</h2>
        <p className="text-muted">Elige el plan que mejor se adapte a tus objetivos</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {planes.length === 0 && !error ? (
        <p className="text-center text-muted">No hay planes disponibles por el momento.</p>
      ) : (
        <div className="row">
          {planes.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={{
                ...plan,
                imagen: plan.imagen || 'https://placehold.co/600x400/198754/ffffff?text=Plan+NutriVida',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogoPlanes;
