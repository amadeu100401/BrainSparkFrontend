import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthContext';
import Cookies from 'js-cookie';
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom"; 

export default function MainPage() {
  const logout = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const email = Cookies.get("email") || sessionStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      navigate("/welcome");
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col pl-20">
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
