import httpUtil, { ContextEnum } from "../utils/HttpUtil";

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

export const GetUsersIdea = async () => {    
    try {
        const response = await httpUtil({
            url: ContextEnum.idea + "/user-documents",
            method: "GET"
        })

        const data = response.userIdeaDocs;

        if (Array.isArray(data)) { 
            return data as UserDocument[];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
} 