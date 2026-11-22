const K = {
  token: 'token',
  rol: 'usuarioRol',        
  nombre: 'usuarioNombre',
  exp: 'tokenExp',
};

export const ROL_FRONT = { ADMIN: 'Admin', NUTRI: 'Nutri', USER: 'Paciente' };

export const saveSession = ({ token, rol, nombre, expiraEn }) => {
  localStorage.setItem(K.token, token);
  localStorage.setItem(K.rol, ROL_FRONT[rol] ?? rol);
  localStorage.setItem(K.nombre, nombre ?? '');
  localStorage.setItem(K.exp, String(expiraEn));
};

export const clearSession = () => {
  Object.values(K).forEach((k) => localStorage.removeItem(k));
};

export const getExpiracion = () => Number(localStorage.getItem(K.exp)) || 0;

export const isSessionActive = () => {
  if (!localStorage.getItem(K.token)) return false;
  if (getExpiracion() <= Date.now()) {
    clearSession(); 
    return false;
  }
  return true;
};

export const getToken = () => (isSessionActive() ? localStorage.getItem(K.token) : null);
export const getRol = () => (isSessionActive() ? localStorage.getItem(K.rol) : null);
export const getNombre = () => (isSessionActive() ? localStorage.getItem(K.nombre) : null);
