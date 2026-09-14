import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OfficesPage } from './pages/OfficesPage';
import { OfficeDetailsPage } from './pages/OfficeDetailsPage';
import { ServiceCategoriesPage } from './pages/ServiceCategoriesPage';
import { ServiceCategoryDetailsPage } from './pages/ServiceCategoryDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/categories" replace />} />
      <Route path="/offices" element={<OfficesPage />} />
      <Route path="/offices/:id" element={<OfficeDetailsPage />} />
      <Route path="/categories" element={<ServiceCategoriesPage />} />
      <Route path="/categories/:id" element={<ServiceCategoryDetailsPage />} />
    </Routes>
  );
}

export default App;