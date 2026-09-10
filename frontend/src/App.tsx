import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OfficesPage } from './pages/OfficesPage';
import { OfficeDetailsPage } from './pages/OfficeDetailsPage';
import { ServiceCategoriesPage } from './pages/ServiceCategoriesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/categories" replace />} />

      <Route path="/offices" element={<OfficesPage />} />
      <Route path="/offices/:id" element={<OfficeDetailsPage />} />
      <Route path="/categories" element={<ServiceCategoriesPage />} />
    </Routes>
  );
}

export default App;