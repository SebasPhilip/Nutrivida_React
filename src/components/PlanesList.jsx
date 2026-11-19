export default function PlanesList({ planes, onEdit, onDelete }) {
if (planes.length === 0) {
return <p className="empty">Aún no hay planes. Agrega el primero con el
formulario.</p>;
}
return (
<table className="Planes">
<thead>
<tr>
<th>nombre</th>
<th>precio</th>
<th>categoria</th>
<th>oferta</th>
<th><span className="sr-only">Acciones</span></th>
</tr>
</thead>
<tbody>
{planes.map((plan) => (
<tr key={plan.id}>
<td className="id">{plan.id}</td>
<td>{plan.nombre}</td>
<td>{plan.precio}</td>
<td>{plan.categoria}</td>
<td>{plan.oferta}</td>
<td className="actions">
<button type="button" onClick={() => onEdit(producto)}>Editar</button>
<button type="button" className="danger" onClick={() =>
onDelete(producto)}>Eliminar</button>
</td>
</tr>
))}
</tbody>
</table>
);
}