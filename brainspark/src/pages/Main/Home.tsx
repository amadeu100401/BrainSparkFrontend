import Logo from '../../assets/logo.png';
import { useEffect, useState } from "react";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import LoadingCircle from './components/LoadingComponent'
import { getTokenSession, saveMainPageInCookie, getMainPageInfo} from '../../utils/CookieManeger';
import { useNavigate } from "react-router-dom";
import BaseComponent from './components/BaseComponent'

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
  const navigate = useNavigate();

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
        saveMainPageInCookie(data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da main page:", error);
    } finally {
      setLoading(false); 
    }
  };

  const getCookieData = () => {
    const cookieData = getMainPageInfo();
    return cookieData !== null && cookieData !== undefined ? cookieData : null;
  }

  useEffect(() => {
    const cookieData = getCookieData();
    console.log(cookieData);
    if (cookieData !== null) {
      setMainPage({
        name: cookieData.name,
        documents: cookieData.ideaList || []
      });
    } else {
      fetchData();
    }
  }, []);

  const handleNewDoc = () => {
    navigate("/brainspark/idea");
  }

  return (
    <BaseComponent className="p-6 font-sans h-auto flex flex-col items-center bg-gray-50 
                    min-h-screen">
      <img src={Logo} alt="Logo" className="w-48 h-48 mb-2" />

      {!loading && (
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {getGreeting()} { mainPage.name|| ""}!
        </h1>
      )}

      {loading ? (
        <LoadingCircle />
      ) : (
        <div className="flex justify-center flex-wrap gap-6">
          {mainPage.documents.map((doc, index) => (
            <div
              key={index}
              onClick={() => console.log("Abrindo documento:", doc.id)}
              className="w-56 h-56 bg-white border border-gray-300 rounded-lg p-4 
              flex flex-col justify-between shadow-md transform transition-all duration-200 ease-in-out
              hover:scale-[1.03] hover:shadow-xl hover:shadow-gray-400 
              active:scale-100 active:shadow-md cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
              <p className="text-xs text-gray-500">
                Modificado em{" "}
                {new Date(doc.updatedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}

          {mainPage.documents.length < 3 && (
            <div className="w-56 h-56 border-2 border-dashed border-green-500 rounded-lg p-4 flex 
              flex-col justify-center items-center shadow-md cursor-pointer 
              transition-all duration-300 ease-in-out hover:bg-green-50 hover:shadow-lg"
              onClick={() => handleNewDoc()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-green-600 font-semibold">Novo Documento</p>
            </div>
          )}
        </div>
      )}
    </BaseComponent>
  );
}
