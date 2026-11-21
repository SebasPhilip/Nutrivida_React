export default function HistorialList({ historial, onEdit, onDelete }) {
    if (historial.length === 0) {
    return <p className="empty">Aún no hay historial. Agrega el primero con el
    formulario.</p>;
    }
    return (
    <table className="Historial">
    <thead>
    <tr>
    <th>fecha</th>
    <th>peso</th>
    <th>talla</th>
    <th>imc</th>
    <th>cintura</th>
    <th>notas</th>
    <th><span className="sr-only">Acciones</span></th>
    </tr>
    </thead>
    <tbody>
    {historial.map((historial) => (
    <tr key={historial.id}>
    <td className="id">{historial.id}</td>
    <td>{historial.fecha}</td>
    <td>{historial.peso}</td>
    <td>{historial.imc}</td>
    <td>{historial.cintura}</td>
    <td>{historial.notas}</td>
    <td className="actions">
    <button type="button" onClick={() => onEdit(historial)}>Editar</button>
    <button type="button" className="danger" onClick={() =>
    onDelete(historial)}>Eliminar</button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    );
    }