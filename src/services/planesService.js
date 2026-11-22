import api from './http';

export { describeError } from './http';

const RESOURCE = '/api/v1/planes';

const PlanesService = {
getAll: () => api.get(RESOURCE), // GET → 200
getById: (id) => api.get(`${RESOURCE}/${id}`), // GET → 200 | 404
create: (planes) => api.post(RESOURCE, planes), // POST → 201
update: (id, planes) => api.put(`${RESOURCE}/${id}`, planes), // PUT → 200 | 404
remove: (id) => api.delete(`${RESOURCE}/${id}`), // DELETE → 204 | 404
};
export default PlanesService;

