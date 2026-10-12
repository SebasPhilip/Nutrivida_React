import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import ProductCard from './ProductCard';



describe('Pruebas Unitarias - ProductCard', () => {
  let container;


  const productoMock = { 
    id: 1, 
    nombre: 'Proteína Whey', 
    categoria: 'Suplementos', 
    stock: 15, 
    precio: 35000, 
    imagen: 'img.jpg' 
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    spyOn(window, 'alert').and.stub(); 
  });

  afterEach(() => {
    document.body.removeChild(container);
    localStorage.clear(); 
  });

  it('renderiza el nombre del producto y el precio formateado correctamente (Props/Renderizado)', () => {
    
    act(() => {
      createRoot(container).render(
        <BrowserRouter>
          <CartContext.Provider value={{ agregarAlCarrito: () => {} }}>
            <ProductCard producto={productoMock} />
          </CartContext.Provider>
        </BrowserRouter>
      );
    });

  
    expect(container.textContent).toContain('Proteína Whey');
    expect(container.textContent).toContain('35.000'); // Precio formateado
    expect(container.textContent).toContain('Stock disponible: 15');
  });

  it('no agrega al carrito y muestra alerta si NO hay sesión iniciada (Eventos)', () => {

    localStorage.removeItem('usuarioRol'); 
    
    
    const mockAgregarAlCarrito = jasmine.createSpy('agregarAlCarrito');

    act(() => {
      createRoot(container).render(
        <BrowserRouter>
          <CartContext.Provider value={{ agregarAlCarrito: mockAgregarAlCarrito }}>
            <ProductCard producto={productoMock} />
          </CartContext.Provider>
        </BrowserRouter>
      );
    });

    const boton = container.querySelector('button');
    
    act(() => {
      boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockAgregarAlCarrito).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Debes iniciar sesión para agregar productos al carrito.');
  });

  it('llama a agregarAlCarrito al hacer clic estando logueado (Eventos/Estado global)', () => {
   
    localStorage.setItem('usuarioRol', 'paciente'); 
    
    const mockAgregarAlCarrito = jasmine.createSpy('agregarAlCarrito');

    act(() => {
      createRoot(container).render(
        <BrowserRouter>
          <CartContext.Provider value={{ agregarAlCarrito: mockAgregarAlCarrito }}>
            <ProductCard producto={productoMock} />
          </CartContext.Provider>
        </BrowserRouter>
      );
    });

    const boton = container.querySelector('button');
    
    act(() => {
      boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith(productoMock);
    expect(window.alert).toHaveBeenCalledWith('Producto agregado al carrito: Proteína Whey');
  });
});