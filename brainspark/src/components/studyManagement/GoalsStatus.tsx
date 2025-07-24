import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface StudyObjective {
  id: string;
  subject: string;
  topic: string;
  dailyGoal: number; // minutes
  totalStudied: number; // minutes
  deadline: string;
  status: 'active' | 'completed' | 'paused';
}

export default function GoalsStatus() {
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
        }
    ]);

    const calculateProgress = (objective: StudyObjective) => {
        const daysUntilDeadline = Math.ceil(
        (new Date(objective.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        const expectedTotal = Math.max(1, daysUntilDeadline) * objective.dailyGoal;
        return Math.min(100, (objective.totalStudied / expectedTotal) * 100);
    };
  
    return(
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Status dos Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Em dia</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{objectives.filter(o => o.status === 'active' && calculateProgress(o) >= 70).length}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Atenção</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium">{objectives.filter(o => o.status === 'active' && calculateProgress(o) >= 30 && calculateProgress(o) < 70).length}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-16">
                  <span className="text-sm text-gray-600">Atrasados</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium">{objectives.filter(o => o.status === 'active' && calculateProgress(o) < 30).length}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total</span>
                    <span className="font-bold">{objectives.filter(o => o.status === 'active').length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
        </Card>
    );
}