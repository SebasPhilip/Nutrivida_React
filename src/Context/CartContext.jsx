/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (item) => {
    
    const existe = carrito.find((i) => i.id === item.id && i.nombre === item.nombre);
    
    if (existe) {
      
      setCarrito(
        carrito.map((i) =>
          i.id === item.id && i.nombre === item.nombre
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      );
    } else {
      
      setCarrito([...carrito, { ...item, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id, nombre) => {
    
    setCarrito(carrito.filter((item) => !(item.id === id && item.nombre === nombre)));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalAPagar = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, totalAPagar }}>
      {children}
    </CartContext.Provider>
  );
};