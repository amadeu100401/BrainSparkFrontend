import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext'
import FullSidebar from './FullSidebar';

import {
  Home,
  LogOut,
  ChevronLeft,
  User,
  Clock,
  SquareLibrary
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleHomeClick = (path: string) => {
    setIsCollapsed(true);
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
  };

  const iconStyle = "w-6 h-6";

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar preta fixa */}
      <aside className="fixed top-0 left-0 h-screen w-20 bg-zinc-900 text-white z-50 flex flex-col items-center py-4">
        {/* Botão de expandir/recolher */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-zinc-800"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Ícones centralizados verticalmente */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 mt-4">
          <button onClick={() => handleHomeClick("/brainspark/home")} title="Home" className="p-2 hover:bg-zinc-800 rounded">
            <Home className={iconStyle} />
          </button>
          <button onClick={() => handleHomeClick("/brainspark/docs-collection")} title="Biblioteca" className="p-2 hover:bg-zinc-800 rounded">
            <SquareLibrary className={iconStyle} />
          </button>
          <button onClick={() => handleHomeClick("/brainspark/focus")} title="Focus" className="p-2 hover:bg-zinc-800 rounded">
            <Clock className={iconStyle} />
          </button>
          <button
            title="Usuário"
            className="p-2 hover:bg-zinc-800 rounded"
            onClick={() => navigate("/brainspark/user-info")}
          >
            <User className={iconStyle} />
          </button>
        </div>

        {/* Logout fixado embaixo */}
        <div className="mb-4 relative z-50">
          <button
            onClick={() => handleLogout()}
            title="Sair"
            className="p-2 hover:bg-zinc-800 rounded"
          >
            <LogOut className={iconStyle} />
          </button>
        </div>
      </aside>

      {/* Sidebar branca fixa ao lado da preta */}
      <aside
        className={`fixed top-0 left-20 h-screen bg-white border-l border-zinc-200 transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-[300px] opacity-100'
        }`}
      >
        <div className="relative h-full overflow-y-auto p-6">
          {/* Botão de recolher REMOVIDO quando expandida */}
          {!isCollapsed && (
            null
          )}
          <FullSidebar />
        </div>
      </aside>

      {/* Névoa com animação suave */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black z-30 transition-opacity duration-300 pointer-events-none ${isCollapsed ? 'opacity-0' : 'opacity-40 pointer-events-auto'}`}
        onClick={() => setIsCollapsed(true)}
      />

    </div>
  );
}
