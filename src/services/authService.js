import api from './http';

const BASE = '/api/v1/auth';

const AuthService = {
  login: (correo, password) => api.post(`${BASE}/login`, { correo, password }), // POST → 200 | 401
  registro: (usuario) => api.post(`${BASE}/registro`, usuario),                 // POST → 201 | 409
  refresh: () => api.post(`${BASE}/refresh`),                                   // POST → 200 (requiere token)
};

export default AuthService;
