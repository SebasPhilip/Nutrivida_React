import api from './http';

export { describeError } from './http';

const RESOURCE = '/api/v1/productos';

const ProductosService = {
getAll: () => api.get(RESOURCE), // GET → 200
getById: (id) => api.get(`${RESOURCE}/${id}`), // GET → 200 | 404
create: (productos) => api.post(RESOURCE, productos), // POST → 201
update: (id, productos) => api.put(`${RESOURCE}/${id}`, productos), // PUT → 200 | 404
remove: (id) => api.delete(`${RESOURCE}/${id}`), // DELETE → 204 | 404
};
export default ProductosService;

