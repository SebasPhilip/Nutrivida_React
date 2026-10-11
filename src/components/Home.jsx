import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="bg-success text-white py-5 mb-5" style={{ minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-3">Transforma tu vida con NutriVida</h1>
          <p className="lead mb-4 fs-4">
            Alcanza tus objetivos de salud y bienestar con nuestros planes personalizados de nutrición y entrenamiento.
          </p>
          <Link to="/planes" className="btn btn-light btn-lg text-success fw-bold px-5 rounded-pill shadow">
            Explorar Planes
          </Link>
        </div>
      </div>

      <div className="container mb-5">
        <h2 className="text-center mb-5 text-secondary">¿Por qué elegirnos?</h2>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-4 border rounded shadow-sm h-100 bg-light">
              <h3 className="text-success mb-3">🥗 Nutrición a Medida</h3>
              <p>Planes alimenticios diseñados específicamente para tus necesidades, gustos y objetivos personales.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded shadow-sm h-100 bg-light">
              <h3 className="text-success mb-3">🏋️ Entrenamiento</h3>
              <p>Rutinas adaptadas a tu nivel físico y equipamiento disponible, maximizando tus resultados.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded shadow-sm h-100 bg-light">
              <h3 className="text-success mb-3">📈 Seguimiento</h3>
              <p>Acompañamiento constante para evaluar tu progreso y realizar los ajustes necesarios en tu plan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;