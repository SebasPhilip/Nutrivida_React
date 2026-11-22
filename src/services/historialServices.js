import axios from 'axios';

export const api = axios.create({
baseURL: import.meta.env.VITE_API_URL ??'',
});

const RESOURCE = '/api/v1/historial';

const HistorialService = {
getAll: () => api.get(RESOURCE), // GET → 200
getById: (id) => api.get(`${RESOURCE}/${id}`), // GET → 200 | 404
create: (historial) => api.post(RESOURCE, historial), // POST → 201
update: (id, historial) => api.put(`${RESOURCE}/${id}`, historial), // PUT → 200 | 404
remove: (id) => api.delete(`${RESOURCE}/${id}`), // DELETE → 204 | 404
};
export default HistorialService;

export function describeError(error) {
if (error.response) {
const { status, data } = error.response;
return `El backend respondió ${status}: ${data?.error ?? 'error sin detalle'}`;
}
if (error.request) {

return 'No hubo respuesta del backend. Revisa que Spring Boot esté corriendo en el puerto 8080 y que CORS permita http://localhost:3000 (detalle en DevTools →Console).';
}
return `Error inesperado: ${error.message}`;
}