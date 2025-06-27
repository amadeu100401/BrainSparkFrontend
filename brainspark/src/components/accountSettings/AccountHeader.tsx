import { User } from "lucide-react"

export default function AccountHeader() {

    return(
        <header className="flex items-center mb-8 gap-10">
            <div className="flex gap-4">
                <User className="text-blue-600"/>
                <h1 className="font-bold text-xl">Configuração da conta</h1>
            </div>
        </header>
    );
}