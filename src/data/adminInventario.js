const resumenFinancieroMock = {
  ventasMes: 213,
  gananciasMes: 4850000,
  planesContratados: 128
};

const productosInventarioMock = [
  { id: 1, nombre: "Proteína 1kg", categoria: "Suplementos", precio: 35000, stock: 15, ventas: 45 },
  { id: 2, nombre: "Creatina 300g", categoria: "Suplementos", precio: 18000, stock: 20, ventas: 30 },
  { id: 3, nombre: "Multivitamínico Hombre 60 caps", categoria: "Vitaminas", precio: 12000, stock: 30, ventas: 25 },
  { id: 4, nombre: "Multivitamínico Mujer 60 caps", categoria: "Vitaminas", precio: 12000, stock: 25, ventas: 28 },
  { id: 5, nombre: "Omega 3", categoria: "Vitaminas", precio: 9500, stock: 40, ventas: 50 },
  { id: 6, nombre: "Pre-Entrenamiento Explosive", categoria: "Suplementos", precio: 22000, stock: 10, ventas: 15 },
  { id: 7, nombre: "Barra de Proteína (Caja x12)", categoria: "Snacks", precio: 15000, stock: 50, ventas: 20 }
];

const planesInventarioMock = [
  { id: 1, nombre: "Plan Básico Nutricional", categoria: "Nutrición", precio: 30000, contratados: 40 },
  { id: 2, nombre: "Plan Descenso de Peso", categoria: "Nutrición", precio: 45000, contratados: 35 },
  { id: 3, nombre: "Plan Musculación", categoria: "Entrenamiento", precio: 50000, contratados: 20 },
  { id: 4, nombre: "Plan Integral (Dieta + Ejercicio)", categoria: "Integral", precio: 75000, contratados: 15 },
  { id: 5, nombre: "Plan Mantenimiento", categoria: "Nutrición", precio: 25000, contratados: 10 },
  { id: 6, nombre: "Plan Deportivo Alto Rendimiento", categoria: "Entrenamiento", precio: 85000, contratados: 8 }
];

export const obtenerResumenFinanciero = () => resumenFinancieroMock;
export const obtenerProductosInventario = () => productosInventarioMock;
export const obtenerPlanesInventario = () => planesInventarioMock;