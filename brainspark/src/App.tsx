import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Default from './pages/Welcome/Default';
import Login from './pages/Welcome/LoginForm'
import Register from './pages/Welcome/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/Welcome/ForgetPassword';
import MainPage from './pages/Main/MainPage';
import SendNewPassword from './pages/Welcome/SendNewPassword';
import WelcomeScreen from './pages/Main/WelcomeScreen';
import UserInfo from './pages/Main/UserInfo';
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
          <Route path="send-new-password" element={<SendNewPassword />} />
        </Route>
        
        <Route path='/brainspark' element={ <ProtectedRoute> <MainPage /> </ProtectedRoute> }>
          <Route path="main" element={<WelcomeScreen />} />
          <Route path="user-info" element={ <UserInfo /> } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
