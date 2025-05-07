import RightSide from "./RightSide";
import { Outlet } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row text-white">
      {/* Lado esquerdo */}
      <RightSide/>

      {/* Lado direito */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full bg-gray-900 flex items-center justify-center px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
