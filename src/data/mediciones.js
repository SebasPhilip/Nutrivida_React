const pacientesMock = [
  { id: "1", nombre: "Rodrigo Rojas" },
  { id: "2", nombre: "Julia González" },
  { id: "3", nombre: "Juan Pérez" }
];

const baseDatosClinica = {
  "1": [
    { id: "101", fecha: "2026-08-17", peso: 78.5, estatura: 175, cintura: 92, imc: 25.6 },
    { id: "102", fecha: "2026-07-17", peso: 80.2, estatura: 175, cintura: 95, imc: 26.2 }
  ],
  "2": [
    { id: "201", fecha: "2026-08-20", peso: 62.0, estatura: 160, cintura: 70, imc: 24.2 }
  ],
  "3": [
    { id: "301", fecha: "2026-08-10", peso: 95.0, estatura: 180, cintura: 105, imc: 29.3 },
    { id: "302", fecha: "2026-07-10", peso: 98.5, estatura: 180, cintura: 109, imc: 30.4 },
    { id: "303", fecha: "2026-06-10", peso: 102.0, estatura: 180, cintura: 112, imc: 31.5 }
  ]
};

const inicializarDatos = () => {
  const medicionesGuardadas = localStorage.getItem('mediciones_nutrivida');
  if (!medicionesGuardadas) {
    localStorage.setItem('mediciones_nutrivida', JSON.stringify(baseDatosClinica));
  }
};

inicializarDatos();

export const obtenerPacientes = () => pacientesMock;

export const obtenerMediciones = (pacienteId) => {
  const mediciones = JSON.parse(localStorage.getItem('mediciones_nutrivida')) || {};
  return mediciones[pacienteId] || [];
};

export const guardarMedicion = (pacienteId, nuevaMedicion) => {
  const mediciones = JSON.parse(localStorage.getItem('mediciones_nutrivida')) || {};
  if (!mediciones[pacienteId]) {
    mediciones[pacienteId] = [];
  }
  
  const peso = parseFloat(nuevaMedicion.peso);
  const estaturaMetros = parseFloat(nuevaMedicion.estatura) / 100;
  const imc = (peso / (estaturaMetros * estaturaMetros)).toFixed(1);

  const medicionConIMC = {
    ...nuevaMedicion,
    id: Date.now().toString(),
    imc: imc
  };

  mediciones[pacienteId].push(medicionConIMC);
  
  mediciones[pacienteId].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  
  localStorage.setItem('mediciones_nutrivida', JSON.stringify(mediciones));
};