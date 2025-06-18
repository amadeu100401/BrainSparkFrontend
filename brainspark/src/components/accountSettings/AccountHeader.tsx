import {ArrowLeft, User} from "lucide-react"
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function AccountHeader() {

    const navigate = useNavigate();

    const handleComeBack = () => {
        navigate("/brainspark/home");
    }


    return(
        <header className="flex mb-8 gap-10">
            <div className="flex gap-2">
                <Button 
                    type="button"
                    variant="ghost" 
                    className="flex items-center gap-2 bg-transparent"
                    onClick={handleComeBack}
                >

                    <ArrowLeft className="text-zinc-800 w-4 h-4"/>
                    Voltar
                </Button>
            </div>

            <div className="flex gap-4">
                <User className="text-blue-600"/>
                <h1 className="font-bold text-xl">Configuração da conta</h1>
            </div>
        </header>
    );
}