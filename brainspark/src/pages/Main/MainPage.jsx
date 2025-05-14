import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom"; 

export default function MainPage() {
  const navigate = useNavigate();
  const email = Cookies.get("email") || sessionStorage.getItem("email");

  return (
    <div className="min-h-screen flex overflow-hidden bg-zinc-900 text-black">
      {/* Sidebar */}
      <Sidebar /> 

      {/* Main content area */}
      <div className="flex-1 flex flex-col pl-20">
        <main className="flex-1 p-6 overflow-auto bg-zinc-850 text-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
