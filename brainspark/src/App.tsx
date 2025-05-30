import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome/WelcomePage';
import Default from './pages/Welcome/EntryPage';
import Login from './pages/Welcome/LoginPage'
import Register from './pages/Welcome/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/Welcome/ForgetPassword';
import MainPage from './pages/Main/MainPage';
import SendNewPassword from './pages/Welcome/SendNewPassword';
import WelcomeScreen from './pages/Main/HomePage';
import UserInfo from './pages/Main/UserInfoPage';
import IdeaDoc from './pages/Main/IdeaDocPage';
import DocCollection from './pages/Main/DocCollectionPage';
import FocusTimePage from './pages/Main/FocusTimePage';
import { AuthProvider } from './contexts/AuthContext';
import { FocusProvider } from './contexts/FocusContext';

import './index.css';

export function App() {
  // const renderCount = useRef(0);
  // renderCount.current += 1;
  // console.log("Esse componente re-renderizou", renderCount.current, "vezes");

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
            <Route path="home" element={<WelcomeScreen />} />
            <Route path="user-info" element={ <UserInfo /> } />
            <Route path='idea' element={ <IdeaDoc />} />
            <Route path='docs-collection' element={ <DocCollection /> } />
            <Route path='focus' element={<FocusProvider> <FocusTimePage /> </FocusProvider>} />        
          </Route>
        </Routes>
      </AuthProvider>
  );
}
