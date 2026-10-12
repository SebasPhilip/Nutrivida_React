import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Admin = () => {
  const datosPorMes = {
    actual: {
      atenciones: 142,
      inasistencia: "12%",
      carolina: { cantidad: 65, ancho: '45%' },
      rodrigo: { cantidad: 45, ancho: '31%' },
      daniela: { cantidad: 32, ancho: '24%' }
    },
    anterior: {
      atenciones: 115,
      inasistencia: "18%",
      carolina: { cantidad: 50, ancho: '43%' },
      rodrigo: { cantidad: 40, ancho: '35%' },
      daniela: { cantidad: 25, ancho: '22%' }
    }
  };

  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('actual');
  const [metricas, setMetricas] = useState(datosPorMes.actual);
  const [cargando, setCargando] = useState(false);

  const handleActualizar = () => {
    setCargando(true);
    
    setTimeout(() => {
      setMetricas(datosPorMes[periodoSeleccionado]);
      setCargando(false);
    }, 400);
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-success fw-bold mb-4">Panel de Administración</h1>
      
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <Link to="/admin" className="btn btn-success fw-bold px-4">Consultar Métricas</Link>
        <Link to="/admin-inventario" className="btn btn-outline-success fw-bold px-4">Gestión de Inventario</Link>
        <Link to="/admin-profesionales" className="btn btn-outline-success fw-bold px-4">Profesionales y Citas</Link>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body">
          <h4 className="text-success fw-bold mb-3">Filtro de Período</h4>
          <div className="d-flex gap-3 align-items-center flex-wrap">
            <select 
              className="form-select border-success shadow-sm" 
              style={{ maxWidth: '300px' }}
              value={periodoSeleccionado}
              onChange={(e) => setPeriodoSeleccionado(e.target.value)}
            >
              <option value="actual">Mes Actual (Octubre 2026)</option>
              <option value="anterior">Mes Anterior (Septiembre 2026)</option>
            </select>
            <button 
              className="btn btn-success fw-bold px-4 shadow-sm"
              onClick={handleActualizar}
              disabled={cargando}
            >
              {cargando ? 'Cargando datos...' : 'Actualizar Datos'}
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4" style={{ opacity: cargando ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="card shadow-sm border-0 h-100 text-center py-4">
            <h4 className="text-muted fw-bold">Atenciones por Período</h4>
            <p className="display-3 fw-bold text-success m-3">{metricas.atenciones}</p>
            <p className="text-muted mb-0">Citas realizadas exitosamente.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100 text-center py-4">
            <h4 className="text-muted fw-bold">Tasa de Inasistencia</h4>
            <p className="display-3 fw-bold text-dark m-3">{metricas.inasistencia}</p>
            <p className="text-muted mb-0">Pacientes que no se presentaron.</p>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0" style={{ opacity: cargando ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <div className="card-body p-4">
          <h4 className="text-success fw-bold mb-2">Distribución por Nutricionista</h4>
          
          <div className="mb-4 mt-4">
            <p className="mb-1 fw-bold fs-5">
              Nut. Carolina Fuentes M. <span className="text-muted fw-normal fs-6">({metricas.carolina.cantidad} atenciones)</span>
            </p>
            <div className="progress shadow-sm" style={{ height: '22px' }}>
              <div className="progress-bar bg-success" style={{ width: metricas.carolina.ancho, transition: 'width 0.5s' }}></div>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 fw-bold fs-5">
              Nut. Rodrigo Sepúlveda A. <span className="text-muted fw-normal fs-6">({metricas.rodrigo.cantidad} atenciones)</span>
            </p>
            <div className="progress shadow-sm" style={{ height: '22px' }}>
              <div className="progress-bar" style={{ width: metricas.rodrigo.ancho, backgroundColor: '#20c997', transition: 'width 0.5s' }}></div>
            </div>
          </div>

          <div className="mb-2">
            <p className="mb-1 fw-bold fs-5">
              Nut. Daniela Morales C. <span className="text-muted fw-normal fs-6">({metricas.daniela.cantidad} atenciones)</span>
            </p>
            <div className="progress shadow-sm" style={{ height: '22px' }}>
              <div className="progress-bar" style={{ width: metricas.daniela.ancho, backgroundColor: '#75b798', transition: 'width 0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};