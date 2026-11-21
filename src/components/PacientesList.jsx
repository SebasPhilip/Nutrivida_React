export default function PacientesList({ pacientes, onEdit, onDelete }) {
    if (pacientes.length === 0) {
    return <p className="empty">Aún no hay pacientes. Agrega el primero con el
    formulario.</p>;
    }
    return (
    <table className="Pacientes">
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
    {pacientes.map((pacientes) => (
    <tr key={pacientes.id}>
    <td className="id">{pacientes.id}</td>
    <td>{pacientes.fecha}</td>
    <td>{pacientes.peso}</td>
    <td>{pacientes.imc}</td>
    <td>{pacientes.cintura}</td>
    <td>{pacientes.notas}</td>
    <td className="actions">
    <button type="button" onClick={() => onEdit(pacientes)}>Editar</button>
    <button type="button" className="danger" onClick={() =>
    onDelete(pacientes)}>Eliminar</button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    );
    }