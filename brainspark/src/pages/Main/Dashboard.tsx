import { useEffect, useState } from "react";
import httpRequest, { ContextEnum } from "../../utils/HttpUtil"; 
import BaseComponent from '../../components/home/ContentComponentBase'
import { getDayMessage } from "../../utils/TimeUtils"; 
import KeyMetrics from "../../components/home/KeyMetricsComponent";
import TodayActivities from "../../components/home/TodayActivites";
import NextTests from "../../components/home/NextTests";

interface userRole {
  code: number;
  title: string;
}

interface todayActivities {
  id: string;
  Subject: string;
  topic: string;
  isConcluded: boolean;
  totalStudyTime: number;
}

interface nextTestResponses {
  name: string;
  doDate: Date;
}

interface MainPageData {
  userName: string;
  userEmail: string;
  avatarLink: string;
  birthDate: Date | null;
  totalTimeToday: number;
  daysInARow: number;
  activitiesConcluded: number;
  weeklyProgress: number;
  userRole: userRole[] | [];
  totalActivityCount: number;
  todayTimeGoal: number;
  todayActivities: todayActivities[] | [];
  nextTestResponses: nextTestResponses[] | [];
}

export default function WelcomeScreen() {
  const [mainPage, setMainPage] = useState<MainPageData>({
    userName: "",
    userEmail: "",
    avatarLink: "",
    birthDate: null,
    totalTimeToday: 0,
    daysInARow: 0,
    activitiesConcluded: 0,
    weeklyProgress: 0,
    userRole: [],
    totalActivityCount: 0,
    todayTimeGoal: 0,
    todayActivities: [],
    nextTestResponses: []
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
        url: ContextEnum.me + "/summary",
        method:"GET",
      });
      
      setMainPage({
        userName: response.userName,
        userEmail: response.userEmail,
        avatarLink: response.avatarLink,
        birthDate: response.birthDate,
        totalTimeToday: response.totalTimeToday,
        daysInARow: response.daysInARow,
        activitiesConcluded: response.activitiesConcluded,
        weeklyProgress: response.weeklyProgress,
        userRole: response.userRole,
        totalActivityCount: response.totalActivityCount,
        todayTimeGoal: response.todayTimeGoal,
        todayActivities: response.totalActivities,
        nextTestResponses: response.nextTestResponses
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
    dailyGoal: mainPage.todayTimeGoal,
    studiedToday: mainPage.todayTimeGoal,
    weeklyProgress: mainPage.weeklyProgress,
    streak: mainPage.daysInARow,
    completedTasks: mainPage.activitiesConcluded,
    totalTasks: mainPage.totalActivityCount,
    weeklyGoal: mainPage.weeklyProgress,
    favoriteSubject: "Matemática"
  };

  return (
    <BaseComponent className="p-6 font-sans flex flex-col bg-gray-50 space-y-4 pb-10">
      <div className='flex flex-col space-y-2 items-start mb-4'>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          {getGreeting()}, {mainPage.userName || "Estudante"}!
        </h1>
        <span className="text-gray-600">
          {getDayMessage()} 
        </span>
      </div>

      <div>
        <KeyMetrics userStats={userStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TodayActivities activities={mainPage.todayActivities}/>
        <div className="grid grid-cols-1">
          <NextTests tests={mainPage.nextTestResponses}/>
        </div>
      </div>
      <div className="h-10" />
    </BaseComponent>
  );
}