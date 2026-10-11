const Contacto = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">Contáctanos</h2>
        <p className="text-muted">Estamos aquí para ayudarte a lograr tus objetivos nutricionales.</p>
      </div>

      <div className="row g-4">
        
        <div className="col-md-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold mb-4 text-primary">Información de la Clínica</h4>
              
              <div className="d-flex align-items-start mb-3">

                <div>
                  <h6 className="fw-bold mb-1">Dirección</h6>
                  <p className="text-muted mb-0">Av. Colo Colo 1234, Temuco</p>
                  <p className="text-muted small">Región de La Araucanía</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div>
                  <h6 className="fw-bold mb-1">Teléfono</h6>
                  <p className="text-muted mb-0">+56 9 1234 5678</p>
                  <p className="text-muted small">Lunes a Viernes, 09:00 - 18:00 hrs</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div>
                  <h6 className="fw-bold mb-1">Correo Electrónico</h6>
                  <p className="text-muted mb-0">contacto@nutrivida.cl</p>
                </div>
              </div>

              <hr />
              
              <h6 className="fw-bold mt-4 mb-2">Síguenos en nuestras redes</h6>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm">Facebook</button>
                <button className="btn btn-outline-secondary btn-sm">Instagram</button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="col-md-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h4 className="card-title fw-bold mb-4">Envíanos un mensaje</h4>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado. Te contactaremos pronto.'); }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input type="text" className="form-control" placeholder="Ej. Juan Pérez" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" placeholder="tu@correo.com" required />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Asunto</label>
                  <select className="form-select" required>
                    <option value="">Selecciona un motivo...</option>
                    <option value="1">Consulta sobre planes nutricionales</option>
                    <option value="2">Dudas sobre productos/suplementos</option>
                    <option value="3">Problemas con el agendamiento</option>
                    <option value="4">Otro</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje aquí..." required></textarea>
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;