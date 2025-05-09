import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthContext';
import Cookies from 'js-cookie';
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom"; 
export default function MainPage() {
  const logout = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar a abertura/fechamento da sidebar
  const email = Cookies.get("email") || sessionStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      navigate("/welcome");
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <Sidebar />
       <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
