import ComponentBase from '../../components/home/ContentComponentBase';
import Stopwatch from '../../components/focus/stopwatch/StopwatchMain';
import TimerHistory from '@/components/focus/history/TimerHistory';
import Tips from '@/components/focus/Tips';
import TimeResume from '@/components/focus/projectTimeResume/TimeResume';
import { GetProjects, Focus, FocusTags, FocusProject } from '@/features/Focus';
import { useEffect, useState } from 'react';
import Project from '@/components/focus/FocusProject/Project';

export default function FocusTimePage() {
  const [focusHistory, setFocusHistory] = useState<Focus[]>([]);
  const [usersFocusProject, setUsersFocusProject] = useState<FocusProject[]>([]);
  const [focusTags, setFocusTags] = useState<FocusTags[]>([]);

  const getProjects = async () => {
    try {
      const response = await GetProjects();

      setFocusHistory(response?.focusHistory ?? []);
      setUsersFocusProject(response?.currentProjects ?? []);
      setFocusTags(response?.focusTags ?? []);
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

  const handleCreateFocus = (focus: Focus) => {
    setFocusHistory(prev => [...prev, focus]);
    getProjects();
  };

  const handleDeleteTag = (deletedTagId: string) => {
    setFocusTags(prev => prev.filter(t => t.id !== deletedTagId));
  };

  return (
    <ComponentBase className="max-h-screen bg-gray-50 p-6">
      {/* Layout de 2 colunas */}
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Coluna da esquerda (Cronômetro + Registros) */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Stopwatch 
              initialFocusTags={focusTags}
              onDeleteTag={handleDeleteTag}
              onCreate={handleCreateFocus}
            />
          </div>

          <TimerHistory
            focusHistory={focusHistory}
            setFocusHistory={setFocusHistory}
          />
        </div>

        {/* Coluna da direita (Projeto atual, Resumo e Dicas rápidas) */}
        <div className="w-full lg:w-[280px] flex flex-col gap-4">
          <Project currentProjects={usersFocusProject} />
          <TimeResume />
          <Tips />
        </div>
      </div>
    </ComponentBase>
  );
}
