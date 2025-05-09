import RightSide from "./RightSide";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

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
    <div className="h-screen w-full flex flex-col md:flex-row text-white">
      <RightSide />
      <div className="md:w-1/2 w-full h-1/2 md:h-full bg-gray-900 flex items-center justify-center px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
