
let usuarios = [
  { 
    id: 1, 
    nombre: "Administrador", 
    apellido: "Principal", 
    correo: "admin@duoc.cl", 
    password: "123",
    rol: "Admin" 
  },
  { 
    id: 2, 
    nombre: "Profesional", 
    apellido: "Nutricionista", 
    correo: "nutri@duoc.cl", 
    password: "123",
    rol: "Nutri" 
  },
  { 
    id: 3, 
    nombre: "Pedro", 
    apellido: "Paciente", 
    correo: "paciente@duoc.cl", 
    password: "123",
    rol: "Paciente" 
  }
];



export const obtenerUsuarios = () => {
  return [...usuarios];
};


export const registrarUsuario = (nuevoUsuario) => {
  const existe = usuarios.find(u => u.correo === nuevoUsuario.correo);
  if (existe) {
    return { exito: false, mensaje: "El correo ya está registrado." };
  }

  const usuario = {
    ...nuevoUsuario,
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    rol: "Paciente" 
  };
  
  usuarios.push(usuario);
  return { exito: true, usuario: usuario };
};

export const validarLogin = (correo, password) => {
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);
  
  if (usuario) {
    return { exito: true, usuario: usuario };
  } else {
    return { exito: false, mensaje: "Correo o contraseña incorrectos. Acceso denegado." };
  }
};