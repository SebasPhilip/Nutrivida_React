import { useEffect, useState } from 'react';
import PlanesService, { describeError } from '../services/planesService';
import PlanesForm from './PlanesForm';
import PlanesList from './PlanesList';

const Planes = () => {
  const [listaPlanes, setListaPlanes] = useState([]);
  const [planToEdit, setPlanToEdit] = useState(null);
  const [message, setMessage] = useState(null);

  const loadPlanes = async () => {
    try {
      const response = await PlanesService.getAll();
      setListaPlanes(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
    }
  };

  useEffect(() => {
    loadPlanes();
  }, []);

  const handleSave = async (plan) => {
    try {
      if (planToEdit) {
        await PlanesService.update(planToEdit.id, plan);
        setMessage({ type: 'ok', text: `Plan #${planToEdit.id} actualizado.` });
        setPlanToEdit(null);
      } else {
        const response = await PlanesService.create(plan);
        setMessage({ type: 'ok', text: `Plan creado con id ${response.data.id}.` });
      }
      await loadPlanes();
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
      return false;
    }
  };

  const handleDelete = async (plan) => {
    if (!window.confirm(`¿Eliminar "${plan.nombre}"?`)) return;
    try {
      await PlanesService.remove(plan.id);
      setMessage({ type: 'ok', text: `Plan "${plan.nombre}" eliminado.` });
      if (planToEdit?.id === plan.id) setPlanToEdit(null);
      await loadPlanes();
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">Gestión de Planes</h2>
        <p className="text-muted">Conectado a Spring Boot en :8080</p>
      </div>

      {message && (
        <div className={`alert ${message.type === 'ok' ? 'alert-success' : 'alert-danger'} d-flex justify-content-between`}>
          <span>{message.text}</span>
          <button type="button" className="btn-close" onClick={() => setMessage(null)} />
        </div>
      )}

      <PlanesForm
        planToEdit={planToEdit}
        onSave={handleSave}
        onCancel={() => setPlanToEdit(null)}
      />

      <PlanesList
        planes={listaPlanes}
        onEdit={setPlanToEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Planes;