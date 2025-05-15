import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/WelcomePage';
import Default from './pages/Welcome/EntryPage';
import Login from './pages/Welcome/LoginPage'
import Register from './pages/Welcome/RegisterForm';
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
import { useRef } from 'react';

export function App() {
  const renderCount = useRef(0);
 renderCount.current += 1;
 console.log("Esse componente re-renderizou", renderCount.current, "vezes");
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
