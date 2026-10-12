
let productos = [
  { id: 1, nombre: "Proteína  1kg", precio: 35000, categoria: "Suplementos", stock: 15, imagen: "https://images.unsplash.com/photo-1693996045300-521e9d08cabc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 2, nombre: "Creatina  300g", precio: 18000, categoria: "Suplementos", stock: 20, imagen: "https://images.unsplash.com/photo-1693996045435-af7c48b9cafb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 3, nombre: "Multivitamínico Hombre 60 caps", precio: 12000, categoria: "Vitaminas", stock: 30, imagen: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 4, nombre: "Multivitamínico Mujer 60 caps", precio: 12000, categoria: "Vitaminas", stock: 25, imagen: "https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 5, nombre: "Omega 3 ", precio: 9500, categoria: "Vitaminas", stock: 40, imagen: "https://images.unsplash.com/photo-1624362772755-4d5843e67047?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 6, nombre: "Pre-Entrenamiento Explosive", precio: 22000, categoria: "Suplementos", stock: 10, imagen: "https://images.unsplash.com/photo-1610360277501-ea948686dc52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 7, nombre: "Barra de Proteína (Caja x12)", precio: 15000, categoria: "Snacks", stock: 50, imagen: "https://images.unsplash.com/photo-1629214831802-bb2a07f9517e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" }
];

export const obtenerProductos = () => {
  return [...productos];
};