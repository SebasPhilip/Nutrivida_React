
export const historialProgreso = [
  { 
    id: 1, 
    fecha: "10/01/2026", 
    peso: 85.5, 
    talla: 1.75, 
    imc: 27.9, 
    cintura: 98, 
    notas: "Inicio del plan. Evaluación inicial completada." 
  },
  { 
    id: 2, 
    fecha: "10/02/2026", 
    peso: 82.3, 
    talla: 1.75, 
    imc: 26.8, 
    cintura: 93, 
    notas: "Buena adherencia a la pauta alimenticia." 
  },
  { 
    id: 3, 
    fecha: "10/03/2026", 
    peso: 79.8, 
    talla: 1.75, 
    imc: 26.0, 
    cintura: 89, 
    notas: "Excelente progreso, se incorpora rutina de ejercicios." 
  }
];

export const obtenerProgreso = () => {
  return [...historialProgreso].reverse(); 
};