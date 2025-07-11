import { ClockIcon, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:grid-cols-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold gradient-text">BrainSpark</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            A plataforma completa para transformar seu tempo em produtividade. 
                            Organize suas tarefas, gerencie projetos e alcance seus objetivos com eficiência.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center text-gray-400">
                                <Mail className="w-4 h-4 mr-2" />
                            <span>contato@brainspark.com</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Phone className="w-4 h-4 mr-2" />
                            <span>+55 (79) 98844-5482</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <MapPin className="w-4 h-4 mr-2" />
                            <span>Sergipe, Brasil</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        ©2025 BrainSpark. Todos os direitos reservados.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Política de Privacidade
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Termos de Uso
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}