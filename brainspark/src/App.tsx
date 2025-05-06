import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import ProtectedRoute from './components/ProtectedRoute';
import MainPage from './pages/Dashboard/MainPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/main" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
    </Routes>
  );
}

export default App;
