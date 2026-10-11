export const nutricionistas = [
  {
    id: "1",
    nombre: "Nut. Carolina Fuentes M.",
    especialidad: "Obesidad y síndrome metabólico",
    correo: "c.fuentes@duoc.cl",
    telefono: "+56 9 8765 4321",
    biografia: "Nutricionista egresada con más de 8 años de experiencia.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVri51aVNMv924vcxfgXR1e3qBCmjiyrSyXWcG0tNGJg&s=10"
  },
];

export const obtenerPerfilNutricionista = (id) => {
  return nutricionistas.find(n => n.id === id);
};