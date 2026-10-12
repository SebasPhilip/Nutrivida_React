import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarLogin } from '../data/usuarios';

const Login = () => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resultado = validarLogin(credenciales.correo, credenciales.password);
    
    if (resultado.exito) {
      const { rol, nombre } = resultado.usuario;
      
      localStorage.setItem('usuarioRol', rol);
      
      alert(`¡Bienvenido ${nombre}! Has iniciado sesión con rol: ${rol}`);
      
      if (rol === 'Admin') {
        navigate('/admin'); 
      } else if (rol === 'Nutri') {
        navigate('/perfil-nutricionista');
      } else {
        navigate('/'); 
      }
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow border-0 p-4">
        <h2 className="text-center text-primary mb-4 fw-bold">Iniciar Sesión</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              name="correo"
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              name="password"
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-outline-primary w-100 py-2 fw-bold">Ingresar</button>
        </form>
        
        <div className="text-center mt-4">
          <span className="text-muted">¿No tienes cuenta? </span>
          <Link to="/registro" className="text-primary text-decoration-none fw-bold">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;