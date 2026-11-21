import { useEffect, useState } from 'react';

export default function PacientesForm({ pacientesToEdit, onSave, onCancel }) {
const [fecha, setFecha] = useState('');
const [peso, setPeso] = useState('');
const [talla, setTalla] = useState('');
const [imc, setImc] = useState('');
const [cintura, setCintura] = useState('');
const [notas, setNotas] = useState('');


useEffect(() => {
setFecha(pacientesToEdit?.fecha ?? '');
setPeso(pacientesToEdit?.peso ?? '');
setTalla(pacientesToEdit?.talla ?? '');
setImc(pacientesToEdit?.imc);
setCintura(pacientesToEdit?.cintura ?? '');
setNotas(pacientesToEdit?.notas ?? '');
}, [pacientesToEdit]);

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

    if (ok && !pacientesToEdit) {
    setFecha('');
    setPeso('');
    setTalla('');
    setImc('');
    setCintura('');
    setNotas('')
    ;
    }
};

    const isEditing = Boolean(pacientesToEdit);

return (
    <form className="pacientes-form" onSubmit={handleSubmit}>
    <h2>{isEditing ? `Editar pacientes #${pacientesToEdit.id}` : 'Paciente'}</h2>
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
        {isEditing ? 'Guardar cambios' : 'Actualizar pacientes'}
        </button>
        {isEditing && <button type="button" onClick={onCancel}>Cancelar</button>}
    </div>
    </form>
);
}