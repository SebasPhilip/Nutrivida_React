import { useState, useEffect } from 'react';
import { obtenerProgreso } from '../data/progreso';

const Progreso = () => {
  const [historial, setHistorial] = useState([]);
  const [ultimoControl, setUltimoControl] = useState(null);

  useEffect(() => {
    const datos = obtenerProgreso();
    setHistorial(datos);
    if (datos.length > 0) {
      setUltimoControl(datos[0]); 
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-success mb-4">Mi Progreso Personal</h2>
      
      {ultimoControl && (
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 bg-light text-center p-3">
              <h5 className="text-muted mb-1">Peso Actual</h5>
              <h3 className="fw-bold text-primary">{ultimoControl.peso} kg</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 bg-light text-center p-3">
              <h5 className="text-muted mb-1">IMC</h5>
              <h3 className="fw-bold text-primary">{ultimoControl.imc}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 bg-light text-center p-3">
              <h5 className="text-muted mb-1">Cintura</h5>
              <h3 className="fw-bold text-primary">{ultimoControl.cintura} cm</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 bg-success text-white text-center p-3">
              <h5 className="mb-1">Último Control</h5>
              <h3 className="fw-bold">{ultimoControl.fecha}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">Historial de Mediciones</h4>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Fecha</th>
                  <th>Peso (kg)</th>
                  <th>Talla (m)</th>
                  <th>IMC</th>
                  <th>Cintura (cm)</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((registro) => (
                  <tr key={registro.id}>
                    <td className="fw-bold">{registro.fecha}</td>
                    <td>{registro.peso}</td>
                    <td>{registro.talla}</td>
                    <td>{registro.imc}</td>
                    <td>{registro.cintura}</td>
                    <td className="text-muted small">{registro.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progreso;