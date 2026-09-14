import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OfficesPage } from './pages/OfficesPage';
import { OfficeDetailsPage } from './pages/OfficeDetailsPage';
import { ServiceCategoriesPage } from './pages/ServiceCategoriesPage';
import { ServiceCategoryDetailsPage } from './pages/ServiceCategoryDetailsPage';
import { SpecializationsPage } from './pages/SpecializationsPage';
import { SpecializationDetailsPage } from './pages/SpecializationDetailsPage';

function App() {
  return (
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
    </Routes>
  );
}

export default App;