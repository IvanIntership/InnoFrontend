import { Routes, Route, Navigate } from 'react-router-dom';
import { OfficesPage } from './pages/OfficesPage';
import { OfficeDetailsPage } from './pages/OfficeDetailsPage';
import { SpecializationsPage } from './pages/SpecializationsPage';
import { SpecializationDetailsPage } from './pages/SpecializationDetailsPage'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/specializations" replace />} />

      <Route path="/offices" element={<OfficesPage />} />
      <Route path="/offices/:id" element={<OfficeDetailsPage />} />
      <Route path="/specializations" element={<SpecializationsPage />} />
      <Route path="/specializations/:id" element={<SpecializationDetailsPage />} />
    </Routes>
  );
}

export default App;