import { useState } from 'react';

export const FormularioPago = ({ total, onVolver, onPagoExitoso }) => {
  const [procesando, setProcesando] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombre: '',
    tarjeta: '',
    fecha: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setDatosPago({
      ...datosPago,
      [e.target.name]: e.target.value
    });
  };

  const simularProcesamiento = (e) => {
    e.preventDefault();
    setProcesando(true);
    
    setTimeout(() => {
      setProcesando(false);
      onPagoExitoso(datosPago);
    }, 2000);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow border-0">
          <div className="card-header bg-success text-white text-center py-3">
            <h4 className="mb-0 fw-bold">Pasarela de Pago Segura</h4>
          </div>
          <div className="card-body p-4">
            <h5 className="text-center mb-4">Total a pagar: <span className="text-success fw-bold">${total.toLocaleString('es-CL')}</span></h5>
            
            <form onSubmit={simularProcesamiento}>
              <div className="mb-3">
                <label className="form-label text-muted">Nombre en la tarjeta</label>
                <input type="text" name="nombre" className="form-control" placeholder="Ej: Juan Pérez" required onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Número de la tarjeta</label>
                <input type="text" name="tarjeta" className="form-control" placeholder="0000 0000 0000 0000" maxLength="16" required onChange={handleInputChange} />
              </div>
              <div className="row mb-4">
                <div className="col-6">
                  <label className="form-label text-muted">Vencimiento</label>
                  <input type="text" name="fecha" className="form-control" placeholder="MM/YY" maxLength="5" required onChange={handleInputChange} />
                </div>
                <div className="col-6">
                  <label className="form-label text-muted">CVV</label>
                  <input type="text" name="cvv" className="form-control" placeholder="123" maxLength="3" required onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success fw-bold py-2" disabled={procesando}>
                  {procesando ? 'Procesando pago con el banco...' : 'Confirmar Pago'}
                </button>
                <button type="button" className="btn btn-outline-secondary py-2" onClick={onVolver} disabled={procesando}>
                  Volver al carrito
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};