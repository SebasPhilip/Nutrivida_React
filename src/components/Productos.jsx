import { useEffect, useState } from 'react';
import ProductosService, { describeError } from '../services/productosService';
import ProductosForm from './ProductosForm';
import ProductosList from './ProductosList';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoToEdit, setProductoToEdit] = useState(null);
  const [message, setMessage] = useState(null);

  const loadProductos = async () => {
    try {
      const response = await ProductosService.getAll();
      setProductos(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const handleSave = async (producto) => {
    try {
      if (productoToEdit) {
        await ProductosService.update(productoToEdit.id, producto);
        setMessage({ type: 'ok', text: `Producto #${productoToEdit.id} actualizado.` });
        setProductoToEdit(null);
      } else {
        const response = await ProductosService.create(producto);
        setMessage({ type: 'ok', text: `Producto creado con id ${response.data.id}.` });
      }
      await loadProductos();
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
      return false;
    }
  };

  const handleDelete = async (producto) => {
    if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    try {
      await ProductosService.remove(producto.id);
      setMessage({ type: 'ok', text: `Producto "${producto.nombre}" eliminado.` });
      if (productoToEdit?.id === producto.id) setProductoToEdit(null);
      await loadProductos();
    } catch (error) {
      setMessage({ type: 'error', text: describeError(error) });
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">Gestión de Productos</h2>
        <p className="text-muted">Conectado a Spring Boot en :8080</p>
      </div>

      {message && (
        <div className={`alert ${message.type === 'ok' ? 'alert-success' : 'alert-danger'} d-flex justify-content-between`}>
          <span>{message.text}</span>
          <button type="button" className="btn-close" onClick={() => setMessage(null)} />
        </div>
      )}

      <ProductosForm
        productoToEdit={productoToEdit}
        onSave={handleSave}
        onCancel={() => setProductoToEdit(null)}
      />

      <ProductosList
        productos={productos}
        onEdit={setProductoToEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Productos;