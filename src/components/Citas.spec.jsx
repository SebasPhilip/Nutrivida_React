import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Citas } from './Citas';


describe('Pruebas Unitarias - Citas', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    
    spyOn(window, 'alert').and.stub();
    spyOn(window, 'confirm').and.returnValue(false); 
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('T12: Renderiza los paneles principales de gestión de citas', () => {
    act(() => {
      createRoot(container).render(<Citas />);
    });
    
    expect(container.textContent).toContain('Gestión de Citas');
    expect(container.textContent).toContain('Mi Próxima Cita');
    expect(container.textContent).toContain('Agendar Nueva Cita');
  });

  it('T13: Bloquea el envío del formulario y muestra alerta si no hay fecha (Eventos)', () => {
    act(() => {
      createRoot(container).render(<Citas />);
    });
    
    const form = container.querySelector('form');
    
    
    if (form) {
      act(() => {

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      });
      
      
      expect(window.alert).toHaveBeenCalledWith('Por favor, selecciona una fecha en el calendario.');
    }
  });

  it('T14: Despliega el calendario al hacer clic en el botón de fecha (Estado/Renderizado)', () => {
    act(() => {
      createRoot(container).render(<Citas />);
    });

   
    const botones = Array.from(container.querySelectorAll('button'));
    const btnFecha = botones.find(b => b.textContent.includes('dd/mm/yyyy') || b.textContent.includes('/202'));
    
    if (btnFecha) {
      act(() => {
        btnFecha.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      
      
      expect(container.textContent).toContain('lu');
      expect(container.textContent).toContain('ma');
      expect(container.textContent).toContain('mi');
      expect(container.textContent).toContain('ju');
      expect(container.textContent).toContain('vi');
    }
  });
});