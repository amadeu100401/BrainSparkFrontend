import { loginUser } from "@/features/Login";
import AuthForm from "./AuthForm";

interface AuthModalProps {
    isAuthenticated: boolean;
}

export default function AuthModal({ isAuthenticated }: AuthModalProps) {

    const handleLogin = async (password: string) => {
        const { email, rememberMe } = getInforFormSessionStorage();

        if(email) {
            const response = await loginUser(email, password, rememberMe);

            if(response.success) {
                window.location.reload();
            } else {
                console.log(response.message);
            }
        }
    }

    const getInforFormSessionStorage = () => {
        const email : string | null = sessionStorage.getItem("email");
        const rememberMe : boolean | null = sessionStorage.getItem("rememberMe") === "true";
        return { email, rememberMe };
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100/50 bg-transparent">
                <AuthForm isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        </div>
    )
}