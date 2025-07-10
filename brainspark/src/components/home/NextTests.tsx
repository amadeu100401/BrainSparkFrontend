import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        const examDate = new Date(date);
        examDate.setHours(0, 0, 0, 0);
        const timeDiff = examDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Próximas Provas
          </CardTitle>
          <CardDescription>
            Confira as próximas provas agendadas e se prepare com antecedência.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            {tests.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Nenhuma prova agendada
              </div>
            ) : (
              tests.map((exam) => (
                <div
                  key={exam.id}
                  className="flex justify-between p-3 bg-zinc-50 rounded-lg mb-2 hover:bg-zinc-100 transition-colors"
                >
                    <div>
                        <p className="font-medium text-gray-900">{exam.subject}</p>
                        <span className="text-sm text-gray-600">Teste</span>
                    </div>

                    <Badge variant={calculateDaysLeft(exam.date) <= 7 ? "destructive" : "secondary"}>
                        {calculateDaysLeft(exam.date)}d
                    </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
