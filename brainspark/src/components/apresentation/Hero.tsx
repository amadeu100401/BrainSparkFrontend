import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Clock, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 blob" style={{ animationDelay: '-4s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 fade-in-up">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm text-gray-600">Mais de 10.000 estudantes organizadas</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 fade-in-up stagger-1">
            Transforme seus{" "}
            <span className="gradient-text">estudos</span>{" "}
            em{" "}
            <span className="gradient-text">aprovação</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto fade-in-up stagger-2">
            A plataforma completa para organizar seus estudos, gerenciar provas e alcançar a aprovação dos seus sonhos com máxima eficiência.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 fade-in-up stagger-3">
            <Button size="lg" className="gradient-bg text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg"
             onClick={() => navigate("/welcome/register")}>
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {/* <Button variant="outline" size="lg" className="px-8 py-3 text-lg hover:bg-gray-50">
              <Play className="w-5 h-5 mr-2" />
              Ver Demonstração
            </Button> */}
          </div>

          {/* Social Proof */}
          <div className="text-sm text-gray-500 mb-12 fade-in-up stagger-3">
            Sem cartão de crédito • Teste grátis por 14 dias • Cancele quando quiser
          </div>

          {/* Features Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto fade-in-up stagger-3">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 float-animation">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cronograma Inteligente</h3>
              <p className="text-gray-600 text-sm">Organize seu tempo de estudo com cronogramas personalizados e lembretes automáticos</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 float-animation" style={{ animationDelay: '-2s' }}>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Metas de Aprovação</h3>
              <p className="text-gray-600 text-sm">Defina objetivos claros para cada matéria e acompanhe seu progresso até a aprovação</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 float-animation" style={{ animationDelay: '-4s' }}>
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Foco Máximo</h3>
              <p className="text-gray-600 text-sm">Técnicas comprovadas como Pomodoro para maximizar sua concentração nos estudos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};