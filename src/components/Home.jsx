import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [rolUsuario, setRolUsuario] = useState(null);

  useEffect(() => {
    const rol = localStorage.getItem('usuarioRol');
    setRolUsuario(rol);
  }, []);

  return (
    <div>
      <div 
        className="bg-success text-white text-center d-flex flex-column justify-content-center align-items-center px-3" 
        style={{ minHeight: '60vh', padding: '100px 0' }}
      >
        <h1 className="display-4 fw-bold mb-4" style={{ letterSpacing: '-1px' }}>
          Transforma tu vida con NutriVida
        </h1>
        <p className="lead mb-5" style={{ maxWidth: '800px', fontSize: '1.25rem' }}>
          Alcanza tus objetivos de salud y bienestar con nuestros planes personalizados de nutrición y entrenamiento.
        </p>
        
        {rolUsuario === 'Nutri' ? (
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <Link to="/perfil-nutricionista" className="btn btn-light text-success btn-lg fw-bold px-4 py-2 rounded-pill shadow-sm">
              Gestionar Agenda
            </Link>
            <Link to="/gestionar-pacientes" className="btn btn-outline-light btn-lg fw-bold px-4 py-2 rounded-pill shadow-sm border-2">
              Gestionar Pacientes
            </Link>
          </div>
        ) : (
          <Link to="/planes" className="btn btn-light text-success btn-lg fw-bold px-5 py-2 rounded-pill shadow-sm">
            Explorar Planes
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;