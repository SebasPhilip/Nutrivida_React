import axios from 'axios';
import { getToken, clearSession } from '../auth/session';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response?.status === 401 && getToken()) {
      clearSession();
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);


export function describeError(error) {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 403) return 'No tienes permisos para realizar esta acción.';
    return data?.error ?? `El backend respondió ${status}.`;
  }
  if (error.request) {
    return 'No hubo respuesta del backend. Revisa que Spring Boot esté corriendo en el puerto 8080 y que CORS permita http://localhost:3000.';
  }
  return `Error inesperado: ${error.message}`;
}

export default api;
export { api };