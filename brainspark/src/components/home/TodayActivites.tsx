import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Activity {
  id: number;
  subject: string;
  topic: string;
  completed: boolean;
  timeSpent: number;
}

interface ActivityProps {
  activities: Activity[];
}

export default function TodayActivities({ activities }: ActivityProps) {
  const ActivityList = (
    <div className="space-y-4">
      {activities.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                task.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <div>
              <p
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-800"
                    : "text-gray-900"
                }`}
              >
                {task.subject} - {task.topic}
              </p>
              {task.timeSpent > 0 && (
                <p className="text-sm text-gray-500">
                  {task.timeSpent} minutos estudados
                </p>
              )}
            </div>
          </div>
          <Badge variant={task.completed ? "default" : "secondary"}>
            {task.completed ? "Concluído" : "Pendente"}
          </Badge>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="lg:col-span-2 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          <h2 className="text-xl">Atividades de Hoje</h2>
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Suas tarefas de estudo programadas para hoje
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        <div className="flex-grow">
            {activities.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Nenhuma atividade programada para hoje.
              </div>
            ) : (
                activities.length > 4 ? (
                    <ScrollArea className="w-full h-72 pr-2">{ActivityList}</ScrollArea>
                ) : (
                    ActivityList
                )
            )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Link to="/study-management">
            <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nova Atividade
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
