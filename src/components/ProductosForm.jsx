import { useEffect, useState } from 'react';

export default function ProductosForm({ productoToEdit, onSave, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    setNombre(productoToEdit?.nombre ?? '');
    setPrecio(productoToEdit?.precio ?? '');
    setCategoria(productoToEdit?.categoria ?? '');
    setStock(productoToEdit?.stock ?? '');
  }, [productoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSave({
      nombre: nombre.trim(),
      precio: Number(precio),
      categoria: categoria.trim(),
      stock: Number(stock),
    });

    if (ok && !productoToEdit) {
      setNombre('');
      setPrecio('');
      setCategoria('');
      setStock('');
    }
  };

  const isEditing = Boolean(productoToEdit);

  return (
    <form className="productosform" onSubmit={handleSubmit}>
      <h2>{isEditing ? `Editar producto #${productoToEdit.id}` : 'Nuevo producto'}</h2>
      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <label>
        Precio
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </label>
      <label>
        Categoría
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
      </label>
      <label>
        Stock
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
      </label>
      <div className="form-actions">
        <button type="submit" className="primary">
          {isEditing ? 'Guardar cambios' : 'Agregar producto'}
        </button>
        {isEditing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}