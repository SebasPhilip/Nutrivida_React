
let productos = [
  { id: 1, nombre: "Proteína  1kg", precio: 35000, categoria: "Suplementos", stock: 15, imagen: "https://via.placeholder.com/400x300" },
  { id: 2, nombre: "Creatina  300g", precio: 18000, categoria: "Suplementos", stock: 20, imagen: "https://via.placeholder.com/400x300" },
  { id: 3, nombre: "Multivitamínico Hombre 60 caps", precio: 12000, categoria: "Vitaminas", stock: 30, imagen: "https://via.placeholder.com/400x300" },
  { id: 4, nombre: "Multivitamínico Mujer 60 caps", precio: 12000, categoria: "Vitaminas", stock: 25, imagen: "https://via.placeholder.com/400x300" },
  { id: 5, nombre: "Omega 3 ", precio: 9500, categoria: "Vitaminas", stock: 40, imagen: "https://via.placeholder.com/400x300" },
  { id: 6, nombre: "Pre-Entrenamiento Explosive", precio: 22000, categoria: "Suplementos", stock: 10, imagen: "https://via.placeholder.com/400x300" },
  { id: 7, nombre: "Barra de Proteína (Caja x12)", precio: 15000, categoria: "Snacks", stock: 50, imagen: "https://via.placeholder.com/400x300" }
];

export const obtenerProductos = () => {
  return [...productos];
};