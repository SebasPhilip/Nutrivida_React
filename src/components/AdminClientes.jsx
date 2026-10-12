import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerResumenPlanes, obtenerClientes } from '../data/clientesPlanes';

export const AdminClientes = () => {
  const [resumen, setResumen] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setResumen(obtenerResumenPlanes());
    setClientes(obtenerClientes());
  }, []);

  if (!resumen) return <div className="container mt-5">Cargando datos...</div>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-success fw-bold mb-4">Gestión de Clientes y Planes</h1>
      
      <div className="d-flex gap-3 mb-4">
        <Link to="/admin" className="btn btn-secondary fw-bold px-4">Estadísticas Generales</Link>
        <Link to="/admin-clientes" className="btn btn-success fw-bold px-4">Ver Clientes y Planes</Link>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body p-4">
          <h4 className="text-success fw-bold mb-2">Resumen de Planes Activos</h4>
          <p className="text-muted mb-4">Distribución actual de los servicios contratados por los pacientes.</p>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm">
                <h5 className="text-success fw-bold mb-3">Pérdida de Peso (1 mes)</h5>
                <p className="display-4 fw-bold text-dark mb-2">{resumen.perdidaPeso}</p>
                <p className="text-muted mb-0 fw-bold">Pacientes activos</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm">
                <h5 className="text-success fw-bold mb-3">Nutrición Deportiva</h5>
                <p className="display-4 fw-bold text-dark mb-2">{resumen.nutricionDeportiva}</p>
                <p className="text-muted mb-0 fw-bold">Pacientes activos</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm">
                <h5 className="text-success fw-bold mb-3">Controles Individuales</h5>
                <p className="display-4 fw-bold text-dark mb-2">{resumen.controlesIndividuales}</p>
                <p className="text-muted mb-0 fw-bold">Pacientes recurrentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-success text-white py-3">
          <h4 className="m-0 fw-bold">Listado de Clientes (Últimos Registros)</h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Paciente</th>
                  <th className="py-3">Plan / Servicio Contratado</th>
                  <th className="py-3 text-center">Estado</th>
                  <th className="px-4 py-3">Profesional Asignado</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td className="px-4 fw-bold">{cliente.nombre}</td>
                    <td>{cliente.plan}</td>
                    <td className="text-center">
                      <span className={`badge ${cliente.estado === 'Activo' ? 'bg-success' : 'bg-warning text-dark'} fs-6`}>
                        {cliente.estado}
                      </span>
                    </td>
                    <td className="px-4">{cliente.profesional}</td>
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