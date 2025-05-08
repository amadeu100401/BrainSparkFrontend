import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaCog, FaUserCircle, FaSignOutAlt, FaAngleLeft } from "react-icons/fa";
import { useAuth } from '../../components/AuthContext';
import Cookies from 'js-cookie';

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

  const handleLogout = () => {
    logout.logout();
    navigate("/welcome");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alternar estado da sidebar
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white flex flex-col`}>
        <div className="flex items-center justify-between p-4">
          {/* Quando a sidebar está aberta, exibe o nome do aplicativo */}
          <h2 className={`text-xl font-bold transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
            BrainSpark
          </h2>

          {/* Botão para alternar entre expandir/retrair */}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none p-0 bg-transparent border-none"
            title={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
            style={{
              fontSize: isSidebarOpen ? '20px' : '14px', // Ajusta o tamanho da seta
            }}
          >
            {/* A seta de alternância */}
            <FaAngleLeft className={`transition-transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Navegação com ícones e texto visível quando a sidebar está aberta */}
        {isSidebarOpen ? (
          <nav className="flex-1 space-y-2 px-4">
            <button className="w-full text-left hover:bg-gray-700 px-2 py-2 rounded transition flex items-center">
              <FaChartBar className="inline-block mr-2" style={{ fontSize: '24px' }} />
              Dashboard
            </button>
            <button className="w-full text-left hover:bg-gray-700 px-2 py-2 rounded transition flex items-center">
              <FaCog className="inline-block mr-2" style={{ fontSize: '24px' }} />
              Configurações
            </button>
            <button className="w-full text-left hover:bg-gray-700 px-2 py-2 rounded transition flex items-center">
              <FaUserCircle className="inline-block mr-2" style={{ fontSize: '24px' }} />
              Perfil
            </button>
          </nav>
        ) : (
          // Quando a sidebar está retraída, apenas os ícones são visíveis, sem texto
          <nav className="flex-1 space-y-2 px-4">
            <button className="w-full text-left hover:bg-gray-700 px-2 py-2 rounded transition flex items-center">
              <FaChartBar className="inline-block" style={{ fontSize: '24px' }} />
            </button>
            <button className="w-full text-left hover:bg-gray-700 px-2 py-2 rounded transition flex items-center">
              <FaCog className="inline-block" style={{ fontSize: '24px' }} />
            </button>
            <button className="w-full text-left hover:bg-gray-700 px-2 py-2 rounded transition flex items-center">
              <FaUserCircle className="inline-block" style={{ fontSize: '24px' }} />
            </button>
          </nav>
        )}

        {/* Botão de logout visível apenas quando a sidebar está aberta */}
        {isSidebarOpen && (
          <div className="p-4">
            <button 
              onClick={handleLogout} 
              className="text-sm text-red-400 hover:text-red-300 flex items-center"
            >
              <FaSignOutAlt className="mr-2" style={{ fontSize: '20px' }} />
              Sair da conta
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Bem-vindo, <span className="text-blue-600">{email}</span> 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Aqui é o seu espaço para criar, organizar e colaborar.
        </p>

        <section className="bg-white border border-gray-200 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Seus espaços de trabalho</h2>
          <p className="text-gray-500">Nenhuma página criada ainda. Comece agora!</p>
        </section>
      </main>
    </div>
  );
}
