const resumenAtencionesMock = {
  nutricionistasActivos: 4,
  citasProgramadas: 30,
  controlesFinalizados: 67
};

const profesionalesCitasMock = [
  {
    id: 1,
    profesional: "Nut. Carolina Fuentes M.",
    paciente: "Rodrigo Rojas",
    plan: "[PL001] Plan pérdida de peso (1 mes)",
    estado: "Completada"
  },
  {
    id: 2,
    profesional: "Nut. Rodrigo Sepúlveda A.",
    paciente: "Juan Pérez",
    plan: "[PL003] Nutrición deportiva (1 mes)",
    estado: "Programada"
  },
  {
    id: 3,
    profesional: "Nut. Carolina Fuentes M.",
    paciente: "Carmen Silva",
    plan: "[CN001] Primera consulta",
    estado: "En Curso"
  }
];

export const obtenerResumenAtenciones = () => resumenAtencionesMock;
export const obtenerProfesionalesCitas = () => profesionalesCitasMock;