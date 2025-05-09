import { useEffect, useState } from "react";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import { useAuth } from '../../components/AuthContext';
import ErrorToast from "../../components/ErrorToast";
import Loading from "./components/LoadingComponent";
import DeleteAccountModal from "./components/DeleteAccountModal";
import Cookies from 'js-cookie';

export default function UserInfo() {
    var context = useAuth();
    var token = Cookies.get("token") || sessionStorage.getItem("token");

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

    useEffect(() => {
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
                    setShowToast(false);
                }

            } catch(erro) {
                console.error("Erro ao buscar dados do cliente:", erro);
                setError("Falha ao buscar os dados do cliente.");
                setShowToast(true);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])   
    
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
        setShowToast(true);
        }
    } catch (error) {
        setError("Erro ao realizar atualizar de perfil. Tente novamente mais tarde.");
        setShowToast(true);
    }
    };

    if (loading) return <Loading />;

    return(
        <div className="w-full p-8 bg-white rounded-md shadow">
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
              <input
                name="name"
                value={formInput.name}
                placeholder="Seu nome"
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
  
            {/* <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={userForm.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div> */}
  
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Seu email"
                value={userForm.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-white border border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-black opacity-50 cursor-not-allowed"
                required
                readOnly
              />
            </div>
  
            {/* <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                name="country"
                value={userForm.country}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div> */}
  
            {/* <div>
              <label className="block text-sm font-medium">City</label>
              <input
                name="city"
                value={userForm.city}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div> */}
  
            {/* <div>
              <label className="block text-sm font-medium">Zip Code</label>
              <input
                name="zip"
                value={userForm.zip}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div> */}
          </div>
  
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
  
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Delete Account</h3>
          <p className="text-sm text-gray-600 mb-4">
            After making a deletion request, you will have <strong>6 months</strong> to maintain this account.
          </p>
          <button 
          className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
          onClick={() => setShowDeleteModal(true)}
          >
            Excluir minha conta
          </button>
        </div>
        {showToast && (
            <ErrorToast
                message={error}
                onClose={() => setShowToast(false)}
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