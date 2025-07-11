import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';  
import Header from "../../components/apresentation/Header";
import Hero from "../../components/apresentation/Hero";
import Features from "../../components/apresentation/Features";
import Management from "../../components/apresentation/Management";
import Stats from "../../components/apresentation/Stats";
import StudyFeatures from "../../components/apresentation/StudyFeatures";
import Testimonials from "../../components/apresentation/Testimonials";
import CallToAction from "../../components/apresentation/CallToAction";
import Footer from "../../components/apresentation/Footer";

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
    <div className="flex flex-col h-screen w-full ">
        <Header />
        <div className="overflow-y-auto">
          <Hero />
          <Management />
          <Stats />
          <StudyFeatures />
          <Testimonials />
          <CallToAction />
          <Features />
          <Footer />
        </div>
    </div>
  );
}
