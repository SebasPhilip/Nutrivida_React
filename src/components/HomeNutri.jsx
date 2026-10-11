import React, { useState, useEffect } from 'react';
import { obtenerPerfilNutricionista } from '../data/nutricionistas';
import { obtenerCitas } from '../data/citas';
import { Link } from 'react-router-dom';

export const HomeNutri = () => {
  const [perfil, setPerfil] = useState(null);
  const [agenda, setAgenda] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    especialidad: '',
    correo: '',
    telefono: '',
    biografia: ''
  });

  useEffect(() => {
    const perfilGuardado = localStorage.getItem('perfilNutri_1');
    let miPerfil;
    
    if (perfilGuardado) {
      miPerfil = JSON.parse(perfilGuardado);
    } else {
      miPerfil = obtenerPerfilNutricionista("1");
    }
    
    setPerfil(miPerfil);
    setEditForm(miPerfil);

    const todasLasCitas = obtenerCitas();
    const misCitas = todasLasCitas.filter(cita => cita.nutricionistaId === "1" && cita.estado === 'ACTIVA');
    
    misCitas.sort((a, b) => new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`));
    setAgenda(misCitas);
  }, []);

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPerfil(editForm);
    localStorage.setItem('perfilNutri_1', JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(perfil);
    setIsEditing(false);
  };

  if (!perfil) return <div className="container mt-5">Cargando perfil...</div>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-success fw-bold mb-4">Mi Perfil y Agenda</h1>

      <div className="card shadow-sm p-4 mb-5 border-0" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img 
              src={perfil.imagen} 
              alt={perfil.nombre} 
              className="img-fluid rounded shadow-sm border border-success border-2"
              style={{ maxWidth: '250px' }}
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-success border-bottom border-success pb-2 mb-3 fw-bold">
              {perfil.nombre}
            </h2>
            
            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="mb-2">
                  <label className="fw-bold fs-6">Especialidad:</label>
                  <input type="text" className="form-control border-success" name="especialidad" value={editForm.especialidad} onChange={handleEditChange} required />
                </div>
                <div className="mb-2">
                  <label className="fw-bold fs-6">Correo Clínico:</label>
                  <input type="email" className="form-control border-success" name="correo" value={editForm.correo} onChange={handleEditChange} required />
                </div>
                <div className="mb-2">
                  <label className="fw-bold fs-6">Teléfono:</label>
                  <input type="text" className="form-control border-success" name="telefono" value={editForm.telefono} onChange={handleEditChange} required />
                </div>
                <div className="mb-3">
                  <label className="fw-bold fs-6">Biografía:</label>
                  <textarea className="form-control border-success" name="biografia" rows="3" value={editForm.biografia} onChange={handleEditChange} required></textarea>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success fw-bold px-4 py-2">Guardar Cambios</button>
                  <button type="button" className="btn btn-outline-danger fw-bold px-4 py-2" onClick={handleCancel}>Cancelar</button>
                </div>
              </form>
            ) : (
              <>
                <p className="mb-2 fs-5"><strong>Especialidad:</strong> {perfil.especialidad}</p>
                <p className="mb-2 fs-5"><strong>Correo Clínico:</strong> {perfil.correo}</p>
                <p className="mb-2 fs-5"><strong>Teléfono:</strong> {perfil.telefono}</p>
                <p className="mb-4 fs-5"><strong>Biografía:</strong> {perfil.biografia}</p>
                <button className="btn btn-success fw-bold px-4 py-2" onClick={() => setIsEditing(true)}>
                  Editar Mis Datos
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-success text-white py-3">
          <h3 className="m-0 fw-bold">Mi Agenda - Activas</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-center">Hora</th>
                  <th className="py-3">Fecha</th>
                  <th className="py-3">Motivo</th>
                  <th className="px-4 py-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {agenda.length > 0 ? (
                  agenda.map((cita) => (
                    <tr key={cita.id}>
                      <td className="px-4 py-3 text-center fw-bold fs-5">{cita.hora}</td>
                      <td className="py-3">{cita.fecha}</td>
                      <td className="py-3 text-capitalize">{cita.motivo}</td>
                      <td className="px-4 py-3 text-center">
                        <Link to="/gestionar-pacientes" className="btn btn-outline-success fw-bold btn-sm px-3">
                          Atender Ficha
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted fs-5">
                      No tienes pacientes confirmados para hoy.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};