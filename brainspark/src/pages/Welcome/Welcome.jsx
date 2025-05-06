import { useState } from "react";
import RightSide from "./RightSide";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginFOrm";
import ForgotPassword from "./ForgotPassword";
import Default from "./Default";

export default function WelcomePage() {
  const [view, setView] = useState("default");

  return (
    <div className="h-screen w-full flex flex-col md:flex-row text-white">
      {/* Lado esquerdo */}
      <RightSide/>

      {/* Lado direito */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full bg-gray-900 flex items-center justify-center px-6 py-12">
        {view === "default" && (
          <Default setView={setView}/>
        )}

        {view === "register" && (
          <RegisterForm setView={setView} />
        )}

        {view === "login" && (
          <LoginForm setView={setView}/>
        )}

        {view === "forgotPassword" && (
          <ForgotPassword setView={setView}/>
        )}
      </div>
    </div>
  );
}
