import { useEffect, useState } from 'react';

export default function HistorialForm({ historialToEdit, onSave, onCancel }) {
const [fecha, setFecha] = useState('');
const [peso, setPeso] = useState('');
const [talla, setTalla] = useState('');
const [imc, setImc] = useState('');
const [cintura, setCintura] = useState('');
const [notas, setNotas] = useState('');


useEffect(() => {
setFecha(historialToEdit?.fecha ?? '');
setPeso(historialToEdit?.peso ?? '');
setTalla(historialToEdit?.talla ?? '');
setImc(historialToEdit?.imc);
setCintura(historialToEdit?.cintura ?? '');
setNotas(historialToEdit?.notas ?? '');
}, [planToEdit]);

const handleSubmit = async (e) => {
e.preventDefault();
const ok = await onSave({
fecha: fecha.trim(),
peso: Number(peso),
talla: talla.trim(),
imc: Number(imc),
cintura: Number(cintura),
notas: notas.trim(),    
    });

    if (ok && !historialToEdit) {
    setFecha('');
    setPeso('');
    setTalla('');
    setImc('');
    setCintura('');
    setNotas('')
    ;
    }
};

    const isEditing = Boolean(historialToEdit);

return (
    <form className="historial-form" onSubmit={handleSubmit}>
    <h2>{isEditing ? `Editar historial #${historialToEdit.id}` : 'Historial'}</h2>
    <label>
        Fecha
        <input value={fecha} onChange={(e) => setFecha(e.target.value)} required />
    </label>
    <label>
        Peso
        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} required />
    </label>
    <label>
        Talla
        <input value={talla} onChange={(e) => setTalla(e.target.value)} required />
    </label>
    <label>
        IMC
        <input type="number" value={imc} onChange={(e) => setImc(e.target.value)} required />
    </label>
    <label>
        Cintura
        <input type="number" value={cintura} onChange={(e) => setCintura(e.target.value)} required />
    </label>
    <label>
        Notas
        <input value={notas} onChange={(e) => setNotas(e.target.value)} required />
    </label>
    <label>
        
    </label>
    <div className="form-actions">
        <button type="submit" className="primary">
        {isEditing ? 'Guardar cambios' : 'Actualizar historial'}
        </button>
        {isEditing && <button type="button" onClick={onCancel}>Cancelar</button>}
    </div>
    </form>
);
}