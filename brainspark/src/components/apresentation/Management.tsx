import {Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Management() {
    return (
        <section className="py-16 bg-blue-50" >
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <Target className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Gerencie Seus Estudos de Forma Inteligente
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Organize seus objetivos de estudo, cadastre suas provas e acompanhe seu progresso. 
                        Nossa plataforma te ajuda a manter o foco e alcançar seus objetivos acadêmicos.
                    </p>
                    <Link to="/welcome/register">
                        <Button size="lg" className="text-lg px-8 py-3">
                            Comece Agora
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )   
}