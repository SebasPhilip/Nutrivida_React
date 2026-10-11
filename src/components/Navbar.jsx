import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        
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
              <Link className="nav-link" to="/categorias">Categorías</Link>
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
            <Link to="/login" className="btn btn-outline-primary px-3">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-primary px-3">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;