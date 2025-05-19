import { useEffect, useState } from "react"; 
import Loading from "../../components/home/LoadingComponent.tsx";
import DeleteAccountModal from "../../components/home/DeleteAccountModal.tsx";
import { Input } from "@/components/ui/input"
import BaseComponent from "../../components/home/ContentComponentBase.tsx"
import { GetAccounData, UpdateUsersInfo } from '../../features/UsersInfo.ts';

export default function UserInfo() {
    const [loading, setLoading] = useState(true);
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
      
    useEffect(() => {
      fetchData();
    }, []);

    async function fetchData() {
      setLoading(true)
      var response  = await GetAccounData();

      if (response !== null) {
          setLoading(false)
          setUserForm({
            email: response.email,
            name: response.name,
            photoLink: response.photoLink || ""
          })
          setFormInput({
            email: response.email,
            name: response.name
          })
      }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await UpdateUsersInfo({
        name: formInput.name
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormInput((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) return <Loading />;

    return(
        <BaseComponent className="w-full p-8 bg-gray-50 rounded-xl shadow-sm border border-black/20">
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
          className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-500/55"
          onClick={() => setShowDeleteModal(true)}
          >
            Excluir minha conta
          </button>
        </div>
        {showDeleteModal && (
        <DeleteAccountModal 
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onSuccess={() => {
            setShowDeleteModal(false);
            }}
        />
        )}
      </BaseComponent>
    );
}