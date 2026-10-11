import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [rolUsuario, setRolUsuario] = useState(null);


  useEffect(() => {
    const rol = localStorage.getItem('usuarioRol');
    setRolUsuario(rol);
  }, [location.pathname]);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioRol');
    setRolUsuario(null);
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">NutriVida</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planes">Planes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>
          
          
          <div className="d-flex gap-3 align-items-center">
            <Link to="/carrito" className="btn btn-success px-4">
              Carrito
            </Link>

            
            {rolUsuario ? (
              <>
                <span className="text-muted fw-bold ms-2">Rol: {rolUsuario}</span>
                <button onClick={cerrarSesion} className="btn btn-outline-danger px-3">
                  Cerrar Sesión
                </button>
              </>
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