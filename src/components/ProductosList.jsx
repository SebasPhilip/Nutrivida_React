export default function ProductosList({ productos, onEdit, onDelete }) {
  if (productos.length === 0) {
    return <p className="empty">Aún no hay productos. Agrega el primero con el formulario.</p>;
  }

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th><span className="sr-only">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td className="id">{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>{producto.categoria}</td>
            <td>{producto.stock}</td>
            <td className="actions">
              <button type="button" onClick={() => onEdit(producto)}>Editar</button>
              <button type="button" className="danger" onClick={() => onDelete(producto)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}