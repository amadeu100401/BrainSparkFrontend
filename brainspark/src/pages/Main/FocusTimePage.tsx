import ComponentBase from '../../components/home/ContentComponentBase'
import Stopwatch from '../../components/focus/stopwatch/Stopwatch'
import TimerHistory from '@/components/focus/TimerHistory';
import Tips from '@/components/focus/Tips';
import CurrentProject from '@/components/focus/CurrentProject';
import TimeResume from '@/components/focus/TimeResume';
import { GetProjects, Focus, focusTags, currentProject } from '@/features/Focus';
import { useEffect, useState } from 'react';

export default function FocusTimePage() {
  
  const [focusHistory, setFocusHistory] = useState<Focus[]>([]);
  const [usersFocusProject, setUsersFocusProject] = useState<currentProject[]>([]);
  const [focusTags, setFocusTags] = useState<focusTags[]>([]);

  const getProjects = async () => {
    try {
      const response = await GetProjects();

      if (response) {
        setFocusHistory(response.focusHistory ?? []);
        setUsersFocusProject(response.currentProjects ?? []);
        setFocusTags(response.focusTags ?? []);
      } else {
        setFocusHistory([]);
        setUsersFocusProject([]);
        setFocusTags([]);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setFocusHistory([]);
      setUsersFocusProject([]);
      setFocusTags([]);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ComponentBase className="min-h-screen w-screen bg-gray-50 p-6">
        
      {/* Layout de 2 colunas */}
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* Coluna da esquerda (Cronômetro + Registros) */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Stopwatch />
          </div>

          <TimerHistory />

        </div>

        {/* Coluna da direita (Projeto atual, Resumo e Dicas rápidas) */}
        <div className="w-full lg:w-[280px] flex flex-col gap-4">
          <CurrentProject currentProjects={usersFocusProject} />
          <TimeResume />
          <Tips />
        </div>
        {/* Fim da coluna da direita */}
        </div>
    </ComponentBase>
  );
}
