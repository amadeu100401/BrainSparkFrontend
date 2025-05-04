import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import './index.css';

// import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
