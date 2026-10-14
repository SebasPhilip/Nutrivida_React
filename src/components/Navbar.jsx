import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [rolUsuario, setRolUsuario] = useState(null);
  
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const rol = localStorage.getItem('usuarioRol');
    setRolUsuario(rol);
    setMenuAbierto(false);
  }, [location.pathname]);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRol'); 
    setRolUsuario(null); 
    setMenuAbierto(false);
    navigate('/'); 
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        <Link 
          className="navbar-brand fw-bold text-success fs-3" 
          to={rolUsuario === 'Admin' ? '/admin' : (rolUsuario === 'Nutri' ? '/perfil-nutricionista' : '/')}
        >
          NutriVida
        </Link>
        
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5 d-flex align-items-lg-center gap-2 mt-3 mt-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link" to={rolUsuario === 'Admin' ? '/admin' : (rolUsuario === 'Nutri' ? '/perfil-nutricionista' : '/')}>
                Home
              </Link>
            </li>

            {rolUsuario !== 'Nutri' && rolUsuario !== 'Admin' && (
              <>
                {rolUsuario && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/progreso">Mi Progreso</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/planes">Planes</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>
          
          <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center mt-3 mt-lg-0 pb-3 pb-lg-0">
            {rolUsuario !== 'Nutri' && rolUsuario !== 'Admin' && (
              <Link to="/carrito" className="btn btn-success px-4">
                Carrito
              </Link>
            )}

            {rolUsuario === 'Nutri' ? (
              <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
                <Link to="/perfil-nutricionista" className="btn btn-outline-success px-3 fw-bold">
                  Mi Agenda
                </Link>
                <button onClick={cerrarSesion} className="btn btn-outline-danger px-3">
                  Cerrar Sesión
                </button>
              </div>
            ) : rolUsuario === 'Admin' ? (
              <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
                <button onClick={cerrarSesion} className="btn btn-outline-danger px-3">
                  Cerrar Sesión
                </button>
              </div>
            ) : rolUsuario ? (
              <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
                <Link to="/citas" className="btn btn-outline-primary px-3">
                  Mis Citas
                </Link>
                <button onClick={cerrarSesion} className="btn btn-outline-danger px-3">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary px-3">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn btn-primary px-3">
                  Crear Cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;