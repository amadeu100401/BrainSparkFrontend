import Logo from '../../../assets/logo.png';
import { useEffect, useState } from "react";
import { httpRequest } from "../../../utils/HttpRequestsUtil"; 
import LoadingCircle from '../components/LoadingComponent'
import { getTokenSession, saveMainPageInSession, getMainPageInfo} from '../../../utils/CacheManeger';
import BaseComponent from '../components/BaseComponent'
import { IdeaCarousel } from './components/IdeaCarousel';
import MenuFilterBar from './components/menu/Menubar';

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
      const token = getTokenSession() || sessionStorage.getItem("token");
      const { ok, data } = await httpRequest("/api/v1/users/main-page", "GET", null, {}, token);
      if (ok) {
        setMainPage({
          name: data.name,
          documents: data.ideaList || []
        });
        saveMainPageInSession(data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da main page:", error);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
      fetchData();
  }, []);

  return (
    <BaseComponent className="p-6 font-sans h-auto flex flex-col items-center bg-gray-50 
                    min-h-screen space-y-4">
                      
      {/* Header com logo + saudação */}
      <div className="flex flex-col items-center space-y-2 mb-2">
        <img src={Logo} alt="Logo" className="w-32 h-32" />

        {!loading && (
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            {getGreeting()} {mainPage.name || ""}!
          </h1>
        )}

        {/* Menu mais próximo da saudação */}
        <div className="mt-2">
          <MenuFilterBar />
        </div>
      </div>

      {loading ? (
        <LoadingCircle />
      ) : (
        <div className="flex justify-center flex-wrap gap-6">
          <IdeaCarousel ideas={mainPage.documents}/>
        </div>
      )}
    </BaseComponent>
  );
}
