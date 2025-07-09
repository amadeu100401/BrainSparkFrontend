import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpUtil"; 
import BaseComponent from '../../components/home/ContentComponentBase'
import { getDayMessage } from "../../utils/TimeUtils"; 
import KeyMetrics from "../../components/home/KeyMetricsComponent";

interface Document {
  title: string;
  updatedAt: string;
  id: string;
}

interface MainPageData {
  name: string;
  documents: Document[];
}

export default function WelcomeScreen() {
  const [mainPage, setMainPage] = useState<MainPageData>({
    name: "",
    documents: []
  });
  const [loading, setLoading] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const fetchData = async () => {
    try {
      setLoading(true); 
      const response = await httpRequest({
        url:"/api/v1/users/main-page",
        method:"GET",
      });
      
      setMainPage({
        name: response.name,
        documents: response.ideaList || []
      });
    } catch (error) {
      console.error("Erro ao buscar dados da main page:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  const userStats = {
    dailyGoal: 6,
    studiedToday: 3.5,
    weeklyProgress: 75,
    streak: 7,
    completedTasks: 8,
    totalTasks: 12,
    upcomingExams: 3,
    favoriteSubject: "Matemática"
  };

  return (
    <BaseComponent className="p-6 font-sans flex flex-col bg-gray-50 space-y-4">
      <div className='flex flex-col space-y-2 items-start mb-4'>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          {getGreeting()}, {mainPage.name || "Estudante"}!
        </h1>
        <span className="text-gray-600">
          {getDayMessage()} 
        </span>
      </div>

      <div>
        <KeyMetrics userStats={userStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      </div>
    </BaseComponent>
  );
}