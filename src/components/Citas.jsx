import React, { useState, useEffect } from 'react';
import { obtenerCitas, crearCita, cancelarCita } from '../data/citas';

const CalendarioBlanco = ({ fechaSeleccionada, setFechaSeleccionada, minDate, maxDate, onClose }) => {
  const [mesActual, setMesActual] = useState(new Date(minDate));

  const diasSemana = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(mesActual.getFullYear(), mesActual.getMonth() + incremento, 1);
    const min = new Date(minDate);
    const max = new Date(maxDate);
    min.setDate(1);
    max.setDate(1);
    
    if (nuevaFecha >= min && nuevaFecha <= max) {
      setMesActual(nuevaFecha);
    }
  };

  const obtenerDiasMes = (año, mes) => {
    return new Date(año, mes + 1, 0).getDate();
  };

  const obtenerPrimerDiaMes = (año, mes) => {
    let dia = new Date(año, mes, 1).getDay();
    return dia === 0 ? 6 : dia - 1; 
  };

  const diasEnMes = obtenerDiasMes(mesActual.getFullYear(), mesActual.getMonth());
  const primerDia = obtenerPrimerDiaMes(mesActual.getFullYear(), mesActual.getMonth());
  
  const dias = [];
  for (let i = 0; i < primerDia; i++) {
    dias.push(null);
  }
  for (let i = 1; i <= diasEnMes; i++) {
    dias.push(i);
  }

  const esDiaValido = (dia) => {
    if (!dia) return false;
    const fechaEvaluada = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
    const min = new Date(minDate + 'T00:00:00');
    const max = new Date(maxDate + 'T00:00:00');
    const diaSemana = fechaEvaluada.getDay();
    
    return fechaEvaluada >= min && fechaEvaluada <= max && diaSemana !== 0 && diaSemana !== 6;
  };

  const handleSeleccionar = (dia) => {
    if (esDiaValido(dia)) {
      const mesStr = (mesActual.getMonth() + 1).toString().padStart(2, '0');
      const diaStr = dia.toString().padStart(2, '0');
      setFechaSeleccionada(`${mesActual.getFullYear()}-${mesStr}-${diaStr}`);
      if (onClose) onClose();
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#198754', borderRadius: '10px', padding: '15px', width: '100%', border: '1px solid #198754', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h6 className="m-0 fw-bold">{meses[mesActual.getMonth()]} de {mesActual.getFullYear()}</h6>
        <div>
          <button type="button" onClick={() => cambiarMes(-1)} className="btn btn-sm text-success border-0 fs-5 px-2 py-0">▲</button>
          <button type="button" onClick={() => cambiarMes(1)} className="btn btn-sm text-success border-0 fs-5 px-2 py-0">▼</button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', marginBottom: '10px' }}>
        {diasSemana.map(d => (
          <div key={d} style={{ fontWeight: 'bold', fontSize: '0.9rem', paddingBottom: '10px' }}>{d}</div>
        ))}
        
        {dias.map((dia, index) => {
          const valido = esDiaValido(dia);
          const fechaEvalStr = dia ? `${mesActual.getFullYear()}-${(mesActual.getMonth() + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}` : '';
          const seleccionado = fechaSeleccionada === fechaEvalStr;

          return (
            <div 
              key={index} 
              onClick={() => handleSeleccionar(dia)}
              style={{
                height: '35px',
                width: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                borderRadius: '50%',
                cursor: valido ? 'pointer' : 'default',
                backgroundColor: seleccionado ? '#198754' : 'transparent',
                color: seleccionado ? '#ffffff' : (valido ? '#198754' : '#d1d1d1'),
                fontWeight: seleccionado ? 'bold' : 'normal',
                transition: 'background-color 0.2s'
              }}
            >
              {dia || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Citas = () => {
  const [misCitas, setMisCitas] = useState([]);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [formData, setFormData] = useState({
    nutricionistaId: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  useEffect(() => {
    setMisCitas(obtenerCitas());
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFechaCambio = (nuevaFecha) => {
    setFormData({
      ...formData,
      fecha: nuevaFecha
    });
  };

  const formatearFechaDisplay = (fechaIso) => {
    if (!fechaIso) return 'dd/mm/yyyy';
    const [year, month, day] = fechaIso.split('-');
    return `${day}/${month}/${year}`;
  };

  const hoy = new Date();
  const minDate = hoy.toISOString().split('T')[0];
  const maxFecha = new Date(hoy);
  maxFecha.setMonth(maxFecha.getMonth() + 3);
  const maxDate = maxFecha.toISOString().split('T')[0];

  const generarHorarios = () => {
    const horarios = [];
    for (let h = 9; h <= 18; h++) {
      const horaStr = h.toString().padStart(2, '0');
      horarios.push(`${horaStr}:00`);
      if (h !== 18) {
        horarios.push(`${horaStr}:30`);
      }
    }
    return horarios;
  };

  const citasActivas = misCitas.filter(c => c.estado === 'ACTIVA');
  const tieneCitaActiva = citasActivas.length > 0;

  const handleAgendar = (e) => {
    e.preventDefault();

    if (tieneCitaActiva) {
      alert("Ya tienes una cita programada. Cancélala si deseas agendar una nueva.");
      return;
    }

    if (!formData.fecha) {
      alert("Por favor, selecciona una fecha en el calendario.");
      return;
    }
    
    const nombres = {
      "1": "Nut. Carolina Fuentes M.",
      "2": "Nut. Rodrigo Sepúlveda A.",
      "3": "Nut. Daniela Morales C.",
      "4": "Nut. Felipe Araya R."
    };
    
    const citaConNombre = {
      ...formData,
      nombreNutricionista: nombres[formData.nutricionistaId]
    };

    crearCita(citaConNombre);
    setMisCitas(obtenerCitas());
    setFormData({ nutricionistaId: '', fecha: '', hora: '', motivo: '' });
    alert("¡Cita agendada con éxito!");
  };

  const handleCancelar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta hora?")) {
      cancelarCita(id);
      setMisCitas(obtenerCitas());
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center text-success mb-5 fw-bold">Gestión de Citas</h1>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4 h-100">
            <h2 className="text-success text-center mb-4">Mi Próxima Cita</h2>
            {tieneCitaActiva ? (
              citasActivas.map(cita => (
                <div key={cita.id} className="cita-activa border-bottom pb-3 mb-3">
                  <p className="mb-1"><strong>Nutricionista:</strong> {cita.nombreNutricionista}</p>
                  <p className="mb-1"><strong>Fecha:</strong> {cita.fecha}</p>
                  <p className="mb-1"><strong>Hora:</strong> {cita.hora} hrs</p>
                  <p className="mb-3"><strong>Motivo:</strong> {cita.motivo}</p>
                  <button className="btn btn-outline-danger w-100 fw-bold" onClick={() => handleCancelar(cita.id)}>
                    Cancelar Hora
                  </button>
                </div>
              ))
            ) : (
              <div className="d-flex h-100 align-items-center justify-content-center">
                <p className="text-muted fs-5">No tienes citas programadas.</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4 h-100">
            <h2 className="text-success text-center mb-4">Agendar Nueva Cita</h2>
            
            {tieneCitaActiva ? (
              <div className="d-flex h-100 flex-column align-items-center justify-content-center text-center">
                <div className="alert alert-warning w-100 border-warning">
                  <h5 className="alert-heading fw-bold">¡Atención!</h5>
                  <p className="mb-0">Ya tienes una evaluación agendada.</p>
                  <hr />
                  <p className="mb-0 small">Si deseas cambiar la fecha u hora, primero debes <strong>cancelar</strong> tu cita actual en el panel de la izquierda.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAgendar}>
                <div className="mb-4">
                  <label className="form-label fw-bold text-dark text-center w-100">Nutricionista:</label>
                  <select className="form-select border-success" name="nutricionistaId" value={formData.nutricionistaId} onChange={handleChange} required>
                    <option value="">-- Selecciona un profesional --</option>
                    <option value="1">Nut. Carolina Fuentes M.</option>
                    <option value="2">Nut. Rodrigo Sepúlveda A.</option>
                    <option value="3">Nut. Daniela Morales C.</option>
                    <option value="4">Nut. Felipe Araya R.</option>
                  </select>
                </div>
                
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label fw-bold text-dark text-center w-100">Fecha:</label>
                    <div className="position-relative">
                      <button 
                        type="button" 
                        className="form-select border-success text-start d-flex justify-content-between align-items-center"
                        onClick={() => setMostrarCalendario(!mostrarCalendario)}
                      >
                        <span className={formData.fecha ? 'text-dark' : 'text-muted'}>
                          {formatearFechaDisplay(formData.fecha)}
                        </span>
                      </button>
                      
                      {mostrarCalendario && (
                        <div className="position-absolute mt-1" style={{ zIndex: 1000, width: '100%', minWidth: '280px' }}>
                          <CalendarioBlanco 
                            fechaSeleccionada={formData.fecha} 
                            setFechaSeleccionada={handleFechaCambio} 
                            minDate={minDate} 
                            maxDate={maxDate}
                            onClose={() => setMostrarCalendario(false)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark text-center w-100">Hora:</label>
                    <select className="form-select border-success" name="hora" value={formData.hora} onChange={handleChange} required>
                      <option value="">-- Selecciona la hora --</option>
                      {generarHorarios().map(hora => (
                        <option key={hora} value={hora}>{hora}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-dark text-center w-100">Motivo:</label>
                  <select className="form-select border-success" name="motivo" value={formData.motivo} onChange={handleChange} required>
                    <option value="">-- Selecciona el motivo --</option>
                    <option value="primera">Primera consulta</option>
                    <option value="control">Control de seguimiento</option>
                    <option value="plan">Entrega de plan alimenticio</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-success w-100 fw-bold py-2 mt-3">
                  Confirmar y Agendar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};