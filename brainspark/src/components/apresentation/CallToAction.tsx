import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export default function CallToAction() {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Pronto para transformar seus estudos?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    Junte-se a milhares de estudantes que já alcançaram seus objetivos
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-44">
                    <Link to={"/welcome/register"}>
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                            Começar gratuitamente
                        </Button>
                    </Link>
                </div>
                <div className="mt-6 text-sm opacity-75">
                    Sem cartão de crédito • Teste grátis por 14 dias
                </div>
            </div>
        </section>
    );
}