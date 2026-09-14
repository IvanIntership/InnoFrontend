import './App.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { OfficesPage } from './pages/OfficesPage';
import { OfficeDetailsPage } from './pages/OfficeDetailsPage';
import { ServiceCategoriesPage } from './pages/ServiceCategoriesPage';
import { ServiceCategoryDetailsPage } from './pages/ServiceCategoryDetailsPage';
import { SpecializationsPage } from './pages/SpecializationsPage';
import { SpecializationDetailsPage } from './pages/SpecializationDetailsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: '15px 20px', margin: 0 }}>
            <li>
              <Link to="/offices">Офисы</Link>
            </li>
            <li>
              <Link to="/categories">Категории услуг</Link>
            </li>
            <li>
              <Link to="/specializations">Специализации</Link>
            </li>
            <li>
              <Link to="/services">Услуги</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/specializations" replace />} />

          <Route path="/offices">
            <Route index element={<OfficesPage />} />
            <Route path=":id" element={<OfficeDetailsPage />} />
          </Route>
          
          <Route path="/categories">
            <Route index element={<ServiceCategoriesPage />} />
            <Route path=":id" element={<ServiceCategoryDetailsPage />} />
          </Route>

          <Route path="/specializations">
            <Route index element={<SpecializationsPage />} />
            <Route path=":id" element={<SpecializationDetailsPage />} />
          </Route>

          <Route path="/services">
            <Route index element={<ServicesPage />} />
            <Route path=":id" element={<ServiceDetailsPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;