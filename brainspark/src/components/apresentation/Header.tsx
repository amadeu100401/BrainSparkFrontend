import { Button } from "@/components/ui/button";
import { ClockIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApresentationPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-5 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <ClockIcon className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold gradient-text">BrainSpark</h1>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Recursos
                        </a>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Preços
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Sobre
                        </a>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button 
                            variant="ghost" className="text-gray-600 hover:text-gray-900"
                            onClick={() => navigate("/welcome/login")}
                        >
                            Entrar
                        </Button>
                        <Button 
                            className="gradient-bg text-white hover:opacity-90 transition-opacity"
                            onClick={() => navigate("/welcome/register")}
                        >
                            Começar Grátis
                        </Button>
                    </div>
                </div>
                
                <Button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                        {isMenuOpen ? (
                        <X className="w-6 h-6 text-gray-600" />
                        ) : (
                        <Menu className="w-6 h-6 text-gray-600" />
                        )}
                </Button>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                <div className="md:hidden py-4 border-t border-gray-200">
                    <nav className="flex flex-col space-y-4">
                    <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Recursos
                    </a>
                    <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Preços
                    </a>
                    <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Sobre
                    </a>
                    <div className="flex flex-col space-y-2 pt-4">
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900 w-full">
                        Entrar
                        </Button>
                        <Button className="gradient-bg text-white hover:opacity-90 transition-opacity w-full">
                        Começar Grátis
                        </Button>
                    </div>
                    </nav>
                </div>
                )}
            </div>
        </header>   
    )
}