import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpUtil"; 
import BaseComponent from '../../components/home/ContentComponentBase'
import { getDayMessage } from "../../utils/TimeUtils"; 
import KeyMetrics from "../../components/home/KeyMetricsComponent";
import TodayActivities from "../../components/home/TodayActivites";
import NextTests from "../../components/home/NextTests";

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

  // Simulação de dados do usuário
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

  //TODO: Integrar com a API para obter as atividades de hoje e provas futuras
  // Simulação de atividades de hoje
  const todayTasks = [
    { id: 1, subject: "Matemática", topic: "Derivadas", completed: true, timeSpent: 90 },
    { id: 2, subject: "Física", topic: "Cinemática", completed: true, timeSpent: 60 },
    { id: 3, subject: "Química", topic: "Ligações Químicas", completed: false, timeSpent: 0 },
    { id: 4, subject: "História", topic: "Segunda Guerra", completed: false, timeSpent: 0 },
    { id: 5, subject: "História", topic: "Segunda Guerra", completed: false, timeSpent: 0 },
    { id: 6, subject: "História", topic: "Segunda Guerra", completed: false, timeSpent: 0 },
    { id: 7, subject: "História", topic: "Segunda Guerra", completed: false, timeSpent: 0 }
  ];

  //TODO: Integrar com a API para obter as provas futuras
  //Simulação de provas futuras
  const upcomingTests = [
    {id: 1, subject: "Matemática", date: new Date("2025-07-15")},
    {id: 2, subject: "Física", date: new Date("2025-10-20")},
    {id: 3, subject: "Química", date: new Date("2025-10-25")},
  ]

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
        <TodayActivities activities={todayTasks}/>
        <NextTests tests={upcomingTests}/>
      </div>
    </BaseComponent>
  );
}