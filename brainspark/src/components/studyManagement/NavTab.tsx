import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"; 
import { Button } from "../ui/button";
import { Plus } from "lucide-react"
import StudyObjectiveForm from "./forms/StudyObjectiveForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ExamForm from "./forms/ExamForm";

interface StudyObjective {
  id: string;
  subject: string;
  topic: string;
  dailyGoal: number; // minutes
  totalStudied: number; // minutes
  deadline: string;
  status: 'active' | 'completed' | 'paused';
}

interface Exam {
  id: string;
  subject: string;
  examName: string;
  date: string;
  studyPlan: string;
  status: 'scheduled' | 'completed';
  score?: number;
}

export default function NavTab() {

    const [showObjectiveForm, setShowObjectiveForm] = useState(false);
    const [showExamForm, setShowExamForm] = useState(false);

    const [objectives, setObjectives] = useState<StudyObjective[]>([
        {
        id: '1',
        subject: 'Matemática',
        topic: 'Cálculo Diferencial',
        dailyGoal: 120,
        totalStudied: 480,
        deadline: '2025-01-15',
        status: 'active'
        },
        {
        id: '2',
        subject: 'História',
        topic: 'Segunda Guerra Mundial',
        dailyGoal: 90,
        totalStudied: 270,
        deadline: '2025-01-20',
        status: 'active'
        },
    ]);

    const [exams, setExams] = useState<Exam[]>([
        {
        id: '1',
        subject: 'Matemática',
        examName: 'Prova P1 - Cálculo',
        date: '2025-01-18',
        studyPlan: 'Revisar derivadas e integrais',
        status: 'scheduled'
        },
        {
        id: '2',
        subject: 'História',
        examName: 'Prova Bimestral',
        date: '2025-01-25',
        studyPlan: 'Estudar causas e consequências da guerra',
        status: 'scheduled'
        }
    ]);

    const addObjective = (objective: Omit<StudyObjective, 'id' | 'totalStudied' | 'status'>) => {
        const newObjective: StudyObjective = {
        ...objective,
        id: Date.now().toString(),
        totalStudied: 0,  
        status: 'active'
        };
        setObjectives([...objectives, newObjective]);
        setShowObjectiveForm(false);
    };

    const addExam = (exam: Omit<Exam, 'id' | 'status'>) => {
        const newExam: Exam = {
        ...exam,
        id: Date.now().toString(),
        status: 'scheduled'
        };
        setExams([...exams, newExam]);
        setShowExamForm(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'completed': return 'bg-blue-100 text-blue-800';
        case 'paused': return 'bg-yellow-100 text-yellow-800';
        case 'scheduled': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    };

    const calculateProgress = (objective: StudyObjective) => {
        const daysUntilDeadline = Math.ceil(
        (new Date(objective.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        const expectedTotal = Math.max(1, daysUntilDeadline) * objective.dailyGoal;
        return Math.min(100, (objective.totalStudied / expectedTotal) * 100);
    };

    return(
        <Tabs defaultValue="objectivies" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="objectivies">Objetivos de Estudo</TabsTrigger>
                <TabsTrigger value="exams">Provas</TabsTrigger>
                <TabsTrigger value="calendar">Calendário</TabsTrigger>
            </TabsList>

            <TabsContent value="objectivies" className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold"> Objetivos de Estudo</h2>
                    <Button onClick={() => setShowObjectiveForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Objetivo
                    </Button>
                </div>

                {showObjectiveForm && (
                    <StudyObjectiveForm 
                        onSubmit={addObjective}
                        onCancel={() => setShowObjectiveForm(false)}
                    />
                )}

                <div className="grid gap-6">
                    {objectives.length === 0 ? (
                        <p className="text-gray-500">Nenhum objetivo cadastrado.</p>
                    ) : (
                        <div className="w-full p-2">
                            <div className="space-y-3">
                                {objectives.map((objective) => (
                                    <Card key={objective.id}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                {objective.subject} - {objective.topic}
                                                <Badge className={getStatusColor(objective.status)}>
                                                    {objective.status === 'active' ? 'Ativo' : 
                                                    objective.status === 'completed' ? 'Concluído' : 'Pausado'}
                                                </Badge>
                                                </CardTitle>
                                                <CardDescription>
                                                Meta diária: {formatTime(objective.dailyGoal)} | 
                                                Prazo: {new Date(objective.deadline).toLocaleDateString('pt-BR')}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Progresso</p>
                                                <p className="text-2xl font-bold text-blue-600">
                                                {Math.round(calculateProgress(objective))}%
                                                </p>
                                            </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Tempo estudado: {formatTime(objective.totalStudied)}</span>
                                                <span>Meta: {formatTime(objective.dailyGoal * Math.ceil((new Date(objective.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min(100, calculateProgress(objective))}%` }}
                                                ></div>
                                            </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="exams" className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Provas</h2>
                    <Button onClick={() => setShowExamForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Prova
                    </Button>
                </div>

                {showExamForm && (
                    <ExamForm
                        onSubmit={addExam}
                        onCancel={() => setShowExamForm(false)}
                    />
                )}
                <div className="grid gap-6">
                    {exams.length === 0 ? (
                        <p className="text-gray-500">Nenhuma prova cadastrada.</p>
                    ) : (
                        exams.map((exam) => (
                            <Card key={exam.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                    {exam.examName}
                                    <Badge className={getStatusColor(exam.status)}>
                                        {exam.status === 'scheduled' ? 'Agendada' : 'Concluída'}
                                    </Badge>
                                    </CardTitle>
                                    <CardDescription>
                                    {exam.subject} | Data: {new Date(exam.date).toLocaleDateString('pt-BR')}
                                    </CardDescription>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                    {Math.ceil((new Date(exam.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                                    </p>
                                </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-700">
                                <strong>Plano de Estudo:</strong> {exam.studyPlan}
                                </p>
                                {exam.score && (
                                <p className="text-sm text-green-600 mt-2">
                                    <strong>Nota:</strong> {exam.score}
                                </p>
                                )}
                            </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">

            </TabsContent>
        </Tabs>
    );
}