import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import { Clock, Zap, CheckCircle, Calendar } from "lucide-react";

interface KeyMetricsComponentProps {
    userStats: {
        dailyGoal: number;  
        studiedToday: number;
        weeklyProgress: number;
        streak: number;
        completedTasks: number;
        totalTasks: number;
        upcomingExams: number;
        favoriteSubject: string;
    }
}

export default function KeyMetricsComponent({ userStats }:KeyMetricsComponentProps) {
  const progressPercentage = (userStats.studiedToday / userStats.dailyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Tempo Estudado Hoje
                </CardTitle>
                <CardContent>
                    <div className="text-2xl font-bold">{userStats.dailyGoal}h</div>
                    <Progress value={progressPercentage} className="mt-2 bg-blue-400" />
                    <p className="text-sm mt-1 opacity-90">
                        Meta: {userStats.dailyGoal}h ({Math.round(progressPercentage)}%)
                    </p>
                </CardContent>                    
            </CardHeader>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Sequência de Dias
                </CardTitle>
                <CardContent>
                    <div className="text-2xl font-bold">{userStats.streak}</div>
                    <p className="text-sm opacity-90">dias consecutivos estudando</p>
                </CardContent>                    
            </CardHeader>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Tarefas Concluídas
                </CardTitle>
                <CardContent>
                    <div className="text-2xl font-bold">{userStats.completedTasks}/{userStats.totalTasks}</div>
                    <Progress 
                        value={(userStats.completedTasks / userStats.totalTasks) * 100} 
                        className="mt-2 bg-purple-400" 
                    />
                </CardContent>                    
            </CardHeader>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Próximas Provas
                </CardTitle>
                <CardContent>
                    <div className="text-2xl font-bold">{userStats.upcomingExams}</div>
                    <p className="text-xs opacity-90">nos próximos 30 dias</p>
                </CardContent>                    
            </CardHeader>
        </Card>
    </div>
  )
}