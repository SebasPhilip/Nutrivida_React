import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AuthService from '../services/authService';
import {
  saveSession,
  clearSession,
  isSessionActive,
  getRol,
  getNombre,
  getExpiracion,
} from './session';

const AuthContext = createContext(null);

const MARGEN_RENOVACION_MS = 2 * 60 * 1000; 
const leerSesion = () =>
  isSessionActive() ? { rol: getRol(), nombre: getNombre(), exp: getExpiracion() } : null;

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(leerSesion);

  const login = useCallback(async (correo, password) => {
    const { data } = await AuthService.login(correo, password);
    saveSession(data);
    const sesion = leerSesion();
    setUsuario(sesion);
    return sesion;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUsuario(null);
  }, []);


  useEffect(() => {
    if (!usuario) return undefined;
    const espera = Math.max(usuario.exp - Date.now() - MARGEN_RENOVACION_MS, 5000);
    const id = setTimeout(async () => {
      try {
        const { data } = await AuthService.refresh();
        saveSession(data);
        setUsuario(leerSesion());
      } catch {
        logout();
        window.location.assign('/login');
      }
    }, espera);
    return () => clearTimeout(id);
  }, [usuario, logout]);

  const value = {
    usuario,
    rol: usuario?.rol ?? null,
    estaAutenticado: Boolean(usuario),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
