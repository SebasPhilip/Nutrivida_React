import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Progreso from './Progreso';



describe('Pruebas Unitarias - Progreso', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('T11: Renderiza la estructura principal y la tabla de historial (Renderizado)', () => {
    act(() => {
      createRoot(container).render(<Progreso />);
    });
    
    
    expect(container.textContent).toContain('Mi Progreso Personal');
    expect(container.textContent).toContain('Historial de Mediciones');
    
   
    expect(container.textContent).toContain('Peso (kg)');
    expect(container.textContent).toContain('IMC');
    expect(container.textContent).toContain('Cintura (cm)');
    expect(container.textContent).toContain('Observaciones');
  });
});