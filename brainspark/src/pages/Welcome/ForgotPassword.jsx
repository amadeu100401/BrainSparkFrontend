import InputGroup from "../../components/InputGroup";
import {
    FaEnvelope 
  } from "react-icons/fa";

export default function ForgotPassword({ setView }) {
        const handleForgetPasswordSubmit = async (e) => {
            e.preventDefault();
        };

    return(
        <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Recuperação de senha</h2>
        <form onSubmit={handleForgetPasswordSubmit} className="space-y-4">
          <InputGroup
            type="email"
            name="email"
            placeholder="Email"
            icon={<FaEnvelope />}
          />
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-20 rounded font-semibold mt-4 mx-auto"
            >
              Enviar
            </button>
          </div>
        </form>
        <p
          onClick={() => {
            setView("login");
          }}
          className="text-sm text-center text-white/60"
        >
          <span className="font-semibold hover:text-white hover:underline cursor-pointer">Voltar</span>
        </p>
      </div>
    );
}