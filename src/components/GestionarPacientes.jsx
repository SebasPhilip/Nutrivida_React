import React, { useState, useEffect } from 'react';
import { obtenerPacientes, obtenerMediciones, guardarMedicion } from '../data/mediciones';
import { Link } from 'react-router-dom';

export const GestionarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('');
  const [historial, setHistorial] = useState([]);
  
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    peso: '',
    estatura: '',
    cintura: '',
    observaciones: ''
  });

  useEffect(() => {
    setPacientes(obtenerPacientes());
  }, []);

  useEffect(() => {
    if (pacienteSeleccionado) {
      setHistorial(obtenerMediciones(pacienteSeleccionado));
    } else {
      setHistorial([]);
    }
  }, [pacienteSeleccionado]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarMedicion(pacienteSeleccionado, formData);
    setHistorial(obtenerMediciones(pacienteSeleccionado));
    
    setFormData({
      fecha: formData.fecha,
      peso: '',
      estatura: '',
      cintura: '',
      observaciones: ''
    });
    alert('Medición registrada con éxito');
  };

  const nombrePacienteActual = pacientes.find(p => p.id === pacienteSeleccionado)?.nombre;

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success fw-bold m-0">Gestión de Pacientes</h1>
        <Link to="/perfil-nutricionista" className="btn btn-outline-success fw-bold">
          Volver a Mi Agenda
        </Link>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body">
          <h4 className="text-success mb-3 fw-bold">Seleccionar Paciente</h4>
          <p className="text-muted mb-3">Busca en tu lista de pacientes asignados para registrar controles o ver su evolución.</p>
          <select 
            className="form-select form-select-lg border-success" 
            value={pacienteSeleccionado}
            onChange={(e) => setPacienteSeleccionado(e.target.value)}
          >
            <option value="">- Selecciona un paciente de tu agenda -</option>
            {pacientes.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {pacienteSeleccionado && (
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm h-100 border-0 border-top border-success border-4">
              <div className="card-body p-4">
                <h4 className="text-success fw-bold mb-4">Nueva Medición</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fecha" className="form-label fw-bold">Fecha de Control</label>
                    <input type="date" className="form-control" id="fecha" value={formData.fecha} onChange={handleChange} required />
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="peso" className="form-label fw-bold">Peso (kg)</label>
                      <input type="number" step="0.1" min="0" className="form-control" id="peso" placeholder="75.5" value={formData.peso} onChange={handleChange} required />
                    </div>
                    <div className="col-6">
                      <label htmlFor="estatura" className="form-label fw-bold">Estatura (cm)</label>
                      <input type="number" min="0" className="form-control" id="estatura" placeholder="175" value={formData.estatura} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cintura" className="form-label fw-bold">Cintura (cm)</label>
                    <input type="number" step="0.1" min="0" className="form-control" id="cintura" placeholder="90" value={formData.cintura} onChange={handleChange} required />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="observaciones" className="form-label fw-bold">Observaciones Clínicas</label>
                    <textarea className="form-control" id="observaciones" rows="3" placeholder="Anota recomendaciones o cambios..." value={formData.observaciones} onChange={handleChange}></textarea>
                  </div>

                  <button type="submit" className="btn btn-success w-100 fw-bold py-2">
                    Guardar Ficha
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-header bg-success text-white py-3">
                <h4 className="m-0 fw-bold">Historial Clínico: {nombrePacienteActual}</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th className="py-3">Fecha</th>
                        <th className="py-3">Peso</th>
                        <th className="py-3">Estatura</th>
                        <th className="py-3">Cintura</th>
                        <th className="py-3 text-success">IMC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.length > 0 ? (
                        historial.map(registro => (
                          <tr key={registro.id}>
                            <td className="fw-bold">{registro.fecha}</td>
                            <td>{registro.peso} kg</td>
                            <td>{registro.estatura} cm</td>
                            <td>{registro.cintura} cm</td>
                            <td className="fw-bold text-success fs-5">{registro.imc}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-5 text-muted">
                            No hay registros clínicos previos para este paciente.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};