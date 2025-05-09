import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../components/AuthContext';
import FullSidebar from '../components/FullSidebar';
import {
  Home,
  LineChart,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleHomeClick = () => {
    setIsCollapsed(true);
    navigate("/brainspark/main");
  };

  const handleLogout = () => {
    logout.logout();
    navigate("/welcome");
  };

  const iconStyle = "w-6 h-6";

  return (
    <div className="h-screen flex">
      {/* Sidebar preta vertical */}
      <aside className={`bg-zinc-900 text-white flex flex-col items-center py-4 space-y-6 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-20'}`}>
        {/* Botão de expandir (só aparece quando está colapsado) */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            title="Expandir"
            className="p-2 hover:bg-zinc-800 rounded"
          >
            <ChevronLeft className="w-5 h-5 rotate-180" />
          </button>
        )}

        <button onClick={handleHomeClick} title="Home" className="p-2 hover:bg-zinc-800 rounded">
          <Home className={iconStyle} />
        </button>
        <button title="Analytics" className="p-2 hover:bg-zinc-800 rounded">
          <LineChart className={iconStyle} />
        </button>
        <button title="Projects" className="p-2 hover:bg-zinc-800 rounded">
          <Briefcase className={iconStyle} />
        </button>
        <button 
            title="Settings" className="p-2 hover:bg-zinc-800 rounded"
            onClick={() => navigate("/brainspark/user-info")}
        >
          <Settings className={iconStyle} />
        </button>

        {/* Botão de logout fixado na parte inferior */}
        <div className="mt-auto mb-4">
          <button
            onClick={handleLogout}
            title="Sair"
            className="p-2 hover:bg-zinc-800 rounded"
          >
            <LogOut className={iconStyle} />
          </button>
        </div>
      </aside>

      {/* Parte cinza lateral */}
      <aside
        className={`bg-white border-l border-zinc-200 p-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-[300px] opacity-100'
        } relative`}
      >
        {/* Botão para recolher */}
        <button
          onClick={() => setIsCollapsed(true)}
          title="Recolher"
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 color: white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <FullSidebar />
      </aside>
    </div>
  );
}
