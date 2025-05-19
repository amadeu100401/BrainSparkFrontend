import Sidebar from "../../components/home/sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom"; 

export default function MainPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-zinc-900 text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col pl-20">
        <main className="flex-1 p-6 bg-zinc-850 text-black">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
