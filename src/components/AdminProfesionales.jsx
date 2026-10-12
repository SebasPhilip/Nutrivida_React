import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerResumenAtenciones, obtenerProfesionalesCitas } from '../data/adminProfesionales';

export const AdminProfesionales = () => {
  const [resumen, setResumen] = useState(null);
  const [citasData, setCitasData] = useState([]);

  useEffect(() => {
    setResumen(obtenerResumenAtenciones());
    setCitasData(obtenerProfesionalesCitas());
  }, []);

  const getBadgeClass = (estado) => {
    switch(estado) {
      case 'Completada': return 'bg-success';
      case 'Programada': return 'bg-primary';
      case 'En Curso': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  };

  if (!resumen) return <div className="container mt-5">Cargando datos...</div>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-success fw-bold mb-4">Gestión de Profesionales y Citas</h1>
      
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <Link to="/admin" className="btn btn-outline-success fw-bold px-4">Consultar Métricas</Link>
        <Link to="/admin-inventario" className="btn btn-outline-success fw-bold px-4">Gestión de Inventario</Link>
        <Link to="/admin-profesionales" className="btn btn-success fw-bold px-4">Profesionales y Citas</Link>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body p-4">
          <h4 className="text-success fw-bold mb-2">Resumen de Atenciones</h4>
          <p className="text-muted mb-4">Distribución actual de los servicios y carga de profesionales.</p>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm">
                <h5 className="text-success fw-bold mb-3">Nutricionistas Activos</h5>
                <p className="display-4 fw-bold text-dark mb-2">{resumen.nutricionistasActivos}</p>
                <p className="text-muted mb-0 fw-bold">En el sistema</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm">
                <h5 className="text-success fw-bold mb-3">Citas Programadas</h5>
                <p className="display-4 fw-bold text-dark mb-2">{resumen.citasProgramadas}</p>
                <p className="text-muted mb-0 fw-bold">Para esta semana</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm">
                <h5 className="text-success fw-bold mb-3">Controles Finalizados</h5>
                <p className="display-4 fw-bold text-dark mb-2">{resumen.controlesFinalizados}</p>
                <p className="text-muted mb-0 fw-bold">En el mes actual</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-success text-white py-3">
          <h4 className="m-0 fw-bold">Listado de Citas y Profesionales (Últimos Registros)</h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Profesional Asignado</th>
                  <th className="py-3">Paciente</th>
                  <th className="py-3">Plan / Servicio Contratado</th>
                  <th className="px-4 py-3 text-center">Estado de la Cita</th>
                </tr>
              </thead>
              <tbody>
                {citasData.map(cita => (
                  <tr key={cita.id}>
                    <td className="px-4 fw-bold">{cita.profesional}</td>
                    <td>{cita.paciente}</td>
                    <td>{cita.plan}</td>
                    <td className="px-4 text-center">
                      <span className={`badge ${getBadgeClass(cita.estado)} fs-6`}>
                        {cita.estado}
                      </span>
                    </td>
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