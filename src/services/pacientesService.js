import api from './http';

export { describeError } from './http';

const RESOURCE = '/api/v1/pacientes';

const PacientesService = {
getAll: () => api.get(RESOURCE), // GET → 200
getById: (id) => api.get(`${RESOURCE}/${id}`), // GET → 200 | 404
create: (pacientes) => api.post(RESOURCE, pacientes), // POST → 201
update: (id, pacientes) => api.put(`${RESOURCE}/${id}`, pacientes), // PUT → 200 | 404
remove: (id) => api.delete(`${RESOURCE}/${id}`), // DELETE → 204 | 404
};
export default PacientesService;

