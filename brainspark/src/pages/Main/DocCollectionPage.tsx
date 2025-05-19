import { GetUsersIdea } from '../../features/GetAllIdeaDocs'
import BaseComponent from '../../components/home/ContentComponentBase'
import DocumentGallery from '../../components/ideaCollection/Display';
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"

interface UserDocument {
  id: string;
  title: string;
  description?: string;
//   category?: 
  status?: string
  priority?: any
  content: string,
  createdAt: any,
  updatedAt?: string;
}

export default function DocCollection() {
    
    const { toast } = useToast();
    const [documents, setDocuments] = useState<UserDocument[]>([]);

    useEffect(() => {
        getUsersIdea();
    }, []);

    const getUsersIdea = async () => {
        try {
            const response = await GetUsersIdea();
            setDocuments(response);
        } catch (error: any) {
            toast({
                description: error.message
            })
        }
    }

    return (
        <BaseComponent className="p-6 font-sans flex flex-col items-center bg-gray-50 space-y-4">
                        <DocumentGallery documents={documents} />
        </BaseComponent>
    );
}
