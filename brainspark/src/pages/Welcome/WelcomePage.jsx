import FixedContent from "../../components/login/FixedContent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Toaster } from "@/components/ui/toaster";    
import Header from "../../components/apresentation/Header";
import Hero from "../../components/apresentation/Hero";
import Features from "../../components/apresentation/Features";

export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate("/brainspark/main");
    } else {
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    // <div className="h-screen w-full flex flex-col md:flex-row text-white select-none">
    //   <FixedContent />
    //   <div className="md:w-1/2 w-full h-1/2 md:h-full bg-gray-900 flex items-center justify-center px-6 py-12 bg-gradient-to-t from-slate-900 to-slate-700">
    //     <Outlet />
    //   </div>
    //   <Toaster />
    // </div>
    <div className="min-h-screen select-none">
        <Header />
        <Hero />
        <Features />
    </div>
  );
}
