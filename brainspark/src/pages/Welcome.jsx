import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col md:flex-row text-white">
      {/* Left Side – Branding */}
      <div
        className="md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center relative flex items-center justify-center px-6 py-12"
        style={{ backgroundImage: "url('/welcome.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-md space-y-5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Bem-vindo ao <span className="text-blue-400">BrainSpark</span>
          </h1>
          <p className="text-sm md:text-base text-white/80">
          O espaço de trabalho inteligente com tecnologia de IA para organizar suas ideias, anotações e tarefas – mais rápido e inteligente do que nunca.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-xl mt-4">
            <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
            {/* <FaTwitter className="hover:text-sky-400 cursor-pointer" /> */}
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
            {/* <FaYoutube className="hover:text-red-500 cursor-pointer" /> */}
          </div>
        </div>
      </div>

      {/* Right Side – CTA */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full bg-gray-900 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <h2 className="text-3xl font-semibold">Comece a criar de forma mais inteligente</h2>
          <p className="text-white/70">Entre ou crie uma nova conta BrainSpark</p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-blue-700 hover:bg-blue-100 py-2 rounded-lg font-semibold"
            >
              Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
