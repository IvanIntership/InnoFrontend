import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OfficesPage } from './pages/OfficesPage';
import { OfficeDetailsPage } from './pages/OfficeDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/offices" replace />} />

      <Route path="/offices" element={<OfficesPage />} />

      <Route path="/offices/:id" element={<OfficeDetailsPage />} />
    </Routes>
  );
}

export default App;