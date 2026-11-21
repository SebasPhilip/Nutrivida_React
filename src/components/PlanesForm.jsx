import { useEffect, useState } from 'react';

export default function PlanesForm({ planToEdit, onSave, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [oferta, setOferta] = useState(false);

  useEffect(() => {
    setNombre(planToEdit?.nombre ?? '');
    setPrecio(planToEdit?.precio ?? '');
    setCategoria(planToEdit?.categoria ?? '');
    setOferta(Boolean(planToEdit?.oferta));
  }, [planToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSave({
      nombre: nombre.trim(),
      precio: Number(precio),
      categoria: categoria.trim(),
      oferta,
    });

    if (ok && !planToEdit) {
      setNombre('');
      setPrecio('');
      setCategoria('');
      setOferta(false);
    }
  };

  const isEditing = Boolean(planToEdit);

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? `Editar plan #${planToEdit.id}` : 'Nuevo plan'}</h2>
      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <label>
        Precio
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </label>
      <label>
        Categoríña
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={oferta}
          onChange={(e) => setOferta(e.target.checked)}
        />
        ¿En oferta?
      </label>
      <div className="form-actions">
        <button type="submit" className="primary">
          {isEditing ? 'Guardar cambios' : 'Agregar plan'}
        </button>
        {isEditing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}