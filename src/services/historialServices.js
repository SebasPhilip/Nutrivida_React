import api from './http';

export { describeError } from './http';

const RESOURCE = '/api/v1/historial';

const HistorialService = {
getAll: () => api.get(RESOURCE),
getByPaciente: (pacienteId) => api.get(RESOURCE, { params: { pacienteId } }), // GET → 200
getById: (id) => api.get(`${RESOURCE}/${id}`), // GET → 200 | 404
create: (historial) => api.post(RESOURCE, historial), // POST → 201
update: (id, historial) => api.put(`${RESOURCE}/${id}`, historial), // PUT → 200 | 404
remove: (id) => api.delete(`${RESOURCE}/${id}`), // DELETE → 204 | 404
};
export default HistorialService;

