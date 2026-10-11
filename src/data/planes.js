
let planes = [
  { id: 1, nombre: "Plan Básico Nutricional", precio: 30000, categoria: "Nutrición", oferta: false, imagen: "https://via.placeholder.com/400x300" },
  { id: 2, nombre: "Plan Descenso de Peso", precio: 45000, categoria: "Nutrición", oferta: true, imagen: "https://via.placeholder.com/400x300" },
  { id: 3, nombre: "Plan Musculación", precio: 50000, categoria: "Entrenamiento", oferta: false, imagen: "https://via.placeholder.com/400x300" },
  { id: 4, nombre: "Plan Integral (Dieta + Ejercicio)", precio: 75000, categoria: "Integral", oferta: true, imagen: "https://via.placeholder.com/400x300" },
  { id: 5, nombre: "Plan Mantenimiento", precio: 25000, categoria: "Nutrición", oferta: false, imagen: "https://via.placeholder.com/400x300" },
  { id: 6, nombre: "Plan Deportivo Alto Rendimiento", precio: 85000, categoria: "Entrenamiento", oferta: false, imagen: "https://via.placeholder.com/400x300" }
];




export const obtenerPlanes = () => {
  return [...planes];
};


export const crearPlan = (plan) => {
  const nuevoPlan = { 
    ...plan, 
    // Asigna un ID automático basado en el último elemento
    id: planes.length > 0 ? planes[planes.length - 1].id + 1 : 1 
  };
  planes.push(nuevoPlan);
  return nuevoPlan;
};


export const actualizarPlan = (id, datosActualizados) => {
  planes = planes.map(p => 
    p.id === id ? { ...p, ...datosActualizados } : p
  );
  return planes.find(p => p.id === id);
};


export const eliminarPlan = (id) => {
  planes = planes.filter(p => p.id !== id);
  return true;
};