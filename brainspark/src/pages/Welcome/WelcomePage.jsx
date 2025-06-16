import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';  
import Header from "../../components/apresentation/Header";
import Hero from "../../components/apresentation/Hero";
import Features from "../../components/apresentation/Features";
import { Toaster } from 'sonner';

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
    <div className="min-h-screen select-none">
        <Header />
        <Hero />
        <Features />
    </div>
  );
}
