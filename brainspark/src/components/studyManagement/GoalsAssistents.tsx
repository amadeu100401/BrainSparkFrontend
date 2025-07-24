import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BookOpen, Clock, Trophy } from "lucide-react";

export default function GoalsManagement() {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Assistente de Objetivos
              </CardTitle>
              <CardDescription>
                Sugestões inteligentes para criar objetivos de estudo eficazes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-purple-200 rounded-lg bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-purple-600" />
                      </div>
                      <h4 className="font-medium text-purple-900">Objetivo por Tempo</h4>
                    </div>
                    <p className="text-sm text-purple-700">Crie objetivos baseados no tempo disponível para estudar</p>
                  </div>
                  
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-blue-900">Objetivo por Prova</h4>
                    </div>
                    <p className="text-sm text-blue-700">Gere objetivos automaticamente baseados nas suas provas</p>
                  </div>
                  
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50 cursor-pointer hover:bg-green-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <h4 className="font-medium text-green-900">Templates</h4>
                    </div>
                    <p className="text-sm text-green-700">Use modelos prontos para diferentes tipos de estudo</p>
                  </div>
                  
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 cursor-pointer hover:bg-orange-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-orange-600" />
                      </div>
                      <h4 className="font-medium text-orange-900">SMART Goals</h4>
                    </div>
                    <p className="text-sm text-orange-700">Assistente para criar objetivos específicos e mensuráveis</p>
                  </div>
                </div>
              </div>
            </CardContent>
        </Card>
    );
}