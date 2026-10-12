import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../data/usuarios';

const Registro = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', correo: '', password: ''
  });
  const [mensaje, setMensaje] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = registrarUsuario(formData);
    
    if (resultado.exito) {
      alert("¡Cuenta creada con éxito! .");
      navigate('/login'); 
    } else {
      setMensaje(resultado.mensaje);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center text-success mb-4">Crear Cuenta</h2>
      <div className="card shadow p-4">
        {mensaje && <div className="alert alert-danger">{mensaje}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input type="text" name="apellido" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" name="correo" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;