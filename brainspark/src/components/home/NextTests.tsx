import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

interface NextTest {
  id: number;
  subject: string;
  date: Date;
}

interface NextTestProps {
  tests: NextTest[];
}

export default function NextTest({ tests }: NextTestProps) {
    
    const calculateDaysLeft = (date: Date): number => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
          return 0;
        }

        const examDate = new Date(date);
        examDate.setHours(0, 0, 0, 0);
        const timeDiff = examDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }

  const testToShow = () => {
    return(
      <div>
        {tests.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Nenhuma prova agendada
          </div>
        ) : (
          tests.map((exam) => (
            <div
              key={exam.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2"
            >
                <div>
                    <p className="font-medium text-gray-900">{exam.subject}</p>
                    <span className="text-sm text-gray-600">{exam.date.toLocaleDateString()}</span>
                </div>

                <Badge variant={calculateDaysLeft(exam.date) <= 7 ? "destructive" : "secondary"} className="rounded-full">
                    {calculateDaysLeft(exam.date)}d
                </Badge>
            </div>
          ))
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2"/>
            <h2 className="text-xl">Próximas Provas</h2>
          </CardTitle>
          <CardDescription>
            Confira as próximas provas agendadas e se prepare com antecedência.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tests.length > 3 ? (
            <ScrollArea className="h-64">
              {testToShow()}
            </ScrollArea>
          ) : (
            testToShow()
          )}
        </CardContent>
      </Card>
    </div>
  );
}
