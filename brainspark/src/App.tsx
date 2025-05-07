import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Default from './pages/Welcome/Default';
import Login from './pages/Welcome/LoginForm'
import Register from './pages/Welcome/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/Welcome/ForgotPassword';
import MainPage from './pages/Dashboard/MainPage';
import { AuthProvider } from './components/AuthContext';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />

        <Route path="/welcome" element={<Welcome />}>
          <Route index element={<Default />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgetPassword" element={<ForgotPassword />} />
        </Route>
        
        <Route path='/brainspark'>
          <Route path="main" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
