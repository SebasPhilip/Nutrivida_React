export const BoletaExito = ({ total, datosPago, onFinalizar }) => {
  return (
    <div className="row justify-content-center text-center">
      <div className="col-md-6">
        <div className="card shadow-sm border-0 p-5">
          <div className="mb-4">
            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
              <span className="text-white fs-1 fw-bold">✓</span>
            </div>
          </div>
          <h2 className="text-success fw-bold mb-3">¡Pago Exitoso!</h2>
          <p className="text-muted fs-5 mb-4">Tu pedido ha sido procesado correctamente. Hemos enviado el comprobante a tu correo.</p>
          
          <div className="bg-light p-3 rounded text-start mb-4">
            <p className="mb-1"><strong>Titular:</strong> {datosPago.nombre.toUpperCase() || 'CLIENTE NUTRIVIDA'}</p>
            <p className="mb-1"><strong>Monto pagado:</strong> ${total.toLocaleString('es-CL')}</p>
            <p className="mb-0"><strong>N° Orden:</strong> #NV-{Math.floor(Math.random() * 90000) + 10000}</p>
          </div>

          <button className="btn btn-success px-5 py-2 fw-bold" onClick={onFinalizar}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};