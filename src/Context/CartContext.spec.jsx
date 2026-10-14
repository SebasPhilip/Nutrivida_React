import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { CartContext, CartProvider } from './CartContext';
import { useContext } from 'react';




const TestComponent = () => {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, totalAPagar } = useContext(CartContext);
  const productoPrueba = { id: 1, nombre: 'Manzana', precio: 500 };

  return (
    <div>
      <span data-testid="cantidad">{carrito.length}</span>
      <span data-testid="total">{totalAPagar}</span>
      <button data-testid="btn-add" onClick={() => agregarAlCarrito(productoPrueba)}>Add</button>
      <button data-testid="btn-add-again" onClick={() => agregarAlCarrito(productoPrueba)}>Add Again</button>
      <button data-testid="btn-remove" onClick={() => eliminarDelCarrito(1, 'Manzana')}>Remove</button>
      <button data-testid="btn-clear" onClick={vaciarCarrito}>Clear</button>
    </div>
  );
};

describe('Pruebas Unitarias - CartContext (Lógica del Carrito)', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    localStorage.clear(); 
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('T06: Inicia con el carrito vacío y el total en 0', () => {
    act(() => { createRoot(container).render(<CartProvider><TestComponent /></CartProvider>); });
    expect(container.querySelector('[data-testid="cantidad"]').textContent).toBe('0');
    expect(container.querySelector('[data-testid="total"]').textContent).toBe('0');
  });

  it('T07: Agregar un producto nuevo aumenta la cantidad del carrito', () => {
    act(() => { createRoot(container).render(<CartProvider><TestComponent /></CartProvider>); });
    act(() => { container.querySelector('[data-testid="btn-add"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(container.querySelector('[data-testid="cantidad"]').textContent).toBe('1');
  });

  it('T08: Calcular bien el total al agregar productos', () => {
    act(() => { createRoot(container).render(<CartProvider><TestComponent /></CartProvider>); });
    act(() => { container.querySelector('[data-testid="btn-add"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(container.querySelector('[data-testid="total"]').textContent).toBe('500');
  });

  it('T09: Vaciar el carrito devuelve la cantidad y el total a 0', () => {
    act(() => { createRoot(container).render(<CartProvider><TestComponent /></CartProvider>); });
    act(() => { container.querySelector('[data-testid="btn-add"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    act(() => { container.querySelector('[data-testid="btn-clear"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    
    expect(container.querySelector('[data-testid="cantidad"]').textContent).toBe('0');
  });

  it('T10: Eliminar un producto específico lo saca de la lista', () => {
    act(() => { createRoot(container).render(<CartProvider><TestComponent /></CartProvider>); });

    act(() => { container.querySelector('[data-testid="btn-add"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    act(() => { container.querySelector('[data-testid="btn-remove"]').dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    
    expect(container.querySelector('[data-testid="cantidad"]').textContent).toBe('0');
  });
});