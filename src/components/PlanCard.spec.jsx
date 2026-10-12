import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import PlanCard from './PlanCard';



describe('Pruebas Unitarias - PlanCard', () => {
  let container;

  const planMockNormal = { id: 1, nombre: 'Plan Básico', categoria: 'Nutrición', oferta: false, precio: 20000, imagen: 'img.jpg' };
  const planMockOferta = { id: 2, nombre: 'Plan Verano', categoria: 'Entrenamiento', oferta: true, precio: 15000, imagen: 'img.jpg' };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('NO muestra la etiqueta "¡En Oferta!" si el plan no tiene oferta (Renderizado Condicional)', () => {
    act(() => {
      createRoot(container).render(
        <BrowserRouter>
          <CartContext.Provider value={{ agregarAlCarrito: () => {} }}>
            <PlanCard plan={planMockNormal} />
          </CartContext.Provider>
        </BrowserRouter>
      );
    });

    expect(container.textContent).not.toContain('¡En Oferta!');
  });

  it('SÍ muestra la etiqueta "¡En Oferta!" si el plan está en oferta (Renderizado Condicional)', () => {
    act(() => {
      createRoot(container).render(
        <BrowserRouter>
          <CartContext.Provider value={{ agregarAlCarrito: () => {} }}>
            <PlanCard plan={planMockOferta} />
          </CartContext.Provider>
        </BrowserRouter>
      );
    });

    expect(container.textContent).toContain('¡En Oferta!');
  });
});