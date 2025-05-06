import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      navigate("/welcome");
    }
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">BrainSpark</h2>
        <nav className="space-y-4">
          <button className="text-left w-full text-gray-700 hover:text-blue-600">Dashboard</button>
          <button className="text-left w-full text-gray-700 hover:text-blue-600">Configurações</button>
          <button className="text-left w-full text-gray-700 hover:text-blue-600">Perfil</button>
        </nav>
        <button 
          onClick={handleLogout} 
          className="mt-10 text-sm text-red-500 hover:underline"
        >
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Bem-vindo, {email} 👋</h1>
        <p className="text-gray-600">Essa é sua página inicial após o login ou validação de conta.</p>
      </main>
    </div>
  );
}
