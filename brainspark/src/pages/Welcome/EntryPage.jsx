import { useNavigate } from "react-router-dom";
import Logo from '../../assets/LogoWhite.png';

export default function Default() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md space-y-6 text-center mx-auto py-8 px-4">
      {/* Logo */}
      <img src={Logo} alt="Logo" className="w-64 h-64 mb-2 mx-auto" /> {/* Aumentando a logo e diminuindo a margem inferior */}

      {/* Título */}
    <h2 className="text-2xl text-white whitespace-nowrap">Comece a criar de forma mais inteligente</h2>


      {/* Subtítulo */}
      <p className="text-white/70">Entre ou crie uma nova conta BrainSpark</p>

      {/* Botões */}
      <div className="flex flex-col space-y-4 mt-6">
        <button
          onClick={() => navigate("/welcome/login")}
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/welcome/register")}
          className="bg-white text-blue-700 hover:bg-blue-100 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Cadastro
        </button>
      </div>
    </div>
  );
}
