let citas = [
  {
    id: 1,
    nutricionistaId: "1",
    nombreNutricionista: "Nut. Carolina Fuentes M.",
    fecha: "2026-10-20",
    hora: "15:30",
    motivo: "control",
    estado: "ACTIVA"
  }
];

export const obtenerCitas = () => {
  return [...citas];
};

export const crearCita = (cita) => {
  const nuevaCita = {
    ...cita,
    id: citas.length > 0 ? citas[citas.length - 1].id + 1 : 1,
    estado: "ACTIVA"
  };
  citas.push(nuevaCita);
  return nuevaCita;
};

export const cancelarCita = (id) => {
  const index = citas.findIndex(c => c.id === id);
  if (index !== -1) {
    citas[index].estado = "CANCELADA";
    return true;
  }
  return false;
};