import {
    FaFacebookF,
    FaInstagram,
  } from "react-icons/fa";
  
export default function InfoDefault({}) {
    return(
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
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
          </div>
        </div>
      </div>
    );
}