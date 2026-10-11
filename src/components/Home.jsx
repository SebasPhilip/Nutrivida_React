import { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import { obtenerPlanes } from '../data/planes';

const Home = () => {
  
  const [listaPlanes, setListaPlanes] = useState([]);

  
  useEffect(() => {
    
    const datos = obtenerPlanes();
    setListaPlanes(datos);
  }, []);

  return (
    <div>
      
      <div className="bg-secondary text-white text-center py-5 mb-5" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h1 className="display-4 fw-bold">1200 x 300</h1>
          <p className="lead">Nuevos Lanzamientos</p>
          <p>Descubre nuestros nuevos planes de nutrición y bienestar.</p>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center mb-4">Nuestros Planes</h2>
        
        
        <div className="row">
          {listaPlanes.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;