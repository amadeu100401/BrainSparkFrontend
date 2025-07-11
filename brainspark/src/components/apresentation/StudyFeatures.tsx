import { BookOpen, Trophy, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function StudyFeatures() {
    const features = [
        {
            icon: BookOpen,
            title: "Planejamento de Matérias",
            description: "Organize suas disciplinas, defina metas diárias e acompanhe seu progresso em cada matéria.",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Trophy,
            title: "Gestão de Provas",
            description: "Cadastre suas provas, concursos e exames com prazos e planos de estudo personalizados.",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: BarChart3,
            title: "Relatórios de Progresso",
            description: "Visualize seu desempenho com gráficos detalhados e identifique áreas para melhorar.",
            color: "text-red-600",
            bgColor: "bg-red-50"
        },
    ]

    return (
        <section id="studyFeatures" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-6">
                        Tudo que você precisa para <span className="gradient-text">estudar melhor</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Ferramentas desenvolvidas especialmente para estudantes
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                            <CardContent className="p-8">
                                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-centere justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                </div>
                                <h3 className = "text-xl font-semibold mb-3 text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}