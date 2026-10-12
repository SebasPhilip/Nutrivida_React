const resumenPlanesMock = {
  perdidaPeso: 45,
  nutricionDeportiva: 30,
  controlesIndividuales: 67
};

const clientesMock = [
  {
    id: 1,
    nombre: "Rodrigo Rojas",
    plan: "[PL001] Plan pérdida de peso (1 mes)",
    estado: "Activo",
    profesional: "Nut. Carolina Fuentes M."
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    plan: "[PL003] Nutrición deportiva (1 mes)",
    estado: "Activo",
    profesional: "Nut. Rodrigo Sepúlveda A."
  },
  {
    id: 3,
    nombre: "Carmen Silva",
    plan: "[CN001] Primera consulta",
    estado: "Finalizado",
    profesional: "Nut. Carolina Fuentes M."
  }
];

export const obtenerResumenPlanes = () => resumenPlanesMock;
export const obtenerClientes = () => clientesMock;