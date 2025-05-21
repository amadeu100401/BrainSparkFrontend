import ComponentBase from '../../components/home/ContentComponentBase'
import Stopwatch from '../../components/focus/stopwatch/stopwatch'
import TimerHistory from '@/components/focus/TimerHistory';
import Tips from '@/components/focus/Tips';
import CurrentProject from '@/components/focus/CurrentProject';
import TimeResume from '@/components/focus/TimeResume';

// TODO: Fazer os componentes se comunicarem

export default function FocusTimePage() {
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
          <CurrentProject />
          <TimeResume />
          <Tips />
        </div>
      </div>
    </ComponentBase>
  );
}
