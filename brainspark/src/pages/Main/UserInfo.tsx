import { useEffect, useState } from "react";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import { useAuth } from '../../components/AuthContext';
import Toast from "../../components/Toast.tsx";
import Loading from "./components/LoadingComponent";
import DeleteAccountModal from "./components/DeleteAccountModal";
import Cookies from 'js-cookie';
import { saveUserInfoInSession, updateUserInfo, getUserInfo } from '../../utils/CacheManeger.ts'
import { Input } from "@/components/ui/input"

export default function UserInfo() {
    var context = useAuth();
    var token = Cookies.get("token") || sessionStorage.getItem("token");

    const [showToastError, setShowToastError] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        photoLink: ""
      });
      
      const [formInput, setFormInput] = useState({
        name: "",
        email: ""
      });
      
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormInput((prev) => ({ ...prev, [name]: value }));
      };

    const fetchData = async () => {
          try {
              const { status, ok, data } = await httpRequest(
                  "/api/v1/users/get-info", 
                  "GET", 
                  null, 
                  {}, 
                  token);

              if (ok) {
                  setUserForm({
                      email: data.email,
                      name: data.name,
                      photoLink: data.photoLink
                  })
                  setFormInput({
                      email: data.email,
                      name: data.name
                  })
                  
                  saveUserInfoInSession(data);

                  setShowToastError(false);
              }

          } catch(erro) {
              console.error("Erro ao buscar dados do cliente:", erro);
              setError("Falha ao buscar os dados do cliente.");
              setShowToastError(true);
          } finally {
              setLoading(false);
          }
      }

    useEffect(() => {
        const cookieData = getDataFromCookie();

        if (cookieData !== null) {
            setUserForm({
                email: cookieData.email,
                name: cookieData.name,
                photoLink: cookieData.photoLink
            });
            setFormInput({
                email: cookieData.email,
                name: cookieData.name
            });
        } else {
            fetchData();
        }
    }, []);

    const getDataFromCookie = () => {
      const cookieData = getUserInfo();

      if (cookieData && typeof cookieData === 'object' && Object.keys(cookieData).length > 0) {
          setLoading(false);
          return cookieData;
      } else {
          return null;
      }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("image", "");
        formData.append("request", new Blob(
        [JSON.stringify({ name: formInput.name, birthDate: "2001-01-01" })],
        { type: "application/json" }
        ));

        const { status, ok } = await httpRequest(
        "/api/v1/users/update", 
        "PUT",
        formData, 
        {}, 
        token);

        if (!ok) {
          alert("Erro ao atualizar informações: Status: " + status);
          setShowToastError(true);
        }

        updateUserInfo(formInput);
        setShowToast(true);
    } catch (error) {
        setError("Erro ao realizar atualizar de perfil. Tente novamente mais tarde.");
        setShowToastError(true);
    }
    };

    if (loading) return <Loading />;

    return(
        <div className="w-full p-8 bg-gray-50 rounded-xl shadow-sm border border-black/20">
        <h2 className="text-2xl font-semibold mb-6">Informações do usuário</h2>
        
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={userForm.photoLink || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-medium">{userForm.name}</p>
            <p className="text-sm text-gray-500">{userForm.email}</p>
          </div>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <Input
                name="name"
                type="name"
                value={formInput.name}
                placeholder="Seu nome"
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                disabled 
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-black opacity-50"
                required
              />
            </div>
          </div>
  
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
            >
              Salvar alterações
            </button>
          </div>
        </form>
  
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Excluir conta</h3>
          <p className="text-sm text-gray-600 mb-4">
            Após requisitar a exclusão, você terá <strong>1 dia</strong> para manter essa conta.
          </p>
          <button 
          className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
          onClick={() => setShowDeleteModal(true)}
          >
            Excluir minha conta
          </button>
        </div>
        {showToast && (
          <Toast 
            message={"Dados salvos com sucesso!"}
            onClose={() => console.log()}
            type="success"
          />
        )}
        {showToastError && (
          <Toast 
            message={error}
            onClose={() => console.log()}
            type="error"
          />
        )}
        {showDeleteModal && (
        <DeleteAccountModal 
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onSuccess={() => {
            setShowDeleteModal(false);
            context.logout();
            }}
        />
        )}
      </div>
    );
}