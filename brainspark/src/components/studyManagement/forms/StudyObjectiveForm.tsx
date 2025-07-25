
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudyObjectiveFormData {
  subject: string;
  topic: string;
  dailyGoal: number;
  deadline: string;
}

interface StudyObjectiveFormProps {
  onSubmit: (data: StudyObjectiveFormData) => void;
  onCancel: () => void;
}

const StudyObjectiveForm = ({ onSubmit, onCancel }: StudyObjectiveFormProps) => {
  const [formData, setFormData] = useState<StudyObjectiveFormData>({
    subject: '',
    topic: '',
    dailyGoal: 60,
    deadline: ''
  });

  const subjects = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Física',
    'Química',
    'Biologia',
    'Inglês',
    'Filosofia',
    'Sociologia',
    'Literatura',
    'Redação'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.topic || !formData.deadline) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof StudyObjectiveFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Objetivo de Estudo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Matéria *</Label>
              <Select onValueChange={(value) => handleInputChange('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma matéria" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Tópico/Assunto *</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="Ex: Equações do 2º grau"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dailyGoal">Meta Diária (minutos) *</Label>
              <Input
                id="dailyGoal"
                type="number"
                value={formData.dailyGoal}
                onChange={(e) => handleInputChange('dailyGoal', parseInt(e.target.value))}
                min="15"
                max="480"
                required
              />
              <p className="text-sm text-gray-500">
                Tempo que você pretende estudar por dia (15-480 min)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo Final *</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Objetivo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudyObjectiveForm;