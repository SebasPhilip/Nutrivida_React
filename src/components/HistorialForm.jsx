import { useEffect, useState } from 'react';

const hoy = () => new Date().toISOString().split('T')[0];

export default function HistorialForm({ historialToEdit, onSave, onCancel }) {
  const [fecha, setFecha] = useState(hoy());
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [imc, setImc] = useState('');
  const [cintura, setCintura] = useState('');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    setFecha(historialToEdit?.fecha ?? hoy());
    setPeso(historialToEdit?.peso ?? '');
    setTalla(historialToEdit?.talla ?? '');
    setImc(historialToEdit?.imc ?? '');
    setCintura(historialToEdit?.cintura ?? '');
    setNotas(historialToEdit?.notas ?? '');
  }, [historialToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSave({
      fecha,
      peso: Number(peso),
      talla: String(talla).trim(),
      imc: Number(imc),
      cintura: Number(cintura),
      notas: notas.trim(),
    });

    if (ok && !historialToEdit) {
      setFecha(hoy());
      setPeso('');
      setTalla('');
      setImc('');
      setCintura('');
      setNotas('');
    }
  };

  const isEditing = Boolean(historialToEdit);

  return (
    <form className="card shadow-sm border-0 border-top border-success border-4 p-4" onSubmit={handleSubmit}>
      <h4 className="text-success fw-bold mb-3">
        {isEditing ? `Editar registro #${historialToEdit.id}` : 'Nueva medición'}
      </h4>

      <div className="mb-3">
        <label className="form-label fw-bold">Fecha</label>
        <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <label className="form-label fw-bold">Peso (kg)</label>
          <input type="number" step="0.1" min="0" className="form-control" value={peso} onChange={(e) => setPeso(e.target.value)} required />
        </div>
        <div className="col-6">
          <label className="form-label fw-bold">Talla</label>
          <input className="form-control" value={talla} onChange={(e) => setTalla(e.target.value)} required />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <label className="form-label fw-bold">IMC</label>
          <input type="number" step="0.1" min="0" className="form-control" value={imc} onChange={(e) => setImc(e.target.value)} required />
        </div>
        <div className="col-6">
          <label className="form-label fw-bold">Cintura (cm)</label>
          <input type="number" step="0.1" min="0" className="form-control" value={cintura} onChange={(e) => setCintura(e.target.value)} required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Notas clínicas</label>
        <textarea rows="3" className="form-control" value={notas} onChange={(e) => setNotas(e.target.value)} />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success fw-bold flex-grow-1">
          {isEditing ? 'Guardar cambios' : 'Registrar medición'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
