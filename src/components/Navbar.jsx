const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
      <div className="container">
        
        <a className="navbar-brand fw-bold text-success" href="#">NutriVida</a>
        
       
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
       
        <div className="collapse navbar-collapse" id="navbarNav">
          
          
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Categorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ofertas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>
          
         
          <div className="d-flex gap-2 align-items-center">
            <button className="btn btn-success">
                 Carrito $5.000
            </button>
            <button className="btn btn-outline-primary">
              Iniciar Sesión
            </button>
            <button className="btn btn-primary">
              Crear Cuenta
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;