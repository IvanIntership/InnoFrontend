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

import { RegisterPatientForm } from './components/RegisterPatientForm';
import { AuthCallback } from './components/AuthCallback';
import { useAuthStore } from './store/authStore';
import { useAuthActions } from './hooks/useAuthActions';

function App() {
  const { isAuthenticated, role } = useAuthStore();
  const { login, logout } = useAuthActions();

  return (
    <div className="app-wrapper">
      <header className="app-header" style={{ borderBottom: '1px solid #ccc' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: '15px 0', margin: 0 }}>
            <li>
              <Link to="/offices">Offices</Link>
            </li>
            <li>
              <Link to="/categories">Service Categories</Link>
            </li>
            <li>
              <Link to="/specializations">Specializations</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/register" style={{ fontWeight: 'bold' }}>Register</Link>
              </li>
            )}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {isAuthenticated ? (
              <>
                <span style={{ fontSize: '14px', color: '#2e7d32' }}>
                  <strong>Role:</strong> {role}
                </span>
                <button onClick={logout} style={{ padding: '6px 12px', cursor: 'pointer' }}>
                  Log out
                </button>
              </>
            ) : (
              <button onClick={login} style={{ padding: '6px 12px', cursor: 'pointer' }}>
                Log in (Keycloak)
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content" style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/specializations" replace />} />

          {/* Public authentication routes */}
          <Route path="/register" element={<RegisterPatientForm />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

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