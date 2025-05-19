import Logo from '../../assets/Logo.png';
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpUtil"; 
import LoadingCircle from '../../components/home/LoadingComponent'
import BaseComponent from '../../components/home/ContentComponentBase'
import { IdeaCarousel } from '../../components/home/IdeaCarousel';
import MenuFilterBar from '../../components/home/menu/Menubar';
import { TextAreaAI } from '../../components/home/createWithAI/TextArea';
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react";

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

  return (
    <BaseComponent className="p-6 font-sans flex flex-col items-center bg-gray-50 space-y-4">
                      
      {/* Header com logo + saudação */}
      <div className="flex flex-col items-center space-y-2 mb-2">
        <img src={Logo} alt="Logo" className="w-32 h-32" />

        {!loading && (
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            {getGreeting()}, {mainPage.name || "usuário"}!
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
        <>
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Documentos recentes
          </Label>
          <div className="flex justify-center flex-wrap gap-6">
            <IdeaCarousel ideas={mainPage.documents}/>
          </div>

          <TextAreaAI />
        </>
      )}
    </BaseComponent>
  );
}
