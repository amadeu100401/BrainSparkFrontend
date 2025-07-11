import { BarChart3, Bell, Calendar, Shield, Star, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Features() {

    const features = [
        {
            icon: Calendar,
            title: "Calendário Inteligente",
            description: "Visualize todas as suas tarefas e compromissos em um calendário integrado e intuitivo.",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: BarChart3,
            title: "Relatórios Detalhados",
            description: "Analise sua produtividade com gráficos e métricas que mostram seu progresso ao longo do tempo.",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: Bell,
            title: "Notificações Inteligentes",
            description: "Receba lembretes personalizados que se adaptam aos seus hábitos e preferências.",
            color: "text-red-600",
            bgColor: "bg-red-50"
        },
    ]

    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-6">
                        Recursos que fazem a <span className="gradient-text">diferença</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Todas as ferramentas que você precisa para ser mais produtivo, organizadas em uma interface simples e elegante.
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

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">99.9%</div>
                            <div className="text-gray-600">Tempo de atividade</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">10K+</div>
                            <div className="text-gray-600">Usuários ativos</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">50M+</div>
                            <div className="text-gray-600">Tarefas completadas</div>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 text-center">
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Shield className="w-5 h-5" />
                        <span>Dados criptografados</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Star className="w-5 h-5 text-yellow-500" />
                        <span>4.9/5 estrelas</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-5 h-5" />
                        <span>Suporte 24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}