import { useEffect, useState } from "react"; 
import DeleteAccountModal from "../../components/home/DeleteAccountModal.tsx";
import BaseComponent from "../../components/home/ContentComponentBase.tsx"
import { GetAccounData } from '../../features/UsersInfo.ts';
import AccountHeader from "@/components/accountSettings/AccountHeader.tsx"
import AvatarProfile from "@/components/accountSettings/ProfileAvatar.tsx"
import PersonalInfo from "@/components/accountSettings/PersonalInfo.tsx"
import DeleteAccount from "@/components/accountSettings/DeleteAccount.tsx"
import Divider from "@/components/shared/Divider";

export default function UserInfo() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        profileSrc: "",
        birthDate: new Date()
    });
      
    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        birthDate: new Date()
    });
      
    useEffect(() => {
      fetchData();
    }, []);

    async function fetchData() {
      var response  = await GetAccounData();

      if (response !== null) {
          setUserForm({
            email: response.email,
            name: response.name,
            profileSrc: response.photoLink || "",
            birthDate: new Date()
          })
          setFormInput({
            email: response.email,
            name: response.name, 
            birthDate: new Date()
          })
      }
    }

    const onPictureUpdate = () => {
      console.log("OK funcionou")
    }

    return(
      <BaseComponent className="w-full min-h-screen flex justify-center bg-gray-50">
        <div className="min-w-[1000px] h-full p-5">
          <AccountHeader />

          <div className="flex flex-col gap-y-5">
            <AvatarProfile currentPicture={userForm.profileSrc} onPictureUpdate={onPictureUpdate}/>  
            <PersonalInfo 
              name={userForm.name}
              email={userForm.email} 
              birthDate={userForm.birthDate}
            />   
          </div> 

          {/* Divider */}
          <Divider orInDivide={false}/>    

          <div className="pb-10">
            <DeleteAccount />
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
        </div>
      </BaseComponent>
    );
}