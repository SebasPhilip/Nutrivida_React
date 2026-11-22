import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credenciales, setCredenciales] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const sesion = await login(credenciales.correo, credenciales.password);
      alert(`¡Bienvenido ${sesion.nombre}! Has iniciado sesión con rol: ${sesion.rol}`);

      if (sesion.rol === 'Admin') {
        navigate('/admin');
      } else if (sesion.rol === 'Nutri') {
        navigate('/perfil-nutricionista');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.error ?? 'Correo o contraseña incorrectos. Acceso denegado.');
      } else {
        setError('No hubo respuesta del servidor. Revisa que el backend esté corriendo.');
      }
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