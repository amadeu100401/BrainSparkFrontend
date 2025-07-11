import { Card, CardContent } from "../ui/card";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {

    const testimonials = [
        {
            name: "Ana Clara",
            feedback: '"Consegui organizar meu cronograma de estudos para o ENEM e melhorei minha produtividade em 80%. Aprovada em Medicina!"',
            corse: "Estudante de Medicina - USP"
        },
        {
            name: "Lucas Silva",
            feedback: '"As ferramentas de planejamento e relatórios são incríveis! Me ajudaram a melhorar meu desempenho acadêmico."',
            corse: "Servidor Público - TRT"
        },
        {
            name: "Mariana Costa",
            feedback: '"Finalmente consegui equilibrar trabalho e estudos. Passei na OAB na primeira tentativa usando o BrainSpark!"',
            corse: "Advogada - OAB/SP"
        },
    ];

    return(
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        O que nossos estudantes dizem
                    </h2>
                    <p className="text-lg text-gray-600">
                        Histórias reais de sucesso acadêmico
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                       <Card className="p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-4">
                                    {testimonial.feedback}
                                </p>
                                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.corse}</div>
                            </CardContent>
                       </Card> 
                    ))}
                </div>
            </div>
        </section>
    );
}