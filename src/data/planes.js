
let planes = [
  { id: 1, nombre: "Plan Básico Nutricional", precio: 30000, categoria: "Nutrición", oferta: false, imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 2, nombre: "Plan Descenso de Peso", precio: 45000, categoria: "Nutrición", oferta: true, imagen: "https://plus.unsplash.com/premium_photo-1726876998600-ba6286df9c80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 3, nombre: "Plan Musculación", precio: 50000, categoria: "Entrenamiento", oferta: false, imagen: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 4, nombre: "Plan Integral (Dieta + Ejercicio)", precio: 75000, categoria: "Integral", oferta: true, imagen: "https://plus.unsplash.com/premium_photo-1785789470331-5620bc5de5c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 5, nombre: "Plan Mantenimiento", precio: 25000, categoria: "Nutrición", oferta: false, imagen: "https://images.unsplash.com/photo-1770270402445-b72169c6e48a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 6, nombre: "Plan Deportivo Alto Rendimiento", precio: 85000, categoria: "Entrenamiento", oferta: false, imagen: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&h=300&q=80" }
];




export const obtenerPlanes = () => {
  return [...planes];
};


export const crearPlan = (plan) => {
  const nuevoPlan = { 
    ...plan, 
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