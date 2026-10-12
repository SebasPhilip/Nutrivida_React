import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerResumenFinanciero, obtenerProductosInventario, obtenerPlanesInventario } from '../data/adminInventario';

const AdminInventario = () => {
  const [resumen, setResumen] = useState(null);
  const [productos, setProductos] = useState([]);
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    setResumen(obtenerResumenFinanciero());
    setProductos(obtenerProductosInventario());
    setPlanes(obtenerPlanesInventario());
  }, []);

  const formatearDinero = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  };

  if (!resumen) return <div className="container mt-5">Cargando datos...</div>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-success fw-bold mb-4">Gestión de Inventario y Ventas</h1>
      
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <Link to="/admin" className="btn btn-outline-success fw-bold px-4">Consultar Métricas</Link>
        <Link to="/admin-inventario" className="btn btn-success fw-bold px-4">Gestión de Inventario</Link>
        <Link to="/admin-profesionales" className="btn btn-outline-success fw-bold px-4">Profesionales y Citas</Link>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body p-4">
          <h4 className="text-success fw-bold mb-4">Resumen Financiero Mensual</h4>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm h-100">
                <h5 className="text-success fw-bold mb-3">Ventas de Productos</h5>
                <p className="display-5 fw-bold text-dark mb-2">{resumen.ventasMes}</p>
                <p className="text-muted mb-0 fw-bold">Unidades vendidas</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm h-100">
                <h5 className="text-success fw-bold mb-3">Ganancias Totales</h5>
                <p className="display-5 fw-bold text-dark mb-2">{formatearDinero(resumen.gananciasMes)}</p>
                <p className="text-muted mb-0 fw-bold">Ingresos del mes</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 border border-success bg-white shadow-sm h-100">
                <h5 className="text-success fw-bold mb-3">Planes Contratados</h5>
                <p className="display-5 fw-bold text-dark mb-2">{resumen.planesContratados}</p>
                <p className="text-muted mb-0 fw-bold">Nuevas suscripciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-success text-white py-3">
              <h5 className="m-0 fw-bold">Inventario de Productos</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-center">
                  <thead className="table-light">
                    <tr>
                      <th className="text-start px-4 py-3">Producto</th>
                      <th className="py-3">Precio</th>
                      <th className="py-3">Stock</th>
                      <th className="px-4 py-3">Vendidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(prod => (
                      <tr key={prod.id}>
                        <td className="text-start px-4 fw-bold text-nowrap">
                          {prod.nombre}
                          <br/><span className="badge bg-secondary mt-1">{prod.categoria}</span>
                        </td>
                        <td>{formatearDinero(prod.precio)}</td>
                        <td>
                          <span className={`badge ${prod.stock < 20 ? 'bg-danger' : 'bg-success'} fs-6`}>
                            {prod.stock} uds
                          </span>
                        </td>
                        <td className="px-4 fw-bold">{prod.ventas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-success text-white py-3">
              <h5 className="m-0 fw-bold">Rendimiento de Planes</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-center">
                  <thead className="table-light">
                    <tr>
                      <th className="text-start px-4 py-3">Plan</th>
                      <th className="py-3">Precio</th>
                      <th className="px-4 py-3">Contratados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planes.map(plan => (
                      <tr key={plan.id}>
                        <td className="text-start px-4 fw-bold">
                          {plan.nombre}
                          <br/><span className="badge bg-secondary mt-1">{plan.categoria}</span>
                        </td>
                        <td>{formatearDinero(plan.precio)}</td>
                        <td className="px-4">
                          <span className="badge bg-primary fs-6">{plan.contratados} activos</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventario;