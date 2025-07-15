import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/WelcomePage';
// import Default from './pages/Welcome/EntryPage';
import Login from './pages/Welcome/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/Welcome/ForgetPassword';
import MainPage from './pages/Main/MainPage';
import SendNewPassword from './pages/Welcome/SendNewPassword';
import WelcomeScreen from './pages/Main/Dashboard';
import UserInfo from './pages/Main/UserInfoPage';
import FocusTimePage from './pages/Main/FocusTimePage';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { FocusProvider } from './contexts/FocusContext';
import { Toaster } from "sonner";

import './index.css';
import RegisterPage from './pages/Welcome/Register';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />

        <Route path="/welcome" element={<Welcome />}>
          <Route path="send-new-password" element={<SendNewPassword />} />
        </Route>

        <Route path="/welcome/login" element={<Login />} />
        <Route path="/welcome/register" element={<RegisterPage />} />
        <Route path="/welcome/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/brainspark"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<WelcomeScreen />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route
            path="focus"
            element={
              <FocusProvider>
                <FocusTimePage />
              </FocusProvider>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster theme='system' richColors position="bottom-right" />
    </AuthProvider>
  );
}
