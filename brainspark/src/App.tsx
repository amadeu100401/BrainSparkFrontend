import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Default from './pages/Welcome/Default';
import Login from './pages/Welcome/Login/Login'
import Register from './pages/Welcome/Register/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/Welcome/ForgetPassword/ForgetPassword';
import MainPage from './pages/Main/MainPage';
import SendNewPassword from './pages/Welcome/ForgetPassword/SendNewPassword';
import WelcomeScreen from './pages/Main/HomePage/Home';
import UserInfo from './pages/Main/UserInfo';
import IdeaDoc from './pages/Main/IdeaDocument/IdeaDoc';
import DocCollection from './pages/Main/IdeaDocument/DocCollection';
import { AuthProvider } from './components/AuthContext';

import './index.css';

export function App() {
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
          
          
            <Route path='/brainspark' element={<ProtectedRoute> <MainPage /> </ProtectedRoute>}>
              <Route path="main" element={<WelcomeScreen />} />
              <Route path="user-info" element={ <UserInfo /> } />
              <Route path='idea' element={ <IdeaDoc />} />
              <Route path='docs-collection' element={ <DocCollection /> } />
            </Route>
        </Routes>
      </AuthProvider>
  );
}
