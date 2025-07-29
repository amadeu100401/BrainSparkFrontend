
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExamFormData {
  subject: string;
  type: string;
  examName: string;
  date: string;
  studyPlan: string;
}

interface ExamFormProps {
  onSubmit: (data: ExamFormData) => void;
  onCancel: () => void;
}

const ExamForm = ({ onSubmit, onCancel }: ExamFormProps) => {
  const [formData, setFormData] = useState<ExamFormData>({
    subject: '',
    type: '',
    examName: '',
    date: '',
    studyPlan: ''
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

  const examTypes = [
    'Prova Bimestral',
    'Prova P1',
    'Prova P2',
    'Prova Final',
    'Simulado',
    'ENEM',
    'Vestibular',
    // 'Concurso',
    // 'Trabalho',
    // 'Apresentação'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.examName || !formData.date) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof ExamFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

    return (
        <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Nova Prova/Avaliação</CardTitle>
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
                <Label htmlFor="examType">Tipo de Prova *</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                    {examTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                        {type}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="examName">Nome da Prova *</Label>
                <Input
                id="examName"
                value={formData.examName}
                onChange={(e) => handleInputChange('examName', e.target.value)}
                placeholder="Ex: Prova P1 - Cálculo"
                required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="date">Data da Prova *</Label>
                <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="studyPlan">Plano de Estudo</Label>
                <Textarea
                id="studyPlan"
                value={formData.studyPlan}
                onChange={(e) => handleInputChange('studyPlan', e.target.value)}
                placeholder="Descreva o que você precisa estudar para esta prova..."
                rows={4}
                />
                <p className="text-sm text-gray-500">
                Liste os tópicos e assuntos que você precisa revisar
                </p>
            </div>

            <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
                </Button>
                <Button type="submit">
                Cadastrar Prova
                </Button>
            </div>
            </form>
        </CardContent>
        </Card>
    );
};

export default ExamForm;